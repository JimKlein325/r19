import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
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
  private _destroying$ = new Subject<void>();
  private _currentProjectSummary!: ProjectSummary;
  private _projectOwners: string[] = []

  @Input()
  set currentProjectSummary(project: ProjectSummary | null) {
      if(project) {
        this._currentProjectSummary = project;
        const {project_owner, budget, status} = project;
        this.form.setValue({project_owner, budget, status}, {emitEvent: false});
      }
  }
  @Input()
  set projectOwners(projectOwners: string[] | null) {
      if(projectOwners) {
        this._projectOwners = projectOwners;
      }
  }

  @Output() projectUpdate = new EventEmitter<ProjectSummary>();

  form = new FormGroup({
    project_owner: new FormControl(['']),
    budget: new FormControl(0),
    status: new FormControl(''),
  });

  ngOnInit(): void {
    this.form.valueChanges.pipe(
      takeUntil(this._destroying$),
      tap(({project_owner, budget, status }) => {
        const updatedProject: ProjectSummary = {...this._currentProjectSummary, project_owner, budget, status} as ProjectSummary;
        this.projectUpdate.emit(updatedProject)
      })
    )
    .subscribe();
  }

  ngOnDestroy() {
    this._destroying$.next();
  }

}
