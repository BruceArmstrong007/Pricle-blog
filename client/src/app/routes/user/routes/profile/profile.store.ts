import { EditableFieldState } from './../../../../../../../server/libs/common/src/utils/variables';
import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import { inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { userActions } from '../../../../stores/user/user.action';

export const ProfileStore = signalStore(
  withState<{
    nameState: EditableFieldState;
    usernameState: EditableFieldState;
    bioState: EditableFieldState;
  }>({
    nameState: 'View',
    usernameState: 'View',
    bioState: 'View',
  }),
  withMethods((state) => {
    const store = inject(Store);
    return {
      updateName: (value: EditableFieldState) =>
        patchState(state, {
          nameState: value,
        }),
      updateUserName: (value: EditableFieldState) =>
        patchState(state, {
          usernameState: value,
        }),
      updateBio: (value: EditableFieldState) =>
        patchState(state, {
          bioState: value,
        }),
      setAll: (value: EditableFieldState) =>
        patchState(state, {
          nameState: value,
          usernameState: value,
          bioState: value,
        }),
      update: (request: any) => {
        store.dispatch(userActions.updateUser({ request }));
      },
    };
  })
);
