/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { ControlValueAccessor, FormControl, FormGroup, NG_VALUE_ACCESSOR } from '@angular/forms';
// import { DateRange } from '@angular/material/datepicker';
import { DateRange } from '@r19/shared/models';

import { Subject, takeUntil, tap } from 'rxjs';
import { ProjectsTableComponent } from '../projects-table/projects-table.component';

@Component({
  selector: 'r19-date-picker',
  templateUrl: './date-picker.component.html',
  styleUrls: ['./date-picker.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: ProjectsTableComponent,
      multi: true
    }
  ]
})
export class DatePickerComponent implements ControlValueAccessor, OnDestroy  {
  form = new FormGroup({
    start: new FormControl(null),
    end: new FormControl(null),
  });

  private _destroying$ = new Subject<void>();

  writeValue(v: DateRange) {
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

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  registerOnTouched(fn: any) {}

  ngOnDestroy() {
    this._destroying$.next();
  }
}
