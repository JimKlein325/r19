import { createAction, props } from '@ngrx/store';
import { Update } from '@ngrx/entity';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import {ProjectSummary} from '../../../models/src/lib/project-summaries'

export const loadProjects = createAction(
  '[Dashboard API] Load Projects', 
  props<{ projects: ProjectSummary[] }>()
);

export const loadProjectsFailure = createAction(
  '[Dashboard API] Projects Loaded Failure',
  props<{ error: Error }>()
);

export const addProject = createAction(
  '[Dashboard API] Add Project',
  props<{ project: ProjectSummary }>()
);

export const upsertProject = createAction(
  '[Dashboard API] Upsert Project',
  props<{ project: ProjectSummary }>()
);

export const addProjects = createAction(
  '[Dashboard API] Add Projects',
  props<{ projects: ProjectSummary[] }>()
);

export const upsertProjects = createAction(
  '[Dashboard API] Upsert Projects',
  props<{ projects: ProjectSummary[] }>()
);

export const updateProject = createAction(
  '[Dashboard API] Update Project',
  props<{ project: Update<ProjectSummary> }>()
);

export const updateProjects = createAction(
  '[Dashboard API] Update Projects',
  props<{ projects: Update<ProjectSummary>[] }>()
);

export const deleteProject = createAction(
  '[Dashboard API] Delete Project',
  props<{ id: string }>()
);

export const deleteProjects = createAction(
  '[Dashboard API] Delete Projects',
  props<{ ids: string[] }>()
);

export const clearProjectss = createAction(
  '[Dashboard API] Clear ProjectSummaries'
);
