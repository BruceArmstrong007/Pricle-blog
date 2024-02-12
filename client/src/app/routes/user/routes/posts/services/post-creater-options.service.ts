import { Injectable, inject } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  Validators,
} from '@angular/forms';
import { BlogPostFieldOptions } from '../../../../../shared/utils/types';

@Injectable({
  providedIn: 'root',
})
export class PostCreaterOptionsService {
  private readonly fb = inject(FormBuilder);

  generateField(options: BlogPostFieldOptions) {
    const form = this.fb.group({});
    form.addControl('type', new FormControl(options, [Validators.required]));
    switch (options) {
      case 'OrderedList':
      case 'UnorderedList':
        form.addControl('items', new FormControl([], [Validators.required]));
        break;
      case 'TaskList':
        form.addControl('items', new FormControl([], [Validators.required]));
        break;
      case 'Table':
        form.addControl('items', new FormControl([], [Validators.required]));
        form.addControl('rows', new FormControl('', [Validators.required]));
        form.addControl('columns', new FormControl('', [Validators.required]));
        break;
      case 'BlockQuote':
      case 'Heading':
      case 'Paragraph':
      case 'FencedCodeBlock':
        form.addControl('content', this.getContent());
        break;
      case 'HorizontalRule':
        form.addControl('content', this.getContent(true));
        break;
      default:
        break;
    }
    return form;
  }

  getContent(value: any = '') {
    return new FormControl(value, [Validators.required]);
  }
}
