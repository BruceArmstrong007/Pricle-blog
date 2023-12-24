import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  Signal,
  inject,
  signal,
} from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { ModeService } from './shared/services/mode/mode.service';
import { AsyncPipe, NgComponentOutlet, NgFor } from '@angular/common';
import AlertPopupComponent from './shared/components/alert-popup/alert-popup.component';
import ButtonComponent from './shared/components/button/button.component';
import { ClientRoutes, RoutesInterface } from './shared/utils/client.routes';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterLink,
    NgFor,
    AsyncPipe,
    NgComponentOutlet,
    AlertPopupComponent,
    ButtonComponent,
  ],
  template: `
    <div class="dark:bg-black dark:text-white w-full screen">
      <router-outlet />
      <app-button
        [routerLink]="[Routes().User.Posts.Create]"
        class="absolute bottom-12 right-12 rounded-full bg-green-500"
      >
        <ng-container ngProjectAs="btn-prefix">
          <i class="material-icons">add</i>
        </ng-container>
        <ng-container ngProjectAs="btn-name">
          <span class="">Posts</span>
        </ng-container>
      </app-button>
    </div>
    <app-alert-popup />
  `,
  styles: `
  .screen {
    height: 100dvh;
  }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
class AppComponent {
  readonly modeService = inject(ModeService);
  @HostBinding('class.dark') get mode() {
    return this.modeService.darkMode();
  }
  readonly Routes: Signal<RoutesInterface> = signal(ClientRoutes);
}

export default AppComponent;
