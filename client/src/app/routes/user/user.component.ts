import {
  ChangeDetectionStrategy,
  Component,
  Signal,
  inject,
  signal,
} from '@angular/core';
import { NotificationSocketService } from '../../shared/sockets/notification-socket.service';
import ButtonComponent from '../../shared/components/button/button.component';
import NavbarComponent from '../../shared/components/navbar/navbar.component';
import { NgIf } from '@angular/common';
import { RouterLink, RouterOutlet } from '@angular/router';
import { Store } from '@ngrx/store';
import { selectUrl } from '../../shared/router-store/router-selector';
import {
  RoutesInterface,
  ClientRoutes,
} from '../../shared/utils/client.routes';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [RouterOutlet, RouterLink, NgIf, NavbarComponent, ButtonComponent],
  styles: '',
  template: `
      <div class="h-full flex flex-col">
      <app-navbar>
        <ng-container ngProjectAs="navbar-right">
        </ng-container>
      </app-navbar>
      <div class="grow">
        <div class="w-full h-full flex justify-center items-center">
          <router-outlet />
        </div>
      </div>
    </div>
    `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
class UserComponent {
  readonly store = inject(Store);
  readonly routePath = this.store.selectSignal(selectUrl);
  readonly Routes: Signal<RoutesInterface> = signal(ClientRoutes);
  private readonly notificationSocket = inject(NotificationSocketService);
}

export default UserComponent;
