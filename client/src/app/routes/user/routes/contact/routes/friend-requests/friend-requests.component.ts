import { Store } from '@ngrx/store';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { contactsFeature } from '../../../../../../stores/contacts/contacts.reducer';

@Component({
  selector: 'app-friend-requests',
  standalone: true,
  imports: [],
  templateUrl: './friend-requests.component.html',
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
class FriendRequestsComponent {
  private readonly store = inject(Store);
  readonly contacts = this.store.selectSignal(contactsFeature.sentRequestList);
}

export default FriendRequestsComponent;