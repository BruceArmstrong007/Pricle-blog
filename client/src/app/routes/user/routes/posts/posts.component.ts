import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import CardComponent from '../../../../shared/components/card/card.component';
import { Store } from '@ngrx/store';
import { selectUrl } from '../../../../shared/router-store/router-selector';

@Component({
  selector: 'app-posts',
  standalone: true,
  imports: [RouterOutlet, CardComponent],
  templateUrl: './posts.component.html',
  styles: `
    .height {
    height: calc(100dvh - 200px);
  }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
class PostsComponent {
  private readonly store = inject(Store);
  readonly routePath = this.store.selectSignal(selectUrl);
  readonly currentRoute = computed(() => {
    let currentRoute;
    let route = this.routePath().split('/').pop();
    switch (route) {
      case 'create':
        currentRoute = 'Create Post';
        break;
      case 'edit':
        currentRoute = 'Edit Post';
        break;
      default:
        currentRoute = 'Create Post';
        break;
    }
    return currentRoute;
  });
}
export default PostsComponent;
