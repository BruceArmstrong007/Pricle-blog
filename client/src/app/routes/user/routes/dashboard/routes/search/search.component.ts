import { NgSwitch } from '@angular/common';
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
import TagsComponent from './components/search-sections/tags/tags.component';
import PeopleComponent from './components/search-sections/people/people.component';

export interface ClickEvent {
  id: string;
  type: string;
}

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [NgSwitch, SearchSectionsComponent, TagsComponent, PeopleComponent],
  templateUrl: './search.component.html',
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [SearchStore],
})
class SearchComponent {
  private readonly store = inject(Store);
  readonly state = inject(SearchStore);
  readonly queryParams = this.store.selectSignal(selectQueryParams);
  constructor() {
    effect(
      () => {
        const params = this.queryParams();
        this.state.search({
          search: params['search'],
          type: params['type'],
          route: params['route'],
        });
        this.state.resetData();
        this.state.setType(params['route']);
      },
      { allowSignalWrites: true }
    );
  }

  clickEvent(event: ClickEvent) {
    let contactID = event.id;
    this.state.setSelectedID(contactID);
    this.state.sendRequest({ contactID });
  }
}

export default SearchComponent;
