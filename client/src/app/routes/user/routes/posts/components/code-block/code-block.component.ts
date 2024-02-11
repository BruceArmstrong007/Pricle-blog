import { ChangeDetectionStrategy, Component, ElementRef, EventEmitter, Output, ViewChild, forwardRef, input } from '@angular/core';
import { NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { ControlValueAccessorDirective } from '../../../../../../shared/directives/control-value-accessor/control-value-accessor.directive';
import ButtonComponent from '../../../../../../shared/components/button/button.component';
import ValidationErrorsComponent from '../../../../../../shared/components/validation-errors/validation-errors.component';

@Component({
  selector: 'app-code-block',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    ValidationErrorsComponent,
    ButtonComponent,
  ],
  templateUrl: './code-block.component.html',
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => CodeBlockComponent),
    },
  ],
})
export class CodeBlockComponent<T> extends ControlValueAccessorDirective<T> {
  inputID = input<string>();
  @Output() event = new EventEmitter();
  customErrorMessages = input<Record<string, string>>();
  @ViewChild('inputElt') inputField: ElementRef<HTMLTextAreaElement> | undefined;


  enterKey(event: KeyboardEvent) {
    if (event.key === 'Enter' || event.keyCode === 13 || event.which === 13) {
      event.preventDefault();
      this.control.patchValue(this.control.value + "\n \n")
    }
  }
}
