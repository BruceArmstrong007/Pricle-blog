import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { contactsFeature } from '../../../../../../stores/contacts/contacts.reducer';
import { NgFor, NgIf } from '@angular/common';
import ButtonComponent from '../../../../../../shared/components/button/button.component';
import DividerComponent from '../../../../../../shared/components/divider/divider.component';
import LoaderComponent from '../../../../../../shared/components/loader/loader.component';
import ContactCardComponent from '../../components/contact-card/contact-card.component';
import { SentRequestsStore } from './sent-requests.store';
import EmptyComponent from '../../../../../../shared/components/empty/empty.component';

@Component({
  selector: 'app-sent-requests',
  standalone: true,
  imports: [
    NgFor,
    NgIf,
    ContactCardComponent,
    LoaderComponent,
    ButtonComponent,
    DividerComponent,
    EmptyComponent
  ],
  templateUrl: './sent-requests.component.html',
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [SentRequestsStore],
})
class SentRequestsComponent {
  private readonly store = inject(Store);
  readonly state = inject(SentRequestsStore);
  readonly contacts = this.store.selectSignal(contactsFeature.sentRequestList);

  cancelRequest(contactID: string) {
    this.state.clicked(contactID);
    this.state.cancelRequest({ contactID });
  }
}
export default SentRequestsComponent;
