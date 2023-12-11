import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ClientRoutes, RoutesInterface } from '../../../../../../shared/utils/client.routes';
import { NgSwitch, NgIf, DatePipe, AsyncPipe } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { distinctUntilChanged, tap } from 'rxjs';
import ButtonComponent from '../../../../../../shared/components/button/button.component';
import { EditableInputComponent } from '../../../../../../shared/components/editable-input/editable-input.component';
import EditableTextareaComponent from '../../../../../../shared/components/editable-textarea/editable-textarea.component';
import LoaderComponent from '../../../../../../shared/components/loader/loader.component';
import { userFeature } from '../../../../../../stores/user/user.reducer';
import { ProfileStore } from '../../profile.store';

type FieldType = 'name' | 'bio' | 'username';


@Component({
  selector: 'app-profile-details',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgSwitch,
    NgIf,
    DatePipe,
    AsyncPipe,
    RouterLink,
    ButtonComponent,
    LoaderComponent,
    EditableInputComponent,
    EditableTextareaComponent,
  ],
  templateUrl: './profile-details.component.html',
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
  // providers: [ProfileStore],
})
export class ProfileDetailsComponent {
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
