import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-timeline',
  standalone: true,
  imports: [],
  templateUrl: './timeline.component.html',
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
class TimelineComponent {}
export default TimelineComponent;
