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
  VerifyEmail,
  VerifyEmailLink,
} from '../../../../stores/auth/auth.model';

export const VerifyAccountStore = signalStore(
  { providedIn: 'root' },
  withState({
    disableEmail: false,
    tokenApiLoading: false,
  }),
  withCallState(),
  withMethods((state) => {
    const apiService = inject(ApiService);
    const store = inject(Store);
    const router = inject(Router);
    return {
      disableEmailField: () =>
        patchState(state, {
          disableEmail: true,
        }),
      verifyToken: rxMethod<VerifyEmail>((c$) =>
        c$.pipe(
          tap((c) => {
            patchState(state, setLoading());
          }),
          switchMap((c) =>
            apiService.request(API.VERIFY_EMAIL, c).pipe(
              tap((response: any) => {
                patchState(state, setLoaded());
                store.dispatch(
                  alertActions.addAlert({
                    alert: {
                      type: 'SUCCESS',
                      message: response?.message ?? 'Your email is verified!.',
                      id: generateAlertID(),
                      title: 'Verification Successful',
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
      sendToken: rxMethod<VerifyEmailLink>((c$) =>
        c$.pipe(
          tap(() => {
            patchState(state, { tokenApiLoading: true });
          }),
          switchMap((c) =>
            apiService.request(API.VERIFY_EMAIL_LINK, c).pipe(
              tap((response: any) => {
                patchState(state, { tokenApiLoading: false });
                patchState(state, { disableEmail: true });
                store.dispatch(
                  alertActions.addAlert({
                    alert: {
                      type: 'SUCCESS',
                      message:
                        response?.message ??
                        'Verification Token is sent to your email!.',
                      id: generateAlertID(),
                      title: 'Emailing Token Successful',
                    },
                  })
                );
              }),
              catchError((error) => {
                patchState(state, { tokenApiLoading: false });
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
