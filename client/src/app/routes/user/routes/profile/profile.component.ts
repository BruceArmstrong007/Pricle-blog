import { AsyncPipe, DatePipe, NgIf, NgSwitch } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { RouterLink } from '@angular/router';
import ButtonComponent from '../../../../shared/components/button/button.component';
import CardComponent from '../../../../shared/components/card/card.component';
import LoaderComponent from '../../../../shared/components/loader/loader.component';
import { Store } from '@ngrx/store';
import {
  RoutesInterface,
  ClientRoutes,
} from '../../../../shared/utils/client.routes';
import ImgAvatarComponent from '../../../../shared/components/img-avatar/img-avatar.component';
import { userFeature } from '../../../../stores/user/user.reducer';
import { ProfileStore } from './profile.store';
import { EditableInputComponent } from '../../../../shared/components/editable-input/editable-input.component';
import { distinctUntilChanged, tap } from 'rxjs';
import EditableTextareaComponent from '../../../../shared/components/editable-textarea/editable-textarea.component';

type FieldType = 'name' | 'bio' | 'username';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgSwitch,
    NgIf,
    DatePipe,
    AsyncPipe,
    RouterLink,
    CardComponent,
    ButtonComponent,
    LoaderComponent,
    ImgAvatarComponent,
    EditableInputComponent,
    EditableTextareaComponent
  ],
  templateUrl: './profile.component.html',
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [ProfileStore],
})
class ProfileComponent {
  private readonly fb: FormBuilder = inject(FormBuilder);
  readonly form: FormGroup = this.fb.group({
    username: [
      { value: '', disabled: true },
      Validators.compose([Validators.required, Validators.maxLength(25)]),
    ],
    name: [
      { value: '', disabled: true },
      Validators.compose([Validators.maxLength(50)]),
    ],
    bio: [
      { value: '', disabled: true },
      Validators.compose([Validators.maxLength(500)]),
    ],
  });
  readonly Routes: RoutesInterface = ClientRoutes;
  private readonly store = inject(Store);
  readonly state = inject(ProfileStore);
  readonly userDetails$ = this.store.select(userFeature.selectDetails).pipe(
    distinctUntilChanged(),
    tap((user) => {
      if (!user) return;
      if (user?.name && user?.name !== this.form.get('name')?.value) {
        this.form.get('name')?.setValue(user?.name);
      }
      if (
        user?.username &&
        user?.username !== this.form.get('username')?.value
      ) {
        this.form.get('username')?.setValue(user?.username);
      }
      if (user?.bio && user?.bio !== this.form.get('bio')?.value) {
        this.form.get('bio')?.setValue(user?.bio);
      }
      this.state.setAll('View');
    })
  );
  readonly userProfile = this.store.selectSignal(userFeature.userProfile);

  edit(key: FieldType) {
    switch (key) {
      case 'name':
        this.state.updateName('Edit');
        break;
      case 'username':
        this.state.updateUserName('Edit');
        break;
      case 'bio':
        this.state.updateBio('Edit');
        break;
      default:
    }
    this.form.get(key)?.enable();
  }

  save(key: FieldType) {
    switch (key) {
      case 'name':
        this.state.updateName('Load');
        break;
      case 'username':
        this.state.updateUserName('Load');
        break;
      case 'bio':
        this.state.updateBio('Load');
        break;
      default:
    }
    let request: Record<string, string> = {};
    request[key] = this.form.get(key)?.getRawValue();
    this.state.update(request);
    this.form.get(key)?.disable();
  }
}

export default ProfileComponent;
