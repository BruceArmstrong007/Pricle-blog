import { NgIf } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Signal,
  effect,
  inject,
} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Params, RouterLink } from '@angular/router';
import CardComponent from '../../../../shared/components/card/card.component';
import ButtonComponent from '../../../../shared/components/button/button.component';
import InputComponent from '../../../../shared/components/input/input.component';
import LoaderComponent from '../../../../shared/components/loader/loader.component';
import { Store } from '@ngrx/store';
import { selectQueryParams } from '../../../../shared/router-store/router-selector';
import {
  RoutesInterface,
  ClientRoutes,
} from '../../../../shared/utils/client.routes';
import { ResetPasswordStore } from './reset-password.store';
import { CustomValidationService } from '../../../../shared/services/validator/custom-validation.service';

@Component({
  selector: 'app-reset-password',
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
  templateUrl: './reset-password.component.html',
  styles: '',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [ResetPasswordStore]
})
class ResetPasswordComponent {
  private readonly fb: FormBuilder = inject(FormBuilder);
  readonly state = inject(ResetPasswordStore);
  readonly store = inject(Store);
  readonly Routes: RoutesInterface = ClientRoutes;
  readonly passwordValidation = {
    pattern: `Password should be alphanumberic and should have atleast one
    number.`,
    mismatch: `Both Passwords should be same.`,
  };
  private readonly passwordValidator = inject(CustomValidationService);
  readonly form: FormGroup = this.fb.group(
    {
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
      token: ['', Validators.compose([Validators.required])],
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

  constructor() {
    // router Store selection
    const param: Signal<Params> = this.store.selectSignal(selectQueryParams);
    if (param()['token']) {
      this.form.patchValue({ ...JSON.parse(atob(param()['token'])) });
      this.state.disableEmailField();
      this.state.setToken();
    }

    // disabled state is set from store to reactive forms
    effect(() => {
      if (this.state.disableEmail()) {
        this.form.get('email')?.disable();
      } else {
        this.form.get('email')?.enable();
      }
    });
  }

  sendEmail() {
    const email = this.form.get('email');
    if (email?.valid) {
      this.state.sendEmail({ email: email.value });
    }
  }

  submit() {
    if (this.form.invalid) return;
    this.state.resetPassword(this.form.getRawValue());
  }

  preventDefault(event: Event) {
    event.preventDefault();
  }

  clear() {
    this.form.get('password')?.reset();
    this.form.get('confirmPassword')?.reset();
  }
}

export default ResetPasswordComponent;
