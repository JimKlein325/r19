/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
} from '@angular/core';
import {
  ControlValueAccessor,
  FormGroup,
  FormControl,
  NG_VALUE_ACCESSOR
} from '@angular/forms';
import { ProjectsTableFormValue } from '@r19/shared/models';
import { Subject } from 'rxjs';
import { takeUntil, tap } from 'rxjs/operators';

@Component({
  selector: 'r19-projects-table',
  templateUrl: './projects-table.component.html',
  styleUrls: ['./projects-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: ProjectsTableComponent,
      multi: true
    }
  ]
})
export class ProjectsTableComponent implements ControlValueAccessor, OnDestroy  {
  columnFiltersTurnedOn = false

  
  form: FormGroup = new FormGroup({
        columnFilters: new FormControl(false),
      });

  private _destroying$ = new Subject<void>();

  writeValue(v: ProjectsTableFormValue) {
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

  setDisabledState(isDisabled: boolean) {
    isDisabled ? this.form.disable() : this.form.enable();
  }

  ngOnDestroy() {
    this._destroying$.next();
  }


}
