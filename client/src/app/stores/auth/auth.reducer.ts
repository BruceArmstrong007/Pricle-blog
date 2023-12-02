import { createFeature, createReducer, on } from '@ngrx/store';
import { AuthState } from './auth.model';
import { authActions } from './auth.action';

const initialState: AuthState = {
  accessToken: null,
};

export const authFeature = createFeature({
  name: 'auth',
  reducer: createReducer(
    initialState,
    on(
      authActions.refreshToken,
      (state, action): AuthState => ({
        ...state,
        accessToken: action.accessToken,
      })
    ),
    on(
      authActions.setToken,
      (state, action): AuthState => ({
        ...state,
        accessToken: action.accessToken,
      })
    ),
    on(
      authActions.resetState,
      (state): AuthState => ({
        ...state,
        ...initialState,
      })
    )
  ),
});
