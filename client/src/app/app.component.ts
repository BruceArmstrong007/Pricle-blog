import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  Signal,
  computed,
  inject,
  signal,
} from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { ModeService } from './shared/services/mode/mode.service';
import { AsyncPipe, NgClass, NgComponentOutlet, NgFor } from '@angular/common';
import AlertPopupComponent from './shared/components/alert-popup/alert-popup.component';
import ButtonComponent from './shared/components/button/button.component';
import { ClientRoutes, RoutesInterface } from './shared/utils/client.routes';
import { Store } from '@ngrx/store';
import { selectUrl } from './shared/router-store/router-selector';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterLink,
    NgFor,
    NgClass,
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
        [ngClass]="{ visible: isDashboard(), 'invisible': !isDashboard() }"
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
  private readonly store = inject(Store);
  private readonly routePath = this.store.selectSignal(selectUrl);
  readonly Routes: Signal<RoutesInterface> = signal(ClientRoutes);
  readonly isDashboard = computed(() => {
    if (!this.routePath()) return false;
    let url =
      this.routePath()
        .split('/')
        .find((elt) => elt === 'dashboard') === 'dashboard'
        ? true
        : false;
    return url;
  });
}

export default AppComponent;
