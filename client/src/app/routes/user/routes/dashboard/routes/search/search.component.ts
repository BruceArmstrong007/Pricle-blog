import {
  ChangeDetectionStrategy,
  Component,
  effect,
  inject,
} from '@angular/core';
import { Store } from '@ngrx/store';
import { selectQueryParams } from '../../../../../../shared/router-store/router-selector';
import { SearchStore } from './search.store';
import SearchSectionsComponent from './components/search-sections/search-sections.component';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [SearchSectionsComponent],
  templateUrl: './search.component.html',
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [SearchStore],
})
class SearchComponent {
  private readonly store = inject(Store);
  private readonly state = inject(SearchStore);
  readonly queryParams = this.store.selectSignal(selectQueryParams);
  constructor() {
    effect(
      () => {
        const params = this.queryParams();
        this.state.search({
          search: params['search'],
          type: params['type'],
        });
      },
      { allowSignalWrites: true }
    );
  }
}

export default SearchComponent;
