import {
  Component,
  ChangeDetectionStrategy,
  inject,
  Signal,
  signal,
} from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import NavbarComponent from '../../shared/components/navbar/navbar.component';
import ButtonComponent from '../../shared/components/button/button.component';
import { NgIf } from '@angular/common';
import { Store } from '@ngrx/store';
import { selectUrl } from '../../shared/router-store/router-selector';
import {
  ClientRoutes,
  RoutesInterface,
} from '../../shared/utils/client.routes';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [RouterOutlet, RouterLink, NgIf, NavbarComponent, ButtonComponent],
  template: `
    <div class="h-full flex flex-col">
      <app-navbar>
        <ng-container ngProjectAs="navbar-right">
          @if (routePath() !== Routes().Auth.Login) {
          <app-button
            [routerLink]="[Routes().Auth.Login]"
            class="rounded bg-blue-600 text-white"
          >
            <ng-container ngProjectAs="btn-name"> Login </ng-container>
          </app-button>
          } @if (routePath() !== Routes().Auth.Register) {
          <app-button
            [routerLink]="[Routes().Auth.Register]"
            class="rounded bg-green-600 text-white"
          >
            <ng-container ngProjectAs="btn-name"> Register </ng-container>
          </app-button>
          }
        </ng-container>
      </app-navbar>
      <div class="grow">
        <div class="w-full h-full flex justify-center items-center">
          <router-outlet />
        </div>
      </div>
    </div>
  `,
  styles: '',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
class AuthComponent {
  readonly store = inject(Store);
  readonly routePath = this.store.selectSignal(selectUrl);
  readonly Routes: Signal<RoutesInterface> = signal(ClientRoutes);

}

export default AuthComponent;
