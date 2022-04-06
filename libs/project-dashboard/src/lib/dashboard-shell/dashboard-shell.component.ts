import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import {DashboardPageActions} from '@r19/shared/state';
import { filter, map, Observable } from 'rxjs';
import { selectAllProjects, selectProjectBudgetTotals, selectProjectStatusSummary, selectProjectManagers } from '@r19/shared/state'
import {ProjectSummary, StatusReport} from '@r19/shared/models'

@Component({
  selector: 'r19-dashboard-shell',
  templateUrl: './dashboard-shell.component.html',
  styleUrls: ['./dashboard-shell.component.scss']
})
export class DashboardShellComponent implements OnInit {
  budgetTotal$: Observable<number>;
  statusSummary$: Observable<StatusReport>;
  projectSummaries$: Observable<ProjectSummary[]> = this.store.select(selectAllProjects).pipe(map(projects => projects?? []));
  projectOwners$: Observable<string[]> = this.store.select(selectProjectManagers)
  
  constructor(private store: Store) {
    this.budgetTotal$ = store.select(selectProjectBudgetTotals);
    this.statusSummary$ = store.select(selectProjectStatusSummary);
  //   this.total$ = store.select(selectBooksEarningsTotals);
  }

  ngOnInit() {
    this.store.dispatch(DashboardPageActions.enter());
  }


}
