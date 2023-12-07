import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { AccessToken } from './auth.model';

export const authActions = createActionGroup({
  source: 'Auth Actions',
  events: {
    SetToken: props<AccessToken>(),
    ResetState: emptyProps(),
    RefreshToken: props<AccessToken>(),
  },
});
