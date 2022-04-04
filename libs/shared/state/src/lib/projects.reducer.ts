import { Action, createReducer, createSelector, on } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { Projects } from './projects.model';
import {ProjectSummary} from '../../../models/src/lib/projects'
import * as ProjectsActions from './projects.actions';

export const projectsesFeatureKey = 'projectses';

export interface State extends EntityState<ProjectSummary> { activeProjectId: string | null;}

export const adapter: EntityAdapter<ProjectSummary> = createEntityAdapter<ProjectSummary>();

export const initialState: State = adapter.getInitialState({
  activeProjectId: null
});

export const reducer = createReducer(
  initialState,
  on(ProjectsActions.addProject,
    (state, action) => adapter.addOne(action.project, state)
  ),
  on(ProjectsActions.upsertProject,
    (state, action) => adapter.upsertOne(action.project, state)
  ),
  on(ProjectsActions.addProjects,
    (state, action) => adapter.addMany(action.projects, state)
  ),
  on(ProjectsActions.upsertProjects,
    (state, action) => adapter.upsertMany(action.projects, state)
  ),
  on(ProjectsActions.updateProject,
    (state, action) => adapter.updateOne(action.project, state)
  ),
  on(ProjectsActions.updateProjects,
    (state, action) => adapter.updateMany(action.projects, state)
  ),
  on(ProjectsActions.deleteProject,
    (state, action) => adapter.removeOne(action.id, state)
  ),
  on(ProjectsActions.deleteProjects,
    (state, action) => adapter.removeMany(action.ids, state)
  ),
  on(ProjectsActions.loadProjects,
    (state, action) => adapter.setAll(action.projects, state)
  ),
  on(ProjectsActions.clearProjectss,
    state => adapter.removeAll(state)
  ),
);

export const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal,
} = adapter.getSelectors();

export const selectActiveProjectId = (state: State) => state.activeProjectId;
export const selectActiveBook = createSelector(
  selectEntities,
  selectActiveProjectId,
  (booksEntities, activeProjectId) => {
    if (activeProjectId) return booksEntities[activeProjectId] ?? null;

    return null;
  }
);
