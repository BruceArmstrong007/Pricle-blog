import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
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
  @Input({ required: true }) tags?: any[];
  @Input() isLoading?: boolean;
}
export default PostsComponent;
