import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-view',
  standalone: true,
  imports: [],
  templateUrl: './view.component.html',
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush
})
class ViewComponent {

}
export default ViewComponent;
