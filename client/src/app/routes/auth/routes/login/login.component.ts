import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import {
  ClientRoutes,
  RoutesInterface,
} from '../../../../shared/utils/client.routes';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { NgIf } from '@angular/common';
import CardComponent from '../../../../shared/components/card/card.component';
import ButtonComponent from '../../../../shared/components/button/button.component';
import { RouterLink } from '@angular/router';
import InputComponent from '../../../../shared/components/input/input.component';
import { LoginStore } from './login.store';
import LoaderComponent from '../../../../shared/components/loader/loader.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgIf,
    RouterLink,
    CardComponent,
    ButtonComponent,
    InputComponent,
    LoaderComponent,
  ],
  templateUrl: './login.component.html',
  styles: '',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
class LoginComponent {
  private readonly fb: FormBuilder = inject(FormBuilder);
  readonly state = inject(LoginStore);
  readonly Routes: RoutesInterface = ClientRoutes;
  readonly passwordValidation = {
    pattern: `Password should be alphanumberic and should have atleast one
    number.`,
  };
  readonly form: FormGroup = this.fb.group({
    username: [
      '',
      Validators.compose([Validators.required, Validators.maxLength(25)]),
    ],
    password: [
      '',
      Validators.compose([
        Validators.required,
        Validators.minLength(8),
        Validators.pattern(/^[A-Za-z][A-Za-z\d]*\d[A-Za-z\d]*$/),
      ]),
    ],
  });

  submit() {
    if (this.form.invalid) return;
    // console.log(this.form.value);
    this.state.login(this.form.value);
  }

  clear() {
    this.form.reset();
  }

  preventDefault(event: Event) {
    event.preventDefault();
  }
}

export default LoginComponent;
