import { createReducer, createSelector, on } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { calculateBudgetTotal, ProjectSummary, calculateStatusSummary, calculateBudgetSummary } from '../../../models/src/lib/project-summaries';
import * as ProjectsActions from './projects.actions';
import { DashboardPageActions } from '..';
import { state } from '@angular/animations';

export const projectsesFeatureKey = 'dashboard';

export interface State extends EntityState<ProjectSummary> { activeProjectId: string | null;}

export const adapter: EntityAdapter<ProjectSummary> = createEntityAdapter<ProjectSummary>(
  { selectId: (summary) => summary.title }
);

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
  on(DashboardPageActions.updateProject,
    (state, action) => {
      const state2 =  adapter.updateOne(
        {id: action.title, changes: action.changes}, 
        state)
        
        console.log('hello state', state2)
      return state2;
      }
      )
);

export const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal,
} = adapter.getSelectors();

export const selectActiveProjectId = (state: State) => state.activeProjectId;
export const selectActiveProject = createSelector(
  selectEntities,
  selectActiveProjectId,
  (projectsEntities, activeProjectId) => {
    if (activeProjectId) return projectsEntities[activeProjectId] ?? null;
    return null;
  }
);

export const selectBudgetTotals = createSelector(
  selectAll,
  calculateBudgetTotal
);
export const selectProjectStatusSummary = createSelector(
  selectAll,
  calculateStatusSummary
);

export const selectProjectBudgetSummary = createSelector(
  selectAll,
  calculateBudgetSummary
);
