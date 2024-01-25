import { ChangeDetectionStrategy, Component, input } from '@angular/core';

type Buttontype = 'submit' | 'button';
@Component({
  selector: 'app-button',
  standalone: true,
  imports: [],
  template: `
    <button [type]="btnType()" [disabled]="disabled()" class="hover:animate-pulse flex justify-evenly items-center gap-1 p-2">
      <ng-content select="btn-prefix"></ng-content>
      <ng-content select="btn-name"></ng-content>
      <ng-content select="btn-suffix"></ng-content>
    </button>
  `,
  styles: '',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
class ButtonComponent {
 btnType = input<Buttontype>();
 disabled = input<boolean>();

}

export default ButtonComponent;