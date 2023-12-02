import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { AccessToken } from './auth.model';

export const authActions = createActionGroup({
  source: 'Auth Actions',
  events: {
    SetToken: props<AccessToken>(),
    ResetState: emptyProps(),
    RefreshToken: props<AccessToken>(),

    // RegisterSuccess: emptyProps(),
    // RegisterFailure: emptyProps(),
    // VerifyEmailLink: props<{ request: VerifyEmailLink }>(),
    // VerifyEmailLinkSuccess: emptyProps(),
    // VerifyEmailLinkFailure: emptyProps(),
    // VerifyEmail: props<{ request: VerifyEmail }>(),
    // VerifyEmailSuccess: emptyProps(),
    // VerifyEmailFailure: emptyProps(),
    // ResetPasswordLink: props<{ request: ResetPasswordLink }>(),
    // ResetPasswordLinkSuccess: emptyProps(),
    // ResetPasswordLinkFailure: emptyProps(),
    // ResetPassword: props<{ request: ResetPassword }>(),
    // ResetPasswordSuccess: emptyProps(),
    // ResetPasswordFailure: emptyProps(),
    // Logout: emptyProps(),
  },
});
