import { createFeature, createReducer, on } from '@ngrx/store';
import { AlertState, Alerts } from './alert.model';
import { EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { alertActions } from './alert.action';

const alertsAdaptor: EntityAdapter<Alerts> = createEntityAdapter<Alerts>({
  selectId: (s: Alerts) => s.id,
});

const initialState: AlertState = alertsAdaptor.getInitialState();

export const alertFeature = createFeature({
  name: 'alerts',
  reducer: createReducer(
    initialState,
    on(alertActions.resetState, (): AlertState => initialState),
    on(
      alertActions.addAlert,
      (state, action): AlertState =>
        alertsAdaptor.upsertOne(action.alert, state)
    ),
    on(
      alertActions.removeAlert,
      (state, action): AlertState =>
        alertsAdaptor.removeOne(action.alertID, state)
    )
  ),
  extraSelectors: ({ selectAlertsState }) => {
    const selectors = alertsAdaptor.getSelectors(selectAlertsState);
    return {
      ...selectors,
    };
  },
});
