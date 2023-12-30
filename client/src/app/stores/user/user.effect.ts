import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ApiService } from '../../shared/services/api/api.service';
import { catchError, exhaustMap, map, of } from 'rxjs';
import { API } from '../../shared/utils/api.endpoints';
import { userActions } from './user.action';
import { Store } from '@ngrx/store';
import { authActions } from '../auth/auth.action';
import { contactsActions } from '../contacts/contacts.action';
import { Router } from '@angular/router';
import { ClientRoutes } from '../../shared/utils/client.routes';
import { NotificationSocketService } from '../../shared/sockets/notification-socket.service';
import { alertActions } from '../alert/alert.action';
import { generateAlertID } from '../../shared/utils/variables';

export const profile = createEffect(
  (actions$ = inject(Actions), apiService = inject(ApiService)) => {
    return actions$.pipe(
      ofType(userActions.profile),
      exhaustMap((request) => {
        return apiService.request(API.PROFILE, request).pipe(
          map((response: any) => {
            return userActions.profileSuccess(response);
          }),
          catchError(() => {
            return of(userActions.profileFailure());
          })
        );
      })
    );
  },
  {
    functional: true,
  }
);

export const updateUser = createEffect(
  (
    actions$ = inject(Actions),
    apiService = inject(ApiService),
    store = inject(Store)
  ) => {
    return actions$.pipe(
      ofType(userActions.updateUser),
      exhaustMap(({ request }) => {
        return apiService.request(API.UPDATEUSER, request).pipe(
          map((response: any) => {
            store.dispatch(userActions.profile());
            store.dispatch(
              alertActions.addAlert({
                alert: {
                  id: generateAlertID(),
                  type: 'SUCCESS',
                  title: 'Successfully updated!',
                  message: response?.message ?? 'User details are updated.',
                },
              })
            );
            return userActions.updateUserSuccess();
          }),
          catchError((error) => {
            let errorMsg =
              error?.error?.message ?? error?.statusText ?? error?.message;
            store.dispatch(
              alertActions.addAlert({
                alert: {
                  id: generateAlertID(),
                  type: 'ERROR',
                  title: 'API Error.',
                  message: errorMsg ?? 'Error while updating user details.',
                },
              })
            );
            return of(userActions.updateUserFailure());
          })
        );
      })
    );
  },
  {
    functional: true,
  }
);

export const uploadProfile = createEffect(
  (
    actions$ = inject(Actions),
    apiService = inject(ApiService),
    store = inject(Store)
  ) => {
    return actions$.pipe(
      ofType(userActions.uploadProfile),
      exhaustMap((request) => {
        return apiService.uploadProfile(API.UPLOADPROFILE, request).pipe(
          map((response: any) => {
            store.dispatch(userActions.profile());
            store.dispatch(
              alertActions.addAlert({
                alert: {
                  id: generateAlertID(),
                  type: 'SUCCESS',
                  title: 'Successfully uploaded!',
                  message: response?.message ?? 'User profile uploaded.',
                },
              })
            );
            return userActions.uploadProfileSuccess();
          }),
          catchError((error) => {
            let errorMsg =
              error?.error?.message ?? error?.statusText ?? error?.message;
            store.dispatch(
              alertActions.addAlert({
                alert: {
                  id: generateAlertID(),
                  type: 'ERROR',
                  title: 'API Error.',
                  message: errorMsg ?? 'Error while uploading profile picture.',
                },
              })
            );
            return of(userActions.uploadProfileFailure());
          })
        );
      })
    );
  },
  {
    functional: true,
  }
);

export const logout = createEffect(
  (
    actions$ = inject(Actions),
    store = inject(Store),
    router = inject(Router),
    notificationSocket = inject(NotificationSocketService),
    apiService = inject(ApiService)
  ) => {
    return actions$.pipe(
      ofType(userActions.logout),
      exhaustMap(() => {
        return apiService.request(API.LOGOUT).pipe(
          map(() => {
            return logoutSetup(notificationSocket, store, router);
          }),
          catchError(() => {
            return of(logoutSetup(notificationSocket, store, router));
          })
        );
      })
    );
  },
  {
    functional: true,
  }
);

function logoutSetup(
  notificationSocket: NotificationSocketService,
  store: Store,
  router: Router
) {
  store.dispatch(authActions.resetState());
  store.dispatch(contactsActions.resetState());
  store.dispatch(userActions.resetState());
  store.dispatch(authActions.resetState());
  localStorage.removeItem('isLoggedIn');
  router.navigateByUrl(ClientRoutes.Home);
  notificationSocket.disconnect();
  return userActions.logoutSuccess();
}

export const deleteUser = createEffect(
  (
    actions$ = inject(Actions),
    apiService = inject(ApiService),
    store = inject(Store)
  ) => {
    return actions$.pipe(
      ofType(userActions.deleteAccount),
      exhaustMap(() => {
        return apiService.request(API.DELETEUSER).pipe(
          map((response: any) => {
            store.dispatch(userActions.logout());
            return userActions.deleteAccountSuccess();
          }),
          catchError(({ error }) => {
            return of(userActions.deleteAccountFailure());
          })
        );
      })
    );
  },
  {
    functional: true,
  }
);

export const changePassword = createEffect(
  (
    actions$ = inject(Actions),
    apiService = inject(ApiService)
    //  changePasswordStore = inject(ChangePasswordStore)
  ) => {
    return actions$.pipe(
      ofType(userActions.resetPassword),
      exhaustMap((request) => {
        //  changePasswordStore.ChangePassword();
        return apiService.request(API.CHANGEPASSWORD, request).pipe(
          map((response: any) => {
            //    changePasswordStore.ChangePasswordSuccess(response);
            return userActions.resetPasswordSuccess();
          }),
          catchError(({ error }) => {
            //  changePasswordStore.ChangePasswordFailure(error);
            return of(userActions.resetPasswordFailure());
          })
        );
      })
    );
  },
  {
    functional: true,
  }
);

export const changeEmailLink = createEffect(
  (
    actions$ = inject(Actions),
    apiService = inject(ApiService)
    // changeEmailStore = inject(ChangeEmailStore)
  ) => {
    return actions$.pipe(
      ofType(userActions.changeEmailLink),
      exhaustMap((request) => {
        //  changeEmailStore.ChangeEmailLink();
        return apiService.request(API.CHANGEEMAILLINK, request).pipe(
          map((response: any) => {
            //  changeEmailStore.ChangeEmailLinkSuccess(response);
            return userActions.changeEmailLinkSuccess();
          }),
          catchError(({ error }) => {
            //  changeEmailStore.ChangeEmailLinkFailure(error);
            return of(userActions.changeEmailLinkFailure());
          })
        );
      })
    );
  },
  {
    functional: true,
  }
);

export const changeEmailVerification = createEffect(
  (
    actions$ = inject(Actions),
    apiService = inject(ApiService)
    // changeEmailStore = inject(ChangeEmailStore)
  ) => {
    return actions$.pipe(
      ofType(userActions.changeEmail),
      exhaustMap((request) => {
        // changeEmailStore.ChangeEmail();
        return apiService.request(API.CHANGEEMAIL, request).pipe(
          map((response: any) => {
            // changeEmailStore.ChangeEmailSuccess(response);
            return userActions.changeEmailSuccess();
          }),
          catchError(({ error }) => {
            // changeEmailStore.ChangeEmailFailure(error);
            return of(userActions.changeEmailFailure());
          })
        );
      })
    );
  },
  {
    functional: true,
  }
);
