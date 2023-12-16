import { NgFor, NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { contactsFeature } from '../../../../../../stores/contacts/contacts.reducer';
import ContactCardComponent from '../../components/contact-card/contact-card.component';
import { FriendStore } from './friends.store';
import LoaderComponent from '../../../../../../shared/components/loader/loader.component';
import ButtonComponent from '../../../../../../shared/components/button/button.component';
import DividerComponent from '../../../../../../shared/components/divider/divider.component';

@Component({
  selector: 'app-friends',
  standalone: true,
  imports: [
    NgFor,
    NgIf,
    ContactCardComponent,
    LoaderComponent,
    ButtonComponent,
    DividerComponent,
  ],
  templateUrl: './friends.component.html',
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [FriendStore],
})
class FriendsComponent {
  private readonly store = inject(Store);
  readonly state = inject(FriendStore);
  readonly contacts = this.store.selectSignal(contactsFeature.friendsList);

  removeFriend(contactID: string) {
    this.state.clicked(contactID);
    this.state.removeFriend({ contactID });
  }
}
export default FriendsComponent;
