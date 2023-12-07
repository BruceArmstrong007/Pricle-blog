import { NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { RouterLink } from '@angular/router';
import CardComponent from '../../../../shared/components/card/card.component';
import ButtonComponent from '../../../../shared/components/button/button.component';
import InputComponent from '../../../../shared/components/input/input.component';
import LoaderComponent from '../../../../shared/components/loader/loader.component';
import {
  ClientRoutes,
  RoutesInterface,
} from '../../../../shared/utils/client.routes';
import { RegisterStore } from './register.store';
import { CustomValidationService } from '../../../../shared/services/validator/custom-validation.service';

@Component({
  selector: 'app-register',
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
  templateUrl: './register.component.html',
  styles: '',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [RegisterStore]
})
class RegisterComponent {
  private readonly fb: FormBuilder = inject(FormBuilder);
  readonly state = inject(RegisterStore);
  readonly Routes: RoutesInterface = ClientRoutes;
  readonly passwordValidation = {
    pattern: `Password should be alphanumberic and should have atleast one
    number.`,
    mismatch: `Both Passwords should be same.`,
  };
  private readonly passwordValidator = inject(CustomValidationService);
  readonly form: FormGroup = this.fb.group(
    {
      username: [
        '',
        Validators.compose([Validators.required, Validators.maxLength(25)]),
      ],
      email: [
        '',
        Validators.compose([
          Validators.required,
          Validators.maxLength(320),
          Validators.pattern(
            /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/
          ),
        ]),
      ],
      password: [
        '',
        Validators.compose([
          Validators.required,
          Validators.minLength(8),
          Validators.pattern(/^[A-Za-z][A-Za-z\d]*\d[A-Za-z\d]*$/),
        ]),
      ],
      confirmPassword: [
        '',
        Validators.compose([
          Validators.required,
          Validators.minLength(8),
          Validators.pattern(/^[A-Za-z][A-Za-z\d]*\d[A-Za-z\d]*$/),
        ]),
      ],
    },
    {
      validators: (control: FormControl) =>
        this.passwordValidator.MatchValidator(
          control,
          'password',
          'confirmPassword'
        ),
    }
  );

  submit() {
    if (this.form.invalid) return;
    this.state.register(this.form.value);
  }

  clear() {
    this.form.reset();
  }

  preventDefault(event: Event) {
    event.preventDefault();
  }
}

export default RegisterComponent;
