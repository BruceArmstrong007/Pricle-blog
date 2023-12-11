import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import ProfilePictureComponent from './components/profile-picture/profile-picture.component';
import { ProfileDetailsComponent } from './components/profile-details/profile-details.component';
import { ProfileStore } from './profile.store';
import CardComponent from '../../../../shared/components/card/card.component';
import { Store } from '@ngrx/store';
import { userFeature } from '../../../../stores/user/user.reducer';
import LoaderComponent from '../../../../shared/components/loader/loader.component';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    NgIf,
    CardComponent,
    ProfilePictureComponent,
    ProfileDetailsComponent,
    LoaderComponent,
  ],
  templateUrl: './profile.component.html',
  styles: `
  loader {
    --loader-font-size: 6rem;
    --loader-line-height: 1;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [ProfileStore],
})
class ProfileComponent {
  private readonly store = inject(Store);
  loading = this.store.selectSignal(userFeature.selectIsLoading);
}

export default ProfileComponent;
