import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnChanges,
  WritableSignal,
  input,
  signal,
} from '@angular/core';
import { NgFor, KeyValuePipe } from '@angular/common';
import { ValidationErrors } from '@angular/forms';

@Component({
  selector: 'app-validation-errors',
  standalone: true,
  imports: [NgFor, KeyValuePipe],
  template: `
    <ul class="text-red-600 dark:text-red-400 list-disc pl-4">
      @for(error of errors(); track error) {
      <li class="break-words text-xs">{{ error }}</li>
      }
    </ul>
  `,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
class ValidationErrorsComponent implements OnChanges {
  customErrorMessages = input<Record<string, string>>();
  validationErrors = input<ValidationErrors | null>(null);
  errors: WritableSignal<any[]> = signal([]);

  ngOnInit(): void {
    this.transformValidation();
  }

  ngOnChanges() {
    this.transformValidation();
  }

  transformValidation() {
    this.errors.update(() => {
      if (this.validationErrors() === null) return [];
      return Object.entries(this.validationErrors() as ValidationErrors).map((error) => {
        let key = error[0],
          value = error[1],
          customErrorValue = this.customErrorMessages()?.[key];
        switch (key) {
          case 'minlength':
            return (
              customErrorValue ??
              `This field should have atleast ${value?.requiredLength} characters.`
            );
            break;
          case 'maxlength':
            return (
              customErrorValue ??
              `This field should not exceed ${value?.requiredLength} characters.`
            );
            break;
          case 'min':
            return (
              customErrorValue ??
              `This field should atleast have ${value?.requiredLength} digits.`
            );
            break;
          case 'max':
            return (
              customErrorValue ??
              `This field should not exceed ${value?.requiredLength} digits.`
            );
            break;
          case 'required':
            return customErrorValue ?? `This field is required.`;
            break;
          case 'pattern':
            return (
              customErrorValue ??
              `This field doesn't follow the specific format.`
            );
            break;
          case 'email':
            return customErrorValue ?? `This field should be in email format.`;
            break;
          default:
            if (key && customErrorValue) return customErrorValue;
            break;
        }
        return error;
      });
    });
  }
}

export default ValidationErrorsComponent;
