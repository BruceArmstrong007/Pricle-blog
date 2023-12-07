import { Alerts } from './alert.model';
import { createActionGroup, emptyProps, props } from '@ngrx/store';

export const alertActions = createActionGroup({
  source: 'Alert Actions',
  events: {
    AddAlert: props<{ alert: Alerts }>(),
    RemoveAlert: props<{ alertID: string }>(),

    ResetState: emptyProps(),
  },
});
