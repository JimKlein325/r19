import { createEffect, Actions, ofType } from '@ngrx/effects';
import {
  map,
  exhaustMap,
  catchError,
} from 'rxjs/operators';
import { DashboardService } from '@r19/shared/services';
import * as  DashboardPageActions  from './dashboard.actions';
import * as ProjectsAPIActions from './projects.actions';

import { of } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable()
export class ProjectEffects {

  constructor(private projectService: DashboardService , private actions$: Actions) {}
  loadProjects$ = createEffect(() =>
    this.actions$.pipe(
      ofType(DashboardPageActions.enter),
      exhaustMap(() =>
        this.projectService.all().pipe(
          map((projects) => {
            return ProjectsAPIActions.loadProjects({ projects })}),
          catchError((error) =>
            of(ProjectsAPIActions.loadProjectsFailure({ error }))
          )
        )
      )
    )
  );

}



