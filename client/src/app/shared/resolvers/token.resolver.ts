import { ResolveFn, Router } from '@angular/router';
import { map, catchError, throwError, of } from 'rxjs';
import { API } from '../utils/api.endpoints';
import { inject } from '@angular/core';
import { ApiService } from '../services/api/api.service';
import { Store } from '@ngrx/store';
import { userActions } from '../../stores/user/user.action';
import { authActions } from '../../stores/auth/auth.action';
import { authFeature } from '../../stores/auth/auth.reducer';
import { contactsActions } from '../../stores/contacts/contacts.action';

export const tokenResolver: ResolveFn<boolean> = () => {
  const apiService = inject(ApiService);
  const store = inject(Store);
  const accessToken = store.selectSignal(authFeature.selectAccessToken);
  if (accessToken()) {
    store.dispatch(userActions.profile());
    store.dispatch(contactsActions.contacts());
    return true;
  }

  return apiService.request(API.REFRESH).pipe(
    map((res: any) => {
      if (res?.accessToken) {
        store.dispatch(
          authActions.refreshToken({ accessToken: res?.accessToken })
        );
        store.dispatch(userActions.profile());
        store.dispatch(contactsActions.contacts());
        return true;
      }
      store.dispatch(userActions.logout());
      return false;
    }),
    catchError((err) => {
      store.dispatch(userActions.logout());
      return of(err);
    })
  );
};
