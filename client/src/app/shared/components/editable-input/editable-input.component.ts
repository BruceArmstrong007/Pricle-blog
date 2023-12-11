import { NgIf, NgSwitch } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, forwardRef } from '@angular/core';
import { ReactiveFormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
import ValidationErrorsComponent from '../validation-errors/validation-errors.component';
import { ControlValueAccessorDirective } from '../../directives/control-value-accessor/control-value-accessor.directive';
import ButtonComponent from '../button/button.component';

type InputType = 'text' | 'number' | 'email' | 'password';

@Component({
  selector: 'app-editable-input',
  standalone: true,
  imports: [NgIf, NgSwitch, ReactiveFormsModule, ValidationErrorsComponent, ButtonComponent],
  templateUrl: './editable-input.component.html',
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers:[
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => EditableInputComponent),
    },
  ]
})
export class EditableInputComponent<T> extends ControlValueAccessorDirective<T>  {
  @Input() inputID!: string;
  @Input() label!: string;
  @Input({required: true}) type!: InputType;
  @Input() customErrorMessages!: Record<string, string>;
}