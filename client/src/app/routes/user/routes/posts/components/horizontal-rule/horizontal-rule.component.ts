import { ChangeDetectionStrategy, Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-horizontal-rule',
  standalone: true,
  imports: [],
  templateUrl: './horizontal-rule.component.html',
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HorizontalRuleComponent {
  @Output() event = new EventEmitter();
}
