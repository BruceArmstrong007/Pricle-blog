import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-friend-requests',
  standalone: true,
  imports: [],
  templateUrl: './friend-requests.component.html',
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
class FriendRequestsComponent {}

export default FriendRequestsComponent;
