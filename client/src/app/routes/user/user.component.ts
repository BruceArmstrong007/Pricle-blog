import { userActions } from './../../stores/user/user.action';
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
import ImgAvatarComponent from '../../shared/components/img-avatar/img-avatar.component';
import { userFeature } from '../../stores/user/user.reducer';
import PopupMenuComponent from '../../shared/components/popup-menu/popup-menu.component';
import DividerComponent from '../../shared/components/divider/divider.component';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterLink,
    NgIf,
    NavbarComponent,
    ButtonComponent,
    ImgAvatarComponent,
    PopupMenuComponent,
    DividerComponent
  ],
  styles: ``,
  template: `
    <div class="h-full flex flex-col">
      <app-navbar>
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
                  <app-button
                    class="grow w-full hover:bg-slate-200 dark:hover:bg-slate-800 rounded-xl"
                    [routerLink]="[Routes().User.Profile.Root]"
                  >
                    <ng-container ngProjectAs="btn-prefix">
                      <i class="material-icons text-sm">person</i>
                    </ng-container>
                    <ng-container ngProjectAs="btn-name">
                      <span>Profile</span>
                    </ng-container>
                  </app-button>
                  <app-divider />
                  <app-button
                    class="grow w-full hover:bg-slate-200 dark:hover:bg-slate-800 rounded-xl"
                  >
                    <ng-container ngProjectAs="btn-prefix">
                      <i class="material-icons text-sm">settings</i>
                    </ng-container>
                    <ng-container ngProjectAs="btn-name">
                      <span>Settings</span>
                    </ng-container>
                  </app-button>
                  <app-divider />
                  <app-button
                    class="grow w-full hover:bg-slate-200 dark:hover:bg-slate-800 rounded-xl"
                  >
                    <ng-container ngProjectAs="btn-prefix">
                      <i class="material-icons text-sm">help</i>
                    </ng-container>
                    <ng-container ngProjectAs="btn-name">
                      <span>Help and Support</span>
                    </ng-container>
                  </app-button>
                  <app-divider />
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
  readonly userProfile = this.store.selectSignal(userFeature.userProfile);
  readonly userDetails = this.store.selectSignal(userFeature.selectDetails);

  logout() {
    this.store.dispatch(userActions.logout());
  }
}

export default UserComponent;
