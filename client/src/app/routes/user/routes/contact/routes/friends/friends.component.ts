import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-friends',
  standalone: true,
  imports: [],
  templateUrl: './friends.component.html',
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
class FriendsComponent {}
export default FriendsComponent;
