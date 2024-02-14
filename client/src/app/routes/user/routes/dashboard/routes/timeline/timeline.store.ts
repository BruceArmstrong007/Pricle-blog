import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import {
  setLoaded,
  setLoading,
  withCallState,
} from '../../../../../../shared/component-store-features/api-call.feature';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { inject } from '@angular/core';
import { tap, switchMap, catchError, of } from 'rxjs';
import { API } from '../../../../../../shared/utils/api.endpoints';
import { ApiService } from '../../../../../../shared/services/api/api.service';
import { Post } from '../../../../../../stores/posts/posts.model';
import { Router } from '@angular/router';

interface TimelinePosts {
  pageSize: number;
  page: number;
}

export const TimelineStore = signalStore(
  withState<{
    posts: Post[];
    page: number,
    pageSize: number,
    refreshPosts: boolean,
    scrolledtoBottom: boolean
  }>({
    posts: [],
    page: 1,
    pageSize: 5,
    refreshPosts: false,
    scrolledtoBottom: false
  }),
  withCallState(),
  withMethods((state) => {
    const apiService = inject(ApiService);
    const router = inject(Router);
    return {
      selectedPost: (postID: string) => {
        router.navigate(['/user/posts/view/'+ postID])
      },
      newPage:(newState: number) => {
        patchState(state, {page : newState })
      },
      refreshState: (refreshPosts) => {
        patchState(state,  { refreshPosts })
      },
      scrolledToBottomState: (scrolledtoBottom) => {
        patchState(state,  { scrolledtoBottom })
      },
      timelinePosts: rxMethod<TimelinePosts>((c$) =>
        c$.pipe(
          tap(() => {
            patchState(state, setLoading());
          }),
          switchMap((c) =>
            apiService
              .request(API.TIMELINEPOST, undefined, { queryParams: objectToQueryString(c as any) })
              .pipe(
                tap((response: any) => {
                  patchState(state, setLoaded());
                  patchState(state, {refreshPosts: false});
                  patchState(state, (state) => ({posts: [...state.posts,...response], page: state.page+1}) );
                }),
                catchError((error) => {
                  let errorMsg =
                    error?.error?.message ??
                    error?.statusText ??
                    error?.message;
                  state.setError(errorMsg);
                  patchState(state, {refreshPosts: false});
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
