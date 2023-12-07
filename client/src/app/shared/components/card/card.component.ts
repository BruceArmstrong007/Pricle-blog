import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [],
  template: `
    <div class="bg-slate-100 dark:bg-slate-700 rounded-xl p-4 flex flex-col justify-evenly items-center gap-1">
      <ng-content select="header"></ng-content>
      <ng-content select="body"></ng-content>
      <ng-content select="footer"></ng-content>
    </div>
  `,  
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
class CardComponent {}

export default CardComponent;
