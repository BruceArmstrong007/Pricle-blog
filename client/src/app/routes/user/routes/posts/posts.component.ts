import {
  ChangeDetectionStrategy,
  Component,
} from '@angular/core';
import { RouterOutlet } from '@angular/router';
@Component({
  selector: 'app-posts',
  standalone: true,
  imports: [RouterOutlet],
  template: `<router-outlet/>`,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
class PostsComponent {

}
export default PostsComponent;
