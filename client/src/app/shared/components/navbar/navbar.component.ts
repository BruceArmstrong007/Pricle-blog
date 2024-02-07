import {
  ChangeDetectionStrategy,
  Component,
  input,
  Signal,
  inject,
  signal,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { ClientRoutes, RoutesInterface } from '../../utils/client.routes';
import { App } from '../../utils/app.const';
import { NgClass, NgOptimizedImage } from '@angular/common';
import ButtonComponent from '../button/button.component';
import { ModeService } from '../../services/mode/mode.service';
import ImageComponent from '../image/image.component';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [NgClass, RouterLink, NgOptimizedImage, ButtonComponent, ImageComponent],
  templateUrl: './navbar.component.html',
  styles: `
    .size {
    width: 3rem;
    height: 3rem;
  }

  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
class NavbarComponent {
  isUser = input<boolean>(false);
  readonly Routes: Signal<RoutesInterface> = signal(ClientRoutes);
  readonly AppIcon: Signal<string> = signal(App.ICON);
  readonly mode = inject(ModeService);


}

export default NavbarComponent;
