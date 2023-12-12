import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-received-requests',
  standalone: true,
  imports: [],
  templateUrl: './received-requests.component.html',
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
class ReceivedRequestsComponent {}

export default ReceivedRequestsComponent;
