import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-empty',
  standalone: true,
  imports: [],
  template: ` <div class="w-full h-full flex justify-center items-center">
    <div class="flex justify-center items-center gap-1">
      <i class="material-icons text-lg">inventory_2</i>
      <span class="text-lg">Empty</span>
    </div>
  </div>`,
  styles: `
  :host {
    width: 100%;
    height: 100%;
  }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
class EmptyComponent {}
export default EmptyComponent;
