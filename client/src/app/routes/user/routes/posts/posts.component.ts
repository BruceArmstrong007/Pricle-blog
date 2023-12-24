import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-posts',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './posts.component.html',
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
class PostsComponent {}
export default PostsComponent;
