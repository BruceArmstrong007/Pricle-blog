import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [],
  template: `
    <button class="hover:animate-pulse flex justify-evenly items-center gap-1 p-2">
      <ng-content select="btn-prefix"></ng-content>
      <ng-content select="btn-name"></ng-content>
      <ng-content select="btn-suffix"></ng-content>
    </button>
  `,
  styles: '',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
class ButtonComponent {}

export default ButtonComponent;