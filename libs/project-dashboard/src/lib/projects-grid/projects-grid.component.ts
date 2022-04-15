import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, ChangeDetectionStrategy, Input, OnChanges, OnDestroy, SimpleChanges, EventEmitter, Output } from '@angular/core';
import { ControlValueAccessor, FormControl, FormGroup, NG_VALUE_ACCESSOR } from '@angular/forms';
import { ProjectSummary, projectSummaryColumnHeaders, ProjectSummaryControlValues, projectSummaryControlInitialValues, ProjectSummaryKey, Division, statusOptions, Status } from '@r19/shared/models';
import { BehaviorSubject, ReplaySubject, Subject, takeUntil, tap } from 'rxjs';

@Component({
  selector: 'r19-projects-grid',
  templateUrl: './projects-grid.component.html',
  styleUrls: ['./projects-grid.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: ProjectsGridComponent,
      multi: true
    }
  ],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class ProjectsGridComponent implements OnChanges, OnDestroy, ControlValueAccessor {

  @Input() projects: ProjectSummary[] | null = [];
  @Input() columnFiltersTurnedOn = false;
  @Input() projectOwners: string[] | null = [];
  // @Input()
  // createdFormControl!: FormControl;
  @Input()
  set createdFormControl(control: FormControl)  {
    this._createdDataRange$.next(control ?? new FormControl()) ;
  }
  createdRangeForm = new FormControl ({
    start: null,
    end: null
  })

  createdInitialValue = new FormControl({
    start: null,
    end: null
  })


  @Output() selectProject: EventEmitter<ProjectSummary> = new EventEmitter();
  
  private _createdDataRange$ = new BehaviorSubject<FormControl>(new FormControl());
  createdDateRangeControl$ = this._createdDataRange$.asObservable();

  private _columnFiltersTurnedOn$ = new ReplaySubject<boolean>(1);
  columns: string[] = Object.keys(projectSummaryColumnHeaders);
  displayColumns: string[] = this.columns.concat(['actions']);
  statuses = Object.keys(statusOptions) as Status[];
  divisions:  Division[] = [ 'Accounting', 
  'Administration', 
  'Marketing',
  'Production' , 
  'Sales']
  statusOptions = statusOptions;
  projectSummaryColumnHeaders = projectSummaryColumnHeaders;
  hide = true;
  expandedProject: ProjectSummary | null = null;

  private _destroying$ = new Subject<void>();

  testFormControl = new FormControl({start: new Date, end: new Date()})
  
  form: FormGroup = new FormGroup(
    this.columns.reduce(
      (acc, columnName) => {
        const key = columnName as unknown as ProjectSummaryKey
        const controlValue = projectSummaryControlInitialValues[key]

        if(columnName==='created') {
          return ({ ...acc,
          created: new FormGroup({
            start: new FormControl(null),
            end: new FormControl(null)
          })})
        }

        if(columnName==='modified') {
          return ({ ...acc,
          modified: new FormGroup({
            start: new FormControl(null),
            end: new FormControl(null)
          })})
        }

        //Set initial value for created and modified here.  skip default behavior.
        return ({ ...acc, [columnName]: new FormControl(controlValue) })},
      {}
    )
  );

  _selectedProject$ = new Subject<ProjectSummary>();
  selectedProject$ = this._selectedProject$.asObservable();

  expandCollapse(project: ProjectSummary) {
    this.expandedProject = this.expandedProject === project ? null : project
    this.selectProject.emit(project);
    this._selectedProject$.next(project)
  }

  get titleControl(){
    return this.form.get('title') as FormControl;
 }
 
 get divisionControl(){
  return this.form.get('division') as FormControl;
}

get projectOwnerControl(){
  return this.form.get('project_owner') as FormControl;
}

get budgetControl(){
  return this.form.get('budget') as FormControl;
}

get statusControl(){
  return this.form.get('status') as FormControl;
}

get createdFormGroup(){
  return this.form.get('created') as FormGroup;
}

get startControl(){
  return this.createdFormGroup.get('start') as FormControl;
}

get endControl(){
  return this.createdFormGroup.get('end') as FormControl;
}

get modifiedFormGroup(){
  return this.form.get('modified') as FormGroup;
}

get startControl_modified(){
  return this.modifiedFormGroup.get('start') as FormControl;
}

get endControl_modified(){
  return this.modifiedFormGroup.get('end') as FormControl;
}

getHead(s: string) {
    const t = s as ProjectSummaryKey
    return projectSummaryColumnHeaders[t]
  }

  writeValue(v: ProjectSummaryControlValues) {
    this.form.setValue(v);
  }

  registerOnChange(fn: any) {
    this.form.valueChanges
      .pipe(
        takeUntil(this._destroying$),
        tap(fn)
      )
      .subscribe();
  }

  registerOnTouched(fn: any) {
    // create your own implementation here
  }

  setDisabledState(isDisabled: boolean) {
    isDisabled ? this.form.disable() : this.form.enable();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['columnFiltersTurnedOn']) {
      this._columnFiltersTurnedOn$.next(this.columnFiltersTurnedOn);
    }
  }

  ngOnDestroy() {
    this._destroying$.next();
  }
}
