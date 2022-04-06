import { TEXT_COLUMN_OPTIONS } from '@angular/cdk/table';
import { Component, OnInit, ChangeDetectionStrategy, Input, OnChanges, OnDestroy, SimpleChanges } from '@angular/core';
import { ControlValueAccessor, FormControl, FormGroup } from '@angular/forms';
import { ProjectSummary, projectSummaryColumnHeaders, ProjectSummaryControlValues, projectSummaryControlInitialValues, ProjectSummaryHearders, ProjectSummaryKey, Division, statusOptions, Status } from '@r19/shared/models';
import { ReplaySubject, Subject } from 'rxjs';

@Component({
  selector: 'r19-projects-grid',
  templateUrl: './projects-grid.component.html',
  styleUrls: ['./projects-grid.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProjectsGridComponent implements OnChanges, OnDestroy, ControlValueAccessor {

  @Input() projects: ProjectSummary[] | null = [];
  @Input() columnFiltersTurnedOn = false;
  @Input() projectOwners: string[] | null = [];
  private _columnFiltersTurnedOn$ = new ReplaySubject<boolean>(1);
  columns: string[] = Object.keys(projectSummaryColumnHeaders);
  displayColumns: string[] = this.columns.concat(['actions']);
  statuses: Status[] = Object.keys(statusOptions) as Status[];
  divisions:  Division[] = [ 'Accounting', 
  'Administration', 
  'Marketing',
  'Production' , 
  'Sales']
  statusOptions = statusOptions;
  projectSummaryColumnHeaders = projectSummaryColumnHeaders;

  private _destroying = new Subject<void>();
  
  form: FormGroup = new FormGroup(
    this.columns.reduce(
      (acc, columnName) => {
        console.log('acc', acc)
        const key = columnName as unknown as ProjectSummaryKey
        const controlValue = projectSummaryControlInitialValues[key]
        return ({ ...acc, [columnName]: new FormControl(controlValue) })},
      {}
    )
  );

  getHead(s: string) {
    const t = s as ProjectSummaryKey
    return projectSummaryColumnHeaders[t]
  }

  writeValue(v: ProjectSummaryControlValues) {
    this.form.setValue(v);
  }

  registerOnChange(fn: any) {
    // create your own implementation here
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
    this._destroying.next();
  }
}
