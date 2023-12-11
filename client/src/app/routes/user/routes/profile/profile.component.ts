import { ChangeDetectionStrategy, Component } from '@angular/core';
import ProfilePictureComponent from './components/profile-picture/profile-picture.component';
import { ProfileDetailsComponent } from './components/profile-details/profile-details.component';
import { ProfileStore } from './profile.store';
import CardComponent from '../../../../shared/components/card/card.component';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CardComponent, ProfilePictureComponent, ProfileDetailsComponent],
  templateUrl: './profile.component.html',
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [ProfileStore],
})
class ProfileComponent {}

export default ProfileComponent;
