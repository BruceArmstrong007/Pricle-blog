import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [],
  template: `
    <div class="flex flex-col justify-evenly items-center gap-1">
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
