import { ChangeDetectionStrategy, Component, EventEmitter, Output, forwardRef, input } from '@angular/core';
import { ReactiveFormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
import ButtonComponent from '../../../../../../shared/components/button/button.component';
import ValidationErrorsComponent from '../../../../../../shared/components/validation-errors/validation-errors.component';
import { ControlValueAccessorDirective } from '../../../../../../shared/directives/control-value-accessor/control-value-accessor.directive';

@Component({
  selector: 'app-block-quote',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    ValidationErrorsComponent,
    ButtonComponent,
  ],
  templateUrl: './block-quote.component.html',
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => BlockQuoteComponent),
    },
  ],
})
export class BlockQuoteComponent<T> extends ControlValueAccessorDirective<T> {
  inputID = input<string>();
  customErrorMessages = input<Record<string, string>>();
  @Output() event = new EventEmitter();


  enterKey(event: KeyboardEvent) {
    if (event.key === 'Enter' || event.keyCode === 13 || event.which === 13) {
      event.preventDefault();
      this.control.patchValue(this.control.value + "\n\n")
    }
  }

}
