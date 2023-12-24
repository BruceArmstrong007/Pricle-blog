import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-create-post',
  standalone: true,
  imports: [],
  templateUrl: './create-post.component.html',
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
class CreatePostComponent {}

export default CreatePostComponent;
