import { NgIf } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  forwardRef,
} from '@angular/core';
import { ReactiveFormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
import InputComponent from '../input/input.component';
import ValidationErrorsComponent from '../validation-errors/validation-errors.component';
import { ControlValueAccessorDirective } from '../../directives/control-value-accessor/control-value-accessor.directive';

@Component({
  selector: 'app-textarea',
  standalone: true,
  imports: [NgIf, ReactiveFormsModule, ValidationErrorsComponent],
  templateUrl: './textarea.component.html',
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => TextareaComponent),
    },
  ],
})
class TextareaComponent<T> extends ControlValueAccessorDirective<T> {
  @Input() inputID!: string;
  @Input() label!: string;
  @Input() customErrorMessages!: Record<string, string>;
  @Input() placeHolder: string = '';
}
export default TextareaComponent;
