import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [],
  templateUrl: './login.component.html',
  styles: '',
  changeDetection: ChangeDetectionStrategy.OnPush
})
class LoginComponent {

}

export default LoginComponent;