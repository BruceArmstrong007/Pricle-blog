import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { tap, switchMap, catchError, of } from 'rxjs';
import {
  setLoading,
  setLoaded,
  withCallState,
} from '../../../../../../shared/component-store-features/api-call.feature';
import { API } from '../../../../../../shared/utils/api.endpoints';
import { inject } from '@angular/core';
import { ApiService } from '../../../../../../shared/services/api/api.service';
import { Store } from '@ngrx/store';
import { contactsActions } from '../../../../../../stores/contacts/contacts.action';
import { ContactPayload } from '../../../../../../stores/contacts/contacts.model';

export const ReceivedRequestsStore = signalStore(
  withState<{
    declineRequestLoadingState: boolean;
    acceptRequestLoadingState: boolean;
    clickedID: string | null;
  }>({
    declineRequestLoadingState: false,
    acceptRequestLoadingState: false,
    clickedID: null,
  }),
  withCallState(),
  withMethods((state) => {
    const apiService = inject(ApiService);
    const store = inject(Store);
    return {
      clicked: (id: string) => patchState(state, { clickedID: id }),
      declineRequest: rxMethod<ContactPayload>((c$) =>
        c$.pipe(
          tap(() => {
            patchState(state, setLoading());
            patchState(state, { declineRequestLoadingState: true });
          }),
          switchMap((c) =>
            apiService.request(API.DECLINEREQUEST, c).pipe(
              tap((response: any) => {
                patchState(state, setLoaded());
                patchState(state, { declineRequestLoadingState: false });
                state.openAlert(
                  'Request Declined',
                  response?.message ?? 'Friend request declined successfully.',
                  'SUCCESS'
                );
                store.dispatch(contactsActions.contacts());
              }),
              catchError((error) => {
                patchState(state, { declineRequestLoadingState: false });
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
      acceptRequest: rxMethod<ContactPayload>((c$) =>
        c$.pipe(
          tap(() => {
            patchState(state, setLoading());
            patchState(state, { acceptRequestLoadingState: true });
          }),
          switchMap((c) =>
            apiService.request(API.DECLINEREQUEST, c).pipe(
              tap((response: any) => {
                patchState(state, setLoaded());
                patchState(state, { acceptRequestLoadingState: false });
                state.openAlert(
                  'Request Accepted',
                  response?.message ?? 'Friend request accepted successfully.',
                  'SUCCESS'
                );
                store.dispatch(contactsActions.contacts());
              }),
              catchError((error) => {
                patchState(state, { acceptRequestLoadingState: false });
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
