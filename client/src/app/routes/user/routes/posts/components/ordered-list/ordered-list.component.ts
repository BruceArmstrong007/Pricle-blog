import { NgFor } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl } from '@angular/forms';
import ButtonComponent from '../../../../../../shared/components/button/button.component';

@Component({
  selector: 'app-ordered-list',
  standalone: true,
  imports: [ReactiveFormsModule, ButtonComponent, NgFor],
  templateUrl: './ordered-list.component.html',
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrderedListComponent {
  @Input() formGroup!: FormGroup;
  @Output() event = new EventEmitter();
  @ViewChild('addInput') addInput!: ElementRef<HTMLInputElement>;

  addItem() {
    const value = this.addInput.nativeElement.value;
    if (!value) return;
    this.formGroup.patchValue({
      items: [...this.formGroup.value.items, { value: value, checked: false }],
    });
    this.addInput.nativeElement.value = '';
  }

  get items(): FormControl {
    return this.formGroup.controls['items'] as FormControl;
  }

  deleteItem(index: number) {
    let res = this.formGroup.value.items;
    res.splice(index, 1);
    this.formGroup.patchValue({
      items: [...res],
    });
  }

  enterKey(event: KeyboardEvent) {
    if (event.key === 'Enter' || event.keyCode === 13 || event.which === 13) {
      event.preventDefault();
      this.addItem();
    }
  }
}
