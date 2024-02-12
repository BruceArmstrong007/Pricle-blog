import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import ButtonComponent from '../../../../../../shared/components/button/button.component';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [ReactiveFormsModule, ButtonComponent, NgFor],
  templateUrl: './task-list.component.html',
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaskListComponent {
  @Input() formGroup!: FormGroup;
  @Output() event = new EventEmitter();
  @ViewChild('addInput') addInput!: ElementRef<HTMLInputElement>;

  addItem() {
    const value = this.addInput.nativeElement.value;
    this.formGroup.patchValue({
      items: [...this.formGroup.value.items, {value: value, checked: false}],
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
  selectItem(target: any, index: number) {
    let value = this.formGroup.value.items;
    value[index].checked = target.checked ? true : false;
    this.formGroup.patchValue({
      items: [
        ...value
      ]
    })
  }
}
