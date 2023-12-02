import { authActions } from './../../../../stores/auth/auth.action';
import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import {
  setError,
  setLoaded,
  setLoading,
  withCallState,
} from '../../../../shared/component-store-features/api-call.feature';
import {
  catchError,
  debounceTime,
  exhaustMap,
  map,
  of,
  tap,
  throwError,
} from 'rxjs';
import { inject } from '@angular/core';
import { ApiService } from '../../../../shared/services/api/api.service';
import { API } from '../../../../shared/utils/api.endpoints';
import { Store } from '@ngrx/store';
import { Router, Routes } from '@angular/router';
import { ClientRoutes } from '../../../../shared/utils/client.routes';
import { AccessToken, Login } from '../../../../stores/auth/auth.model';

export const LoginStore = signalStore(
  { providedIn: 'root' },
  withState({
    passwordVisibility: false,
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
      login: rxMethod<Login>((c$) =>
        c$.pipe(
          debounceTime(300),
          tap(() => patchState(state, setLoading())),
          exhaustMap((c) =>
            apiService.request(API.LOGIN, c).pipe(
              map((response: any) => {
                patchState(state, setLoaded());
                const token: AccessToken = {
                  accessToken: response?.accessToken,
                };
                localStorage.setItem('isLoggedIn', 'true');
                store.dispatch(authActions.setToken(token));
                router.navigateByUrl(ClientRoutes.User.Root);
              }),
              catchError((error) => {
                patchState(
                  state,
                  setError(error?.statusText ?? error?.message)
                );
                return throwError(() => error);
              })
            )
          )
        )
      ),
    };
  })
);
