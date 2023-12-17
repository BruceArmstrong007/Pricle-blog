import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterOutlet } from '@angular/router';
import ButtonComponent from '../../../../shared/components/button/button.component';
import InputComponent from '../../../../shared/components/input/input.component';
import { ClientRoutes } from '../../../../shared/utils/client.routes';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [RouterOutlet, ReactiveFormsModule, InputComponent, ButtonComponent],
  templateUrl: './dashboard.component.html',
  styles: `
  .height {
    height: calc(100vh - 130px);
  }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
class DashboardComponent {
  private readonly fb = inject(FormBuilder);
  private readonly router = inject(Router);
  private readonly Routes = signal(ClientRoutes);
  readonly form = this.fb.group({
    search: ['', Validators.pattern('^[a-zA-Z]|^@[a-zA-Z]|^#[a-zA-Z].*')],
  });

  submit() {
    if (this.form.invalid) return;
    const key = this.form.value.search?.charAt(0);
    let params = '';
    switch (key) {
      case '#':
        params = JSON.stringify({ search: this.form.value, type: 'tag' });
        break;
      case '@':
        params = JSON.stringify({ search: this.form.value, type: 'username' });
        break;
      default:
        params = JSON.stringify({ search: this.form.value, type: 'name' });
    }

    this.router.navigate([
      this.Routes().User.Dashboard.Search,
      { queryParams: params },
    ]);
  }
}
export default DashboardComponent;
