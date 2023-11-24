import { Component, HostBinding, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ModeService } from './shared/services/mode/mode.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
   readonly modeService = inject(ModeService);
  @HostBinding('class.dark') get mode() {
    return this.modeService.darkMode();
  }
  
}
