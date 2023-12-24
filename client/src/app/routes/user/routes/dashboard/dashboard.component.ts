import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import SearchBarComponent from './components/search/search-bar.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [RouterOutlet, SearchBarComponent],
  templateUrl: './dashboard.component.html',
  styles: `
  .height {
    height: calc(100vh - 130px);
  }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
class DashboardComponent {}
export default DashboardComponent;
