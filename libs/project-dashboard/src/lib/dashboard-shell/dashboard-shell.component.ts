import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import {DashboardPageActions} from '@r19/shared/state';
import { map, Observable, shareReplay, startWith, switchMap } from 'rxjs';
import { selectAllProjects, selectProjectBudgetSummary, selectProjectStatusSummary, selectProjectOwners } from '@r19/shared/state'
import {ProjectSummary, StatusReport} from '@r19/shared/models'
import { FormControl } from '@angular/forms';
import { projectColumnFilter } from '../dashboard.utils';

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
  columnFilterForm = new FormControl ({
    title: '',
    division: '',
    project_owner: '',
    budget: '',
    status: '',
    created: '',
    modified: ''
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
  }


}
