import { Component, OnInit, ChangeDetectionStrategy, Input, OnChanges, OnDestroy, SimpleChanges } from '@angular/core';
import { ControlValueAccessor, FormControl, FormGroup } from '@angular/forms';
import { ProjectSummary, projectSummaryColumnHeaders, ProjectSummaryHearders, ProjectSummaryKey } from '@r19/shared/models';
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
  private _columnFiltersTurnedOn$ = new ReplaySubject<boolean>(1);
  columns: string[] = Object.keys(projectSummaryColumnHeaders);
  projectSummaryColumnHeaders =projectSummaryColumnHeaders;
  private _destroying = new Subject<void>();
  form: FormGroup = new FormGroup({});

  getHead(s: string) {
    const t = s as ProjectSummaryKey
    return projectSummaryColumnHeaders[t]
  }
  
  writeValue(v: (keyof ProjectSummary)[]) {
    // create your own implementation here
    this.form = new FormGroup(
      this.columns.reduce(
        (acc, columnName) => ({ ...acc, [columnName]: new FormControl('') }),
        {}
      )
    );
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
