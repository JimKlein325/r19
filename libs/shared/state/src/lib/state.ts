import { NgModule } from '@angular/core';
import {
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer,
  StoreModule,
} from '@ngrx/store';
import * as fromDashboard from './dashboard.reducer';
import * as fromProjects from './projects.reducer';
import { EffectsModule } from '@ngrx/effects';
import { ProjectEffects } from './project.effects';

export const FEATURE_KEY = 'project-dashboard';

/**
 * State Shape
 **/
export interface State {
 projectSummaries: fromProjects.State;
}

export const reducers: ActionReducerMap<State> = {
    projectSummaries: fromProjects.reducer,
};

export const metaReducers: MetaReducer<State>[] = [];

/**
 * Module
 **/
@NgModule({
  imports: [StoreModule.forFeature(FEATURE_KEY, reducers, { metaReducers }), EffectsModule.forFeature([ProjectEffects])],
})
export class SharedStateModule {}

/**
 * Feature Selector
 **/
export const selectSharedState = createFeatureSelector<State>(FEATURE_KEY);

/**
 * Dashboard Selectors
 */
export const selectDashboardState = createSelector(
  selectSharedState,
  (state: State) => {
      return state.projectSummaries
    }
);
export const selectAllProjects = createSelector(
    selectDashboardState,
  fromProjects.selectAll
);
// export const selectActiveBook = createSelector(
//   selectBooksState,
//   fromBooks.selectActiveBook
// );
// export const selectBooksEarningsTotals = createSelector(
//   selectBooksState,
//   fromBooks.selectEarningsTotals
// );
export const selectProjectBudgetTotals = createSelector(
    selectDashboardState,
    fromProjects.selectBudgetTotals
);
export const selectProjectStatusSummary = createSelector(
    selectDashboardState,
    fromProjects.selectProjectStatusSummary
);

export const selectProjectOwners = createSelector(
    selectAllProjects,
    (summaries) => {
        const allPOs = summaries.map(summary => summary.project_owner);
        const pOSet = new Set(allPOs);
        return Array.from(pOSet);
    }
);
