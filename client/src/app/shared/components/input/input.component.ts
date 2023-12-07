import { NgIf } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  forwardRef,
} from '@angular/core';
import { NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { ControlValueAccessorDirective } from '../../directives/control-value-accessor/control-value-accessor.directive';
import ValidationErrorsComponent from '../validation-errors/validation-errors.component';

type InputType = 'text' | 'number' | 'email' | 'password';

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
  @Input() inputID!: string;
  @Input() label!: string;
  @Input({required: true}) type!: InputType;
  @Input() customErrorMessages!: Record<string, string>;
  
}

export default InputComponent;
