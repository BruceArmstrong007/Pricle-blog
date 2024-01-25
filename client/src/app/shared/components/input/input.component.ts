import { NgIf } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  input,
  forwardRef,
} from '@angular/core';
import { NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { ControlValueAccessorDirective } from '../../directives/control-value-accessor/control-value-accessor.directive';
import ValidationErrorsComponent from '../validation-errors/validation-errors.component';

type InputType = 'text' | 'number' | 'email' | 'password' | 'search';

@Component({
  selector: 'app-input',
  standalone: true,
  imports: [NgIf, ReactiveFormsModule, ValidationErrorsComponent],
  templateUrl: './input.component.html',
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => InputComponent),
    },
  ],
})
class InputComponent<T> extends ControlValueAccessorDirective<T> {
  inputID = input<string>();
  label = input<string>();
  type = input.required<InputType>();
  customErrorMessages = input<Record<string, string>>();
  placeHolder = input<string>('');
}

export default InputComponent;
