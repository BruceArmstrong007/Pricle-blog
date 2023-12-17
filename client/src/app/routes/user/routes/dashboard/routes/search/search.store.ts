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

export const SearchStore = signalStore(
  withState({
    type: '',
    data: [],
  }),
  withCallState(),
  withMethods((state) => {
    const apiService = inject(ApiService);
    return {
      search: rxMethod<Search>((c$) =>
        c$.pipe(
          tap(() => {
            patchState(state, setLoading());
          }),
          switchMap((c) => {
            let url!: APIEndpoint;
            switch (c.type) {
              case 'username':
              case 'name':
                url = API.SEARCHUSERS;
                break;
              case 'tag':
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
                  switch (c.type) {
                    case 'username':
                    case 'name':
                      url = API.SEARCHUSERS;
                      patchState(state, {
                        type: 'people',
                        data: response.users,
                      });
                      break;
                    case 'tag':
                      url = API.SEARCHTAGS;
                      patchState(state, {
                        type: 'tags',
                        data: response.tags,
                      });
                      break;
                    default:
                      url = API.SEARCHUSERS;
                      patchState(state, {
                        type: 'people',
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
    };
  })
);

function objectToQueryString(obj: Record<string, string>) {
  return Object.keys(obj)
    .map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(obj[key])}`)
    .join('&');
}
