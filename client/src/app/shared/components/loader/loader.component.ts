import { Component } from '@angular/core';

@Component({
  selector: 'loader',
  standalone: true,
  imports: [],
  template: ` <i class="animate-spin material-icons">rotate_right</i> `,
  styles: `
      i {
        font-size: var(--loader-font-size, 1rem);
        line-height: var(--loader-line-height, 1.5rem);
      }
    `,
})
export default class LoaderComponent {}
