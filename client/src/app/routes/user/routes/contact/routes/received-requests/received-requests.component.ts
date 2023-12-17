import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { contactsFeature } from '../../../../../../stores/contacts/contacts.reducer';
import LoaderComponent from '../../../../../../shared/components/loader/loader.component';
import { NgFor, NgIf } from '@angular/common';
import ButtonComponent from '../../../../../../shared/components/button/button.component';
import DividerComponent from '../../../../../../shared/components/divider/divider.component';
import ContactCardComponent from '../../components/contact-card/contact-card.component';
import { ReceivedRequestsStore } from './received-requests.store';
import EmptyComponent from '../../../../../../shared/components/empty/empty.component';

@Component({
  selector: 'app-received-requests',
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
  templateUrl: './received-requests.component.html',
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [ReceivedRequestsStore]
})
class ReceivedRequestsComponent {
  private readonly store = inject(Store);
  readonly state = inject(ReceivedRequestsStore);
  readonly contacts = this.store.selectSignal(
    contactsFeature.receivedRequestList
  );

  acceptRequest(contactID: string) {
    this.state.clicked(contactID);
    this.state.acceptRequest({contactID});
  }
  
  declineRequest(contactID: string) {
    this.state.clicked(contactID);
    this.state.declineRequest({contactID});
  }
}

export default ReceivedRequestsComponent;
