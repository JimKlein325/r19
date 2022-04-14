import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { ProjectSummary, Status, statusOptions } from '@r19/shared/models';
import { DashboardPageActions, selectProjectOwners } from '@r19/shared/state';
import { Observable, Subject, takeUntil, tap } from 'rxjs';

@Component({
  selector: 'r19-project-edit',
  templateUrl: './project-edit.component.html',
  styleUrls: ['./project-edit.component.scss']
})
export class ProjectEditComponent implements OnInit, OnDestroy {
  statuses = Object.keys(statusOptions) as Status[];
  statusOptions = statusOptions;
  projectOwners$: Observable<string[]> = this.store.select(selectProjectOwners)
  private _destroying$ = new Subject<void>();
  private _currentProjectSummary!: ProjectSummary;

  @Input()
  set currentProjectSummary(project: ProjectSummary | null) {
    // set currentProjectSummary({project_owner, budget, status}: ProjectSummary) {
      // this._currentProject = projectSummary;
      if(project) {
        this._currentProjectSummary = project;
        const {project_owner, budget, status} = project;
        this.form.setValue({project_owner, budget, status}, {emitEvent: false});
        console.log('props', {project_owner, budget, status});
      }
  }

  form = new FormGroup({
    project_owner: new FormControl(['']),
    budget: new FormControl(0),
    status: new FormControl(''),
  });

  constructor(private store: Store) {
  }

  ngOnInit(): void {
    this.form.valueChanges.pipe(
      takeUntil(this._destroying$),
      tap( value => console.log('value', value)),
      tap(({project_owner, budget, status }) => {
        const updatedProject: ProjectSummary = {...this._currentProjectSummary, project_owner, budget, status} as ProjectSummary;
        this.store.dispatch(DashboardPageActions.updateProject({title: updatedProject.title, changes: updatedProject}));
      })
    )
    .subscribe();
  }

  ngOnDestroy() {
    this._destroying$.next();
  }

}
