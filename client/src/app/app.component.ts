import { Component, HostBinding, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ModeService } from './shared/services/mode/mode.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  template: `<div class="dark:bg-black dark:text-white w-full h-screen">
    <router-outlet />
  </div> `,
  styles: ``,
})
export class AppComponent {
  readonly modeService = inject(ModeService);
  @HostBinding('class.dark') get mode() {
    return this.modeService.darkMode();
  }
}
