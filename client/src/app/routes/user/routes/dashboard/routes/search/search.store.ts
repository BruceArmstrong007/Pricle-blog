import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { catchError, of, switchMap, tap } from 'rxjs';
import { inject } from '@angular/core';
import { Search } from '../../../../../../stores/dashboard/dashboard.model';
import { ApiService } from '../../../../../../shared/services/api/api.service';
import {
  withCallState,
  setLoading,
  setLoaded,
} from '../../../../../../shared/component-store-features/api-call.feature';
import { API, APIEndpoint } from '../../../../../../shared/utils/api.endpoints';
import { User } from '../../../../../../stores/user/user.model';
import { contactsActions } from '../../../../../../stores/contacts/contacts.action';
import { ContactPayload } from '../../../../../../stores/contacts/contacts.model';
import { Store } from '@ngrx/store';

export type searchRoute = 'people' | 'tags';

export const SearchStore = signalStore(
  withState<{
    route: searchRoute;
    data: User[] | any[];
    clickedID: string;
  }>({
    route: 'people',
    data: [],
    clickedID: '',
  }),
  withCallState(),
  withMethods((state) => {
    const apiService = inject(ApiService);
    const store = inject(Store);
    return {
      setSelectedID: (id: string) => patchState(state, { clickedID: id }),
      resetData: () => patchState(state, { data: [], clickedID: '' }),
      setType: (route: searchRoute) => patchState(state, { route }),
      search: rxMethod<Search>((c$) =>
        c$.pipe(
          tap(() => {
            patchState(state, setLoading());
          }),
          switchMap((c) => {
            let url!: APIEndpoint;
            switch (c.route) {
              case 'people':
                url = API.SEARCHUSERS;
                break;
              case 'tags':
                url = API.SEARCHTAGS;
                break;
              default:
                url = API.SEARCHUSERS;
            }
            return apiService
              .request(url, undefined, {
                queryParams: objectToQueryString(c as any),
              })
              .pipe(
                tap((response: any) => {
                  patchState(state, setLoaded());
                  switch (c.route) {
                    case 'people':
                      patchState(state, {
                        route: 'people',
                        data: response.users,
                      });
                      break;
                    case 'tags':
                      patchState(state, {
                        route: 'tags',
                        data: response.tags,
                      });
                      break;
                    default:
                      patchState(state, {
                        route: 'people',
                        data: response.users,
                      });
                  }
                }),
                catchError((error) => {
                  let errorMsg =
                    error?.error?.message ??
                    error?.statusText ??
                    error?.message;
                  state.setError(errorMsg);
                  state.openAlert('API Error', errorMsg, 'ERROR');
                  return of(errorMsg);
                })
              );
          })
        )
      ),
      sendRequest: rxMethod<ContactPayload>((c$) =>
        c$.pipe(
          tap(() => {
            patchState(state, setLoading());
          }),
          switchMap((c) =>
            apiService.request(API.SENDREQUEST, c).pipe(
              tap((response: any) => {
                patchState(state, setLoaded());
                state.openAlert(
                  'Request Sent',
                  response?.message ?? 'Friend request sent successfully.',
                  'SUCCESS'
                );
                store.dispatch(contactsActions.contacts());
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

function objectToQueryString(obj: Record<string, string>) {
  return Object.keys(obj)
    .map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(obj[key])}`)
    .join('&');
}
