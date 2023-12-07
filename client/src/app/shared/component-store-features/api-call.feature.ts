import { computed, inject } from '@angular/core';
import {
  patchState,
  signalStoreFeature,
  withComputed,
  withMethods,
  withState,
} from '@ngrx/signals';
import { Store } from '@ngrx/store';
import { alertActions } from '../../stores/alert/alert.action';
import { generateAlertID } from '../utils/variables';

export type CallState = 'init' | 'loading' | 'loaded' | { error: string };

export function withCallState() {
  return signalStoreFeature(
    withState<{ callState: CallState }>({ callState: 'init' }),
    withComputed(({ callState }) => ({
      loading: computed(() => callState() === 'loading'),
      loaded: computed(() => callState() === 'loaded'),
      error: computed(() => {
        const state = callState();
        return typeof state === 'object' ? state.error : null;
      }),
    })),
    withMethods((state) => {
      const store = inject(Store);
      return {
        setError: (error: string) => {
          patchState(state, setError(error));
          let alertID = generateAlertID();
          store.dispatch(
            alertActions.addAlert({
              alert: {
                id: alertID,
                title: 'API Error',
                message: error,
                type: 'ERROR',
              },
            })
          );
          setTimeout(() => {
            store.dispatch(alertActions.removeAlert({ alertID }));
          }, 4000);
        },
      };
    })
  );
}

export function setLoading(): { callState: CallState } {
  return { callState: 'loading' };
}

export function setLoaded(): { callState: CallState } {
  return { callState: 'loaded' };
}

function setError(error: string): { callState: CallState } {
  return { callState: { error } };
}
