import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-posts',
  standalone: true,
  imports: [NgFor],
  templateUrl: './posts.component.html',
  styles: `
  :host {
    height: 100%;
  }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
class PostsComponent {
  tags = input.required<any[]>();
  isLoading = input<boolean>()
}
export default PostsComponent;
