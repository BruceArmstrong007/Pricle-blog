import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
@Component({
  selector: 'app-table',
  standalone: true,
  imports: [
    ReactiveFormsModule,
  ],
  templateUrl: './table.component.html',
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TableComponent {
  @Input() formGroup!: FormGroup;
  @Output() event = new EventEmitter();
  items = signal('');

  setItems(event: Event) {
    const value = (event.target as any).value;
    if(!value || typeof(value) !== 'string') {
      this.items.set('');
    } else {
      this.items.update((m) => m += value);
    }
    this.formGroup.patchValue({
      items: [...(value.split(','))]
    })
  }

  get tableValues(): FormControl {
    return this.formGroup.controls['items'] as FormControl
  }
}
