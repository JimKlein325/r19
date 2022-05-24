import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import {DashboardPageActions} from '@r19/shared/state';
import { filter, map, Observable, shareReplay, startWith, switchMap, tap } from 'rxjs';
import { selectAllProjects, selectProjectBudgetSummary, selectProjectStatusSummary, selectProjectOwners } from '@r19/shared/state'
import {ProjectSummary, StatusReport} from '@r19/shared/models'
import { FormControl } from '@angular/forms';
import { projectColumnFilter } from '../dashboard.utils';

const initialFilterFormValue = {
  title: '',
  division: '',
  project_owner: '',
  budget: 0,
  status: '',
  created: {start: null, end: null},
  modified: {start: null, end: null}
}
@Component({
  selector: 'r19-dashboard-shell',
  templateUrl: './dashboard-shell.component.html',
  styleUrls: ['./dashboard-shell.component.scss']
})
export class DashboardShellComponent implements OnInit {
  budgetSummary$: Observable<StatusReport>;
  statusSummary$: Observable<StatusReport>;
  projectSummaries$: Observable<ProjectSummary[]> = this.store.select(selectAllProjects).pipe(map(projects => projects?? []));
  projectOwners$: Observable<string[]> = this.store.select(selectProjectOwners)

  tableForm = new FormControl({ columnFilters: false});
  columnFilterForm = new FormControl (initialFilterFormValue)
  createdRangeForm = new FormControl ({
    start: null,
    end: null
  })

  modifiedRangeForm = new FormControl ({
    start: null,
    end: null
  })

  filteredProjects$!: Observable<ProjectSummary[]>;

  constructor(private store: Store) {
    this.budgetSummary$ = store.select(selectProjectBudgetSummary);
    this.statusSummary$ = store.select(selectProjectStatusSummary);
    this.store.dispatch(DashboardPageActions.enter());
  }


  ngOnInit() {
    this.filteredProjects$ = this.columnFilterForm.valueChanges.pipe(
      startWith(this.columnFilterForm.value),
      switchMap(columnFilters => {
        return this.projectSummaries$.pipe(
          map( allProjects => allProjects.filter(project => projectColumnFilter(project, columnFilters)))
        )
      }
      ),
      shareReplay(1)
    );
    const div = this.tableForm.get('columnFilters') ?? new FormControl('');
    // const division = this.tableForm.get('columnFilters') ?? new FormControl();

    // div.valueChanges.pipe(
    //   startWith(div.value),
    //   filter(value => {
    //     const v = value.columnFilters;
    //     return !v}),
    //   tap(value => {
    //     console.log('value changed')
    //     console.log('value', value)
    //   }),
    //   tap(() => {
    //     this.columnFilterForm.setValue( initialFilterFormValue )
    //     console.log('filersform', this.columnFilterForm.value)
    //   })
    // ).subscribe();
    this.tableForm.valueChanges.pipe(
      startWith(this.tableForm.value),
      filter(value => {
        const v = value.columnFilters;
        return !v}),
      tap(value => {
        console.log('value changed')
        console.log('value', value)
      }),
      tap(() => {
        this.columnFilterForm.setValue( initialFilterFormValue )
        console.log('filersform', this.columnFilterForm.value)
      })
    ).subscribe();
}
  get divisionControl(){
    // const controls = this.tableForm
    return this.tableForm as FormControl;
  }
  
}
