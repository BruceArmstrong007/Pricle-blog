import { userActions } from './../../stores/user/user.action';
import {
  ChangeDetectionStrategy,
  Component,
  Signal,
  WritableSignal,
  inject,
  signal,
} from '@angular/core';
import { NotificationSocketService } from '../../shared/sockets/notification-socket.service';
import ButtonComponent from '../../shared/components/button/button.component';
import NavbarComponent from '../../shared/components/navbar/navbar.component';
import { NgFor, NgIf } from '@angular/common';
import { RouterLink, RouterOutlet } from '@angular/router';
import { Store } from '@ngrx/store';
import { selectUrl } from '../../shared/router-store/router-selector';
import {
  RoutesInterface,
  ClientRoutes,
} from '../../shared/utils/client.routes';
import ImgAvatarComponent from '../../shared/components/img-avatar/img-avatar.component';
import { userFeature } from '../../stores/user/user.reducer';
import PopupMenuComponent from '../../shared/components/popup-menu/popup-menu.component';
import DividerComponent from '../../shared/components/divider/divider.component';

interface MenuItems {
  icon: string;
  label: string;
  route: string;
}

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterLink,
    NgIf,
    NgFor,
    NavbarComponent,
    ButtonComponent,
    ImgAvatarComponent,
    PopupMenuComponent,
    DividerComponent,
  ],
  styles: ``,
  template: `
    <div class="h-full flex flex-col">
      <app-navbar [isUser]="true">
        <ng-container ngProjectAs="navbar-right">
          <app-popup-menu>
            <ng-container ngProjectAs="popup-source">
              <avatar class="pointer" [url]="userProfile()?.url" />
            </ng-container>
            <ng-container ngProjectAs="popup-menu">
              <div class="w-46 flex flex-col justify-center items-center gap-3">
                <avatar class="dxl" [url]="userProfile()?.url" />
                <section>
                  <span class="break-words text-xs">{{
                    userDetails()?.name
                  }}</span>
                </section>
                <section
                  class="w-full flex flex-col justify-center items-start cursor-pointer"
                >
                  @for(item of menuOptions(); track $index) {
                  <app-button
                    class="grow w-full hover:bg-slate-200 dark:hover:bg-slate-800 rounded-xl"
                    [routerLink]="[item.route]"
                  >
                    <ng-container ngProjectAs="btn-prefix">
                      <i class="material-icons text-sm">{{ item.icon }}</i>
                    </ng-container>
                    <ng-container ngProjectAs="btn-name">
                      <span>{{ item.label }}</span>
                    </ng-container>
                  </app-button>
                  <app-divider />
                  }
                </section>
                <app-button
                  (click)="logout()"
                  class="bg-red-500 rounded-full p-0 text-white"
                >
                  <ng-container ngProjectAs="btn-prefix">
                    <i class="material-icons text-sm">logout</i>
                  </ng-container>
                  <ng-container ngProjectAs="btn-name">
                    <span>Logout</span>
                  </ng-container>
                </app-button>
              </div>
            </ng-container>
          </app-popup-menu>
        </ng-container>
      </app-navbar>
      <div class="grow w-full h-full">
        <router-outlet />
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
  readonly userProfile = this.store.selectSignal(userFeature.userProfile);
  readonly userDetails = this.store.selectSignal(userFeature.selectDetails);
  readonly menuOptions: WritableSignal<MenuItems[]> = signal([
    {
      route: this.Routes().User.Profile.Root,
      icon: 'person',
      label: 'Profile',
    },
    {
      route: this.Routes().User.Dashboard.Root,
      icon: 'dashboard',
      label: 'Dashboard',
    },
    {
      route: this.Routes().User.Contacts.Root,
      icon: 'contacts',
      label: 'Contacts',
    },
    {
      route: this.Routes().User.Settings.Root,
      icon: 'settings',
      label: 'Settings',
    },
    {
      route: '',
      icon: 'help',
      label: 'Help and Support',
    },
  ]);
  logout() {
    this.store.dispatch(userActions.logout());
  }
}

export default UserComponent;
