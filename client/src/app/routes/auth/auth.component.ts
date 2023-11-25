import { Component, ChangeDetectionStrategy } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import NavbarComponent from '../../shared/components/navbar/navbar.component';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent],
  template: `
    <div class="h-full flex flex-col">
      <app-navbar />
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
class AuthComponent {}

export default AuthComponent;
