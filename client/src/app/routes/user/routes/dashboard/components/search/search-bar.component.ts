import {
  ChangeDetectionStrategy,
  Component,
  effect,
  inject,
  signal,
} from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import ButtonComponent from '../../../../../../shared/components/button/button.component';
import InputComponent from '../../../../../../shared/components/input/input.component';
import { selectQueryParams } from '../../../../../../shared/router-store/router-selector';
import { ClientRoutes } from '../../../../../../shared/utils/client.routes';

@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [ReactiveFormsModule, InputComponent, ButtonComponent],
  templateUrl: './search-bar.component.html',
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
class SearchBarComponent {
  private readonly fb = inject(FormBuilder);
  private readonly router = inject(Router);
  private readonly store = inject(Store);
  private readonly Routes = signal(ClientRoutes);
  private readonly queryParms = this.store.selectSignal(selectQueryParams);
  readonly form = this.fb.group({
    search: [
      '',
      Validators.compose([
        Validators.pattern('^[a-zA-Z]|^@[a-zA-Z]|^#[a-zA-Z].*'),
        Validators.maxLength(50),
      ]),
    ],
  });

  constructor() {
    effect(() => {
      const search = this.queryParms()['search'];
      if (this.form) {
        this.form.patchValue({
          search,
        });
      }
    });
  }

  submit() {
    if (this.form.invalid) return;
    let value = this.form.value.search;
    const key = value?.charAt(0);

    let params;
    switch (key) {
      case '#':
        value = value?.slice(1);
        params = { search: value, route: 'tags', type: 'tag' };
        break;
      case '@':
        value = value?.slice(1);
        params = { search: value, route: 'people', type: 'username' };
        break;
      default:
        params = { search: value, route: 'posts', type: 'post' };
    }
    this.router.navigate([this.Routes().User.Dashboard.Search], {
      queryParams: params,
    });
  }
}
export default SearchBarComponent;
