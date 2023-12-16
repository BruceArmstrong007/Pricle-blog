import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { contactsFeature } from '../../../../../../stores/contacts/contacts.reducer';

@Component({
  selector: 'app-sent-requests',
  standalone: true,
  imports: [],
  templateUrl: './sent-requests.component.html',
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
class SentRequestsComponent {
  private readonly store = inject(Store);
  readonly contacts = this.store.selectSignal(contactsFeature.sentRequestList);
}
export default SentRequestsComponent;
