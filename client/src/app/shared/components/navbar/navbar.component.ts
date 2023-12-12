import {
  ChangeDetectionStrategy,
  Component,
  Input,
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
  styles: '',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
class NavbarComponent {
  @Input() isUser = false;
  readonly Routes: Signal<RoutesInterface> = signal(ClientRoutes);
  readonly AppIcon: Signal<string> = signal(App.ICON);
  readonly mode = inject(ModeService);

}

export default NavbarComponent;
