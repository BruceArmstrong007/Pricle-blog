import { Injectable, inject } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { BlogPostFieldOptions } from '../../../../../shared/utils/types';


@Injectable({
  providedIn: 'root',
})
export class PostCreaterOptionsService {
  private readonly fb = inject(FormBuilder);

  generateField(options: BlogPostFieldOptions) {
    const form = this.fb.group({});
    form.addControl('type', new FormControl(options));
    switch (options) {
      case 'OrderedList':
      case 'TaskList':
      case 'UnorderedList':
        form.addControl('items', this.getItems());
        break;
      case 'Table':
        form.addControl('items', this.getItems());
        form.addControl('rows', new FormControl());
        form.addControl('columns', new FormControl());
        break;
      case 'BlockQuote':
      case 'Heading':
      case 'Image':
      case 'FencedCodeBlock':
        form.addControl('content', this.getContent());
        break;
      default:
        break;
    }
    return form;
  }

  getContent(value = '') {
    return new FormControl(value);
  }

  getTaskList(value = '', selected = '') {
    return new FormGroup({
      selected: new FormControl(selected),
      value: new FormControl(value),
      extras: new FormArray([]),
    });
  }

  getItems() {
    return new FormArray([this.getContent()]);
  }
}
