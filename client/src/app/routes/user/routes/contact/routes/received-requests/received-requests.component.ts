import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { contactsFeature } from '../../../../../../stores/contacts/contacts.reducer';

@Component({
  selector: 'app-received-requests',
  standalone: true,
  imports: [],
  templateUrl: './received-requests.component.html',
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
class ReceivedRequestsComponent {
  private readonly store = inject(Store);
  readonly contacts = this.store.selectSignal(contactsFeature.receivedRequestList);
}

export default ReceivedRequestsComponent;
