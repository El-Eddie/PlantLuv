import { createAction, props, createReducer, on, Action, createFeatureSelector, createSelector } from '@ngrx/store';
import { state } from '@angular/animations';

export const displayUserPants = createAction('[Dashboard Display] show user plants');
export const displayPlantTypes = createAction('[Dashboard Display] show plant types');
export const displayDashboardPage = createAction('[Dashboard Display] show selected component',
  props<{page: string;}>());

const initialState: string = "user";

const _displayReducer = createReducer(initialState,
  on(displayDashboardPage, state => state = props.arguments.page),
  on(displayUserPants, state => state = 'user'),
  on(displayPlantTypes, state => state = 'type')
)
export function displayReducer(state, action){
  return _displayReducer(state, action)
}
