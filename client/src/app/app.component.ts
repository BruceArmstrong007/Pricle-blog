import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  inject,
} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ModeService } from './shared/services/mode/mode.service';
import { AsyncPipe, NgComponentOutlet, NgFor } from '@angular/common';
import AlertPopupComponent from './shared/components/alert-popup/alert-popup.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    NgFor,
    AsyncPipe,
    NgComponentOutlet,
    AlertPopupComponent,
  ],
  template: `
    <div class="dark:bg-black dark:text-white w-full screen">
      <router-outlet />
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
}

export default AppComponent;
