import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [],
  templateUrl: './navbar.component.html',
  styles: '',
  changeDetection: ChangeDetectionStrategy.OnPush
})
class NavbarComponent {

}

export default NavbarComponent;
