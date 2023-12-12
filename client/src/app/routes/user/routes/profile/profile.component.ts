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
  template: `
    <app-card class="block md:w-96">
      <ng-container ngProjectAs="header">
        <div class="w-full text-center text-2xl pt-4 font-bold">Profile</div>
      </ng-container>
      <ng-container ngProjectAs="body">
        <app-profile-picture />
        <app-profile-details />
      </ng-container>
    </app-card>
    @if (loading()) {
    <div
      class="fixed top-0 left-0 w-full h-full flex justify-center items-center"
    >
      <loader />
    </div>
    }
  `,
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
