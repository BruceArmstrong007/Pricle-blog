import { NgClass, NgFor, NgIf } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Signal,
  computed,
  inject,
  signal,
} from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import ButtonComponent from '../../../../shared/components/button/button.component';
import CardComponent from '../../../../shared/components/card/card.component';
import { Store } from '@ngrx/store';
import { selectUrl } from '../../../../shared/router-store/router-selector';
import {
  RoutesInterface,
  ClientRoutes,
} from '../../../../shared/utils/client.routes';
import ContactSkeletonComponent from './components/contact-skeleton/contact-skeleton.component';
import { contactsFeature } from '../../../../stores/contacts/contacts.reducer';
import DividerComponent from '../../../../shared/components/divider/divider.component';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [
    NgClass,
    NgIf,
    NgFor,
    RouterLink,
    RouterOutlet,
    ButtonComponent,
    CardComponent,
    DividerComponent,
    ContactSkeletonComponent
  ],
  templateUrl: './contact.component.html',
  styles: `
  .height {
    height: calc(100dvh - 250px);
  }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
class ContactComponent {
  private readonly store = inject(Store);
  readonly routePath = this.store.selectSignal(selectUrl);
  readonly Routes: Signal<RoutesInterface> = signal(ClientRoutes);
  readonly contactState = this.store.selectSignal(contactsFeature.selectState);
  readonly currentRoute = computed(() => {
    let currentRoute;
    const route = this.routePath().split('/').pop();
    switch (route) {
      case 'friend-requests':
        currentRoute = 'Friend Requests';
        break;
      case 'received-requests':
        currentRoute = 'Received Requests';
        break;
      case 'friends':
      default:
        currentRoute = 'Friends';
    }
    return currentRoute;
  });
}
export default ContactComponent;
