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
import {
  ContactPayload,
} from '../../../../../../stores/contacts/contacts.model';

export const SentRequestsStore = signalStore(
  withState<{
    cancelRequestLoadingState: boolean;
    clickedID: string | null;
  }>({
    cancelRequestLoadingState: false,
    clickedID: null,
  }),
  withCallState(),
  withMethods((state) => {
    const apiService = inject(ApiService);
    const store = inject(Store);
    return {
      clicked: (id: string) => patchState(state, { clickedID: id }),
      cancelRequest: rxMethod<ContactPayload>((c$) =>
        c$.pipe(
          tap(() => {
            patchState(state, setLoading());
            patchState(state, { cancelRequestLoadingState: true });
          }),
          switchMap((c) =>
            apiService.request(API.CANCELREQUEST, c).pipe(
              tap((response: any) => {
                patchState(state, setLoaded());
                patchState(state, { cancelRequestLoadingState: false });
                state.openAlert(
                  'Request Cancelled',
                  response?.message ?? 'Friend request cancelled successfully.',
                  'SUCCESS'
                );
                store.dispatch(contactsActions.contacts());
              }),
              catchError((error) => {
                patchState(state, { cancelRequestLoadingState: false });
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
