import { catchError, of, map, exhaustMap } from 'rxjs';
import { API } from '../../shared/utils/api.endpoints';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { inject } from '@angular/core';
import { ApiService } from '../../shared/services/api/api.service';
import { contactsActions } from './contacts.action';

export const contacts = createEffect(
  (actions$ = inject(Actions), apiService = inject(ApiService)) => {
    return actions$.pipe(
      ofType(contactsActions.contacts),
      exhaustMap((request) => {
        return apiService.request(API.CONTACTS, request).pipe(
          map((response: any) => {
            return contactsActions.contactsSuccess(response);
          }),
          catchError(({ error }) => {
            return of(contactsActions.contactsFailure());
          })
        );
      })
    );
  },
  {
    functional: true,
  }
);

// export const seenContact = createEffect(
//   (
//     store = inject(Store),
//     actions$ = inject(Actions),
//     apiService = inject(ApiService)
//   ) => {
//     return actions$.pipe(
//       ofType(contactsActions.seenContact),
//       exhaustMap(({ request }) => {
//         return apiService.request(API.SEENCONTACT, request).pipe(
//           map((response: any) => {
//             store.dispatch(contactsActions.contacts());
//             return contactsActions.seenContactSuccess(response);
//           }),
//           catchError(({ error }) => {
//             return of(contactsActions.seenContactFailure());
//           })
//         );
//       })
//     );
//   },
//   {
//     functional: true,
//   }
// );
