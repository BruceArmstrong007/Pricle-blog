import { inject } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { delay, map } from 'rxjs';
import { alertActions } from './alert.action';

export const alertEffect = createEffect(
  (actions$ = inject(Actions)) => {
    return actions$.pipe(
      ofType(alertActions.addAlert),
      delay(4000),
      map(({ alert }) => alertActions.removeAlert({ alertID: alert.id }))
    );
  },
  {
    functional: true,
  }
);
