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
import { ReactiveFormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
import ButtonComponent from '../../../../../../shared/components/button/button.component';
import ValidationErrorsComponent from '../../../../../../shared/components/validation-errors/validation-errors.component';
import { ControlValueAccessorDirective } from '../../../../../../shared/directives/control-value-accessor/control-value-accessor.directive';
import { InputFormatOptionsComponent } from '../input-format-options/input-format-options.component';

@Component({
  selector: 'app-paragraph',
  standalone: true,
  imports: [ReactiveFormsModule, ValidationErrorsComponent, ButtonComponent, InputFormatOptionsComponent],
  templateUrl: './paragraph.component.html',
  styles: `
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => ParagraphComponent),
    },
  ],
})
export class ParagraphComponent<T> extends ControlValueAccessorDirective<T> {
  inputID = input<string>();
  customErrorMessages = input<Record<string, string>>();
  @Output() event = new EventEmitter();
  @ViewChild('inputElt') inputField: ElementRef<HTMLTextAreaElement> | undefined;



  enterKey(event: KeyboardEvent) {
    if (event.key === 'Enter' || event.keyCode === 13 || event.which === 13) {
      event.preventDefault();
      this.control.patchValue(this.control.value + "\n \n")
    }
  }

}
