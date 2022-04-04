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

export const FEATURE_KEY = 'dashboard';

/**
 * State Shape
 **/
export interface State {
 projctsSummaries: fromBooks.State;
}

export const reducers: ActionReducerMap<State> = {
  dashboard: fromProjects.reducer,
};

export const metaReducers: MetaReducer<State>[] = [];

/**
 * Module
 **/
@NgModule({
  imports: [StoreModule.forFeature(FEATURE_KEY, reducers, { metaReducers }), StoreModule.forFeature(fromProjects.projectsesFeatureKey, fromProjects.reducer)],
})
export class SharedStateModule {}

/**
 * Feature Selector
 **/
export const selectSharedBooksState = createFeatureSelector<State>(FEATURE_KEY);

/**
 * Books Selectors
 */
// export const selectBooksState = createSelector(
//   selectSharedBooksState,
//   (state: State) => state.books
// );
// export const selectAllBooks = createSelector(
//   selectBooksState,
//   fromBooks.selectAll
// );
// export const selectActiveBook = createSelector(
//   selectBooksState,
//   fromBooks.selectActiveBook
// );
// export const selectBooksEarningsTotals = createSelector(
//   selectBooksState,
//   fromBooks.selectEarningsTotals
// );
