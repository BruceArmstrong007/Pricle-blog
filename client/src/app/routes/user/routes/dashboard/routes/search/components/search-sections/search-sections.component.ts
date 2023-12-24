import {
  ChangeDetectionStrategy,
  Component,
  Signal,
  inject,
  signal,
} from '@angular/core';
import {
  selectUrl,
  selectQueryParams,
} from '../../../../../../../../shared/router-store/router-selector';
import {
  RoutesInterface,
  ClientRoutes,
} from '../../../../../../../../shared/utils/client.routes';
import { Store } from '@ngrx/store';
import { NgClass } from '@angular/common';
import ButtonComponent from '../../../../../../../../shared/components/button/button.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search-sections',
  standalone: true,
  imports: [NgClass, ButtonComponent],
  templateUrl: './search-sections.component.html',
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
class SearchSectionsComponent {
  private readonly store = inject(Store);
  private readonly router = inject(Router);
  readonly Routes: Signal<RoutesInterface> = signal(ClientRoutes);
  readonly routePath = this.store.selectSignal(selectUrl);
  readonly queryParams = this.store.selectSignal(selectQueryParams);

  switchRoute(route: string) {
    let params;
    switch (route) {
      case 'people':
        params = { ...this.queryParams(), route: 'people' };
        break;
      case 'tags':
        params = { ...this.queryParams(), route: 'tags' };
        break;
      case 'posts':
        params = { ...this.queryParams(), route: 'posts' };
        break;
      default:
        params = { ...this.queryParams(), route: 'posts' };
    }

    this.router.navigate([this.Routes().User.Dashboard.Search], {
      queryParams: params,
    });
  }
}

export default SearchSectionsComponent;
