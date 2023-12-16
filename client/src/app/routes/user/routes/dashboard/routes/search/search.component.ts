import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './search.component.html',
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
class SearchComponent {}

export default SearchComponent;
