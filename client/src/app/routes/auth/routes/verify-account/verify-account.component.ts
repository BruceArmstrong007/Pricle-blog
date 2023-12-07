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
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Params, RouterLink } from '@angular/router';
import CardComponent from '../../../../shared/components/card/card.component';
import ButtonComponent from '../../../../shared/components/button/button.component';
import InputComponent from '../../../../shared/components/input/input.component';
import LoaderComponent from '../../../../shared/components/loader/loader.component';
import {
  RoutesInterface,
  ClientRoutes,
} from '../../../../shared/utils/client.routes';
import { VerifyAccountStore } from './verify-account.store';
import { selectQueryParams } from '../../../../shared/router-store/router-selector';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-verify-account',
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
  templateUrl: './verify-account.component.html',
  styles: '',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
class VerifyAccountComponent {
  private readonly fb: FormBuilder = inject(FormBuilder);
  readonly state = inject(VerifyAccountStore);
  readonly store = inject(Store);
  readonly Routes: RoutesInterface = ClientRoutes;

  readonly form: FormGroup = this.fb.group({
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
    token: ['', Validators.compose([Validators.required])],
  });

  constructor() {
    // router Store selection
    const param: Signal<Params> = this.store.selectSignal(selectQueryParams);
    if (param()['token']) {
      this.form.patchValue({...(JSON.parse(atob(param()['token'])))});
      this.state.disableEmailField();
      console.log(this.form.valid, this.form.value)
    }

    // disabled state is set from store to reactive forms
    effect(() => {
      if (this.state.disableEmail()) {
        this.form.get('email')?.disable();
        this.form.get('token')?.enable();
      } else {
        this.form.get('email')?.enable();
        this.form.get('token')?.disable();
      }
    });
  }

  sendToken() {
    const email = this.form.get('email');
    if (email?.valid) {
      this.state.sendToken({ email: email.value });
    }
  }

  submit() {
    if (this.form.invalid) return;
    this.state.verifyToken(this.form.getRawValue());
  }
}

export default VerifyAccountComponent;
