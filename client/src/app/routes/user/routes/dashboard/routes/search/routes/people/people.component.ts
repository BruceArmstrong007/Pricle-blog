import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-people',
  standalone: true,
  imports: [],
  templateUrl: './people.component.html',
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
class PeopleComponent {}

export default PeopleComponent;
