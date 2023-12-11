import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-divider',
  standalone: true,
  imports: [],
  template: `
    <hr
      class="w-full my-2 h-0.5 border-0 bg-transparent bg-gradient-to-r from-transparent via-slate-300 dark:via-slate-800 to-transparent"
    />
  `,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
class DividerComponent {}
export default DividerComponent;
