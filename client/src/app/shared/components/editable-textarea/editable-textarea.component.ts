import { NgIf, NgSwitch } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  forwardRef,
} from '@angular/core';
import { NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import ButtonComponent from '../button/button.component';
import ValidationErrorsComponent from '../validation-errors/validation-errors.component';
import { ControlValueAccessorDirective } from '../../directives/control-value-accessor/control-value-accessor.directive';

@Component({
  selector: 'app-editable-textarea',
  standalone: true,
  imports: [
    NgIf,
    NgSwitch,
    ReactiveFormsModule,
    ValidationErrorsComponent,
    ButtonComponent,
  ],
  templateUrl: './editable-textarea.component.html',
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => EditableTextareaComponent),
    },
  ],
})
class EditableTextareaComponent<T> extends ControlValueAccessorDirective<T> {
  @Input() inputID!: string;
  @Input() label!: string;
  @Input() customErrorMessages!: Record<string, string>;
}

export default EditableTextareaComponent;
