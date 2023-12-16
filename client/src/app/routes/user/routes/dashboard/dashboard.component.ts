import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import ButtonComponent from '../../../../shared/components/button/button.component';
import InputComponent from '../../../../shared/components/input/input.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [RouterOutlet, ReactiveFormsModule, InputComponent, ButtonComponent],
  templateUrl: './dashboard.component.html',
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
class DashboardComponent {
  private readonly fb = inject(FormBuilder);
  readonly form = this.fb.group({
    search: [''],
  });
}
export default DashboardComponent;
