import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import {
  catchError,
  debounceTime,
  distinctUntilChanged,
  of,
  switchMap,
  tap,
} from 'rxjs';
import { inject } from '@angular/core';
import { ApiService } from '../../../../../../shared/services/api/api.service';
import {
  withCallState,
  setLoading,
  setLoaded,
} from '../../../../../../shared/component-store-features/api-call.feature';
import { API } from '../../../../../../shared/utils/api.endpoints';
import { ContactPayload } from '../../../../../../stores/contacts/contacts.model';
import { Store } from '@ngrx/store';

interface SearchTag {
  key: string;
}

interface CreateTag {
  name: string;
}

export const CreatePostsStore = signalStore(
  withState<{
    searchingTags: boolean;
    tags: Record<string, string>[];
  }>({
    searchingTags: false,
    tags: [],
  }),
  withCallState(),
  withMethods((state) => {
    const apiService = inject(ApiService);
    const store = inject(Store);
    return {
      createTag: rxMethod<CreateTag>((c$) =>
        c$.pipe(
          distinctUntilChanged(),
          debounceTime(500),
          tap(() => {
            patchState(state, setLoading());
          }),
          switchMap((c) =>
            apiService.request(API.CREATETAGS, c).pipe(
              tap((response: any) => {
                patchState(state, setLoaded());
                state.openAlert(
                  'Tag Created.',
                  response?.message ?? 'Tag created successfully.',
                  'SUCCESS'
                );
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
      searchTags: rxMethod<SearchTag>((c$) =>
        c$.pipe(
          distinctUntilChanged(),
          debounceTime(500),
          tap(() => {
            patchState(state, searchingTags());
          }),
          switchMap((c) =>
            apiService
              .request(API.SEARCHTAGS, undefined, {
                queryParams: objectToQueryString(c as any),
              })
              .pipe(
                tap((response: any) => {
                  patchState(state, doneSearchingTags());
                  patchState(state, { tags: [...response] });
                }),
                catchError((error) => {
                  patchState(state, doneSearchingTags());
                  let errorMsg =
                    error?.error?.message ??
                    error?.statusText ??
                    error?.message;
                  state.openAlert('API Error', errorMsg, 'ERROR');
                  return of(errorMsg);
                })
              )
          )
        )
      ),
      createPosts: rxMethod<ContactPayload>((c$) =>
        c$.pipe(
          tap(() => {
            patchState(state, setLoading());
          }),
          switchMap((c) =>
            apiService.request(API.CREATEPOST, c).pipe(
              tap((response: any) => {
                patchState(state, setLoaded());
                state.openAlert(
                  'Post Created.',
                  response?.message ?? 'Post created successfully.',
                  'SUCCESS'
                );
                // store.dispatch(contactsActions.contacts());
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

function searchingTags() {
  return { searchingTags: true };
}
function doneSearchingTags() {
  return { searchingTags: false };
}
