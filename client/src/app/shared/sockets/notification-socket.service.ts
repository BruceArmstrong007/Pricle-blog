import { Injectable, inject } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Socket, io } from 'socket.io-client';
import { Store } from '@ngrx/store';
import { filter } from 'rxjs';
import { authFeature } from '../../stores/auth/auth.reducer';
import { contactsFeature } from '../../stores/contacts/contacts.reducer';
import { contactsActions } from '../../stores/contacts/contacts.action';

interface ContactNotification {
  type: string;
  data: {
    status: string;
    userID: string;
    contactID: string;
  };
  userID: string;
}

@Injectable({
  providedIn: 'root',
})
export class NotificationSocketService {
  private socket: Socket | undefined;
  private readonly store = inject(Store);
  private readonly accesssToken$ = this.store.select(
    authFeature?.selectAccessToken
  );
  private readonly accesssToken = this.store.selectSignal(
    authFeature?.selectAccessToken
  );
  private readonly contactIDs = this.store.selectSignal(
    contactsFeature?.friendsIDs
  );
  private readonly contactEntities = this.store.selectSignal(
    contactsFeature?.selectEntities
  );
  // private readonly toastService = inject(MessageService);

  constructor() {
    this.accesssToken$
      .pipe(
        filter((res) => (res ? true : false))
        // take(1)
      )
      .subscribe((accessToken) => {
        if (this.socket) this.disconnect();
        this.socket = io(environment.wsURL + '/user', {
          forceNew: true,
          reconnection: true,
          reconnectionAttempts: 5,
          reconnectionDelay: 2000,
          reconnectionDelayMax: 5000,
          timeout: 10000,
          autoConnect: true,
          transports: ['websocket', 'polling'],
          query: {
            token: accessToken,
          },
        });
        this.socket?.on('connect', () => {
          this.listenToNotifications();
        });
      });
  }

  listenToNotifications() {
    this.socket?.on('get-notifications', (event: ContactNotification) => {
      switch (event?.type) {
        case 'CONTACT':
          this.handleContactNotifications(event);
          break;
        default:
      }
    });
  }

  handleContactNotifications(event: ContactNotification) {
    this.store.dispatch(contactsActions.contacts());
    const contactName = this.contactEntities()[event?.data?.contactID]?.name;
    switch (event?.data?.status) {
      case 'accept-request':
        // this.toastService.add({
        //   severity: 'success',
        //   summary: 'You got a new friend!',
        //   detail: contactName + ' accepted your friend request',
        // });
        break;
      case 'send-request':
        // this.toastService.add({
        //   severity: 'success',
        //   summary: 'You got a new friend request!',
        //   detail: 'Someone sent you friend request',
        // });
        break;
      case 'cancel-request':
        break;
      case 'decline-request':
        break;
      case 'remove-contact':
        break;
      case 'account-deleted':
        break;
    }
  }

  disconnect() {
    this.socket?.disconnect();
    this.socket?.removeAllListeners();
    this.socket?.close();
  }
}
