import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import {
  setLoaded,
  setLoading,
  withCallState,
} from '../../../../shared/component-store-features/api-call.feature';
import { catchError, of, switchMap, tap } from 'rxjs';
import { inject } from '@angular/core';
import { ApiService } from '../../../../shared/services/api/api.service';
import { API } from '../../../../shared/utils/api.endpoints';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { alertActions } from '../../../../stores/alert/alert.action';
import { generateAlertID } from '../../../../shared/utils/variables';
import { ClientRoutes } from '../../../../shared/utils/client.routes';
import {
  ResetPassword,
  ResetPasswordLink,
} from '../../../../stores/auth/auth.model';

export const ResetPasswordStore = signalStore(
  withState({
    disableEmail: false,
    emailApiLoading: false,
    tokenPresent: false,
    passwordVisibility: false,
    confirmPasswordVisibility: false,
  }),
  withCallState(),
  withMethods((state) => {
    const apiService = inject(ApiService);
    const store = inject(Store);
    const router = inject(Router);
    return {
      setToken: () =>
      patchState(state, {
        tokenPresent: true,
      }),
      togglePassword: () =>
        patchState(state, {
          passwordVisibility: !state.passwordVisibility(),
        }),
      toggleConfirmPassword: () =>
        patchState(state, {
          confirmPasswordVisibility: !state.confirmPasswordVisibility(),
        }),

      disableEmailField: () =>
        patchState(state, {
          disableEmail: true,
        }),
      resetPassword: rxMethod<ResetPassword>((c$) =>
        c$.pipe(
          tap((c) => {
            patchState(state, setLoading());
          }),
          switchMap((c) =>
            apiService.request(API.RESET_PASSWORD, c).pipe(
              tap((response: any) => {
                patchState(state, setLoaded());
                store.dispatch(
                  alertActions.addAlert({
                    alert: {
                      type: 'SUCCESS',
                      message:
                        response?.message ?? 'Your password has been reset!.',
                      id: generateAlertID(),
                      title: 'Reset Password Successful',
                    },
                  })
                );
                router.navigateByUrl(ClientRoutes.Auth.Login);
              }),
              catchError((error) => {
                let errorMsg =
                  error?.error?.message ?? error?.statusText ?? error?.message;
                state.setError(errorMsg);
                return of(errorMsg);
              })
            )
          )
        )
      ),
      sendEmail: rxMethod<ResetPasswordLink>((c$) =>
        c$.pipe(
          tap(() => {
            patchState(state, { emailApiLoading: true });
          }),
          switchMap((c) =>
            apiService.request(API.RESET_PASSWORD_LINK, c).pipe(
              tap((response: any) => {
                patchState(state, { emailApiLoading: false });
                patchState(state, { disableEmail: true });
                store.dispatch(
                  alertActions.addAlert({
                    alert: {
                      type: 'SUCCESS',
                      message:
                        response?.message ??
                        'Verification Link is sent to your email!.',
                      id: generateAlertID(),
                      title: 'Emailing Link Successful',
                    },
                  })
                );
              }),
              catchError((error) => {
                patchState(state, { emailApiLoading: false });
                let errorMsg =
                  error?.error?.message ?? error?.statusText ?? error?.message;
                state.setError(errorMsg);
                return of(errorMsg);
              })
            )
          )
        )
      ),
    };
  })
);
