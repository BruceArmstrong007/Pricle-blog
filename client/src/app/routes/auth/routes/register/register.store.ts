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
import { Register } from '../../../../stores/auth/auth.model';

export const RegisterStore = signalStore(
  withState({
    passwordVisibility: false,
    confirmPasswordVisibility: false,
  }),
  withCallState(),
  withMethods((state) => {
    const apiService = inject(ApiService);
    const store = inject(Store);
    const router = inject(Router);
    return {
      togglePassword: () =>
        patchState(state, {
          passwordVisibility: !state.passwordVisibility(),
        }),
      toggleConfirmPassword: () =>
        patchState(state, {
          confirmPasswordVisibility: !state.confirmPasswordVisibility(),
        }),
      register: rxMethod<Register>((c$) =>
        c$.pipe(
          tap(() => {
            patchState(state, setLoading());
          }),
          switchMap((c) =>
            apiService.request(API.REGISTER, c).pipe(
              tap((response: any) => {
                patchState(state, setLoaded());
                const encoded = btoa(
                  JSON.stringify({ email: response.email, token: null })
                );
                state.openAlert(
                  'Registeration Successful',
                  response?.message ?? 'Please verify your email account!.',
                  'SUCCESS'
                );
                router.navigateByUrl(`/auth/verify-account?token=${encoded}`);
              }),
              catchError((error) => {
                let errorMsg =
                  error?.error?.message ?? error?.statusText ?? error?.message;
                state.setError(errorMsg);
                state.openAlert('API Error', errorMsg, 'ERROR');
                return of(errorMsg);
              })
            )
          )
        )
      ),
    };
  })
);
