import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [],
  templateUrl: './profile.component.html',
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
class ProfileComponent {}

export default ProfileComponent;
