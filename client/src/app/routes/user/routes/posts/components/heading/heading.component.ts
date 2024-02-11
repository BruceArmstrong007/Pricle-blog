import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  Output,
  ViewChild,
  forwardRef,
  input,
} from '@angular/core';
import { NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { ControlValueAccessorDirective } from '../../../../../../shared/directives/control-value-accessor/control-value-accessor.directive';
import ButtonComponent from '../../../../../../shared/components/button/button.component';
import ValidationErrorsComponent from '../../../../../../shared/components/validation-errors/validation-errors.component';
import { InputFormatOptionsComponent } from '../input-format-options/input-format-options.component';

@Component({
  selector: 'app-heading',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    ValidationErrorsComponent,
    ButtonComponent,
    InputFormatOptionsComponent
  ],
  templateUrl: './heading.component.html',
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => HeadingComponent),
    },
  ],
})
export class HeadingComponent<T> extends ControlValueAccessorDirective<T> {
  inputID = input<string>();
  @Output() event = new EventEmitter();
  customErrorMessages = input<Record<string, string>>();
  @ViewChild('inputElt') inputField: ElementRef<HTMLTextAreaElement> | undefined;
}
