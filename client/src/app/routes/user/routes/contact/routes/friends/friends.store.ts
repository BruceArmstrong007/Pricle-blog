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
import { RemoveContact } from '../../../../../../stores/contacts/contacts.model';

export const FriendStore = signalStore(
  withState({
    unfriendLoadingState: false,
  }),
  withCallState(),
  withMethods((state) => {
    const apiService = inject(ApiService);
    const store = inject(Store);
    return {
      removeFriend: rxMethod<RemoveContact>((c$) =>
        c$.pipe(
          tap(() => {
            patchState(state, setLoading());
            patchState(state, { unfriendLoadingState: true });
          }),
          switchMap((c) =>
            apiService.request(API.REMOVECONTACT, c).pipe(
              tap((response: any) => {
                patchState(state, setLoaded());
                patchState(state, { unfriendLoadingState: false });
                state.openAlert(
                  'Contact Removed',
                  response?.message ?? 'Contact removed successfully.',
                  'SUCCESS'
                );
                store.dispatch(contactsActions.contacts());
                // const user = store.selectSignal(userFeature.selectDetails);
                // store.dispatch(
                //   channelsActions.removeRoom({
                //     roomID: generateRoomIDs(user()?._id as string, request?.contactID),
                //   })
                // );
              }),
              catchError((error) => {
                patchState(state, { unfriendLoadingState: false });
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
