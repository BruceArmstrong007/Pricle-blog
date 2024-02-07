import { ChangeDetectionStrategy, Component, EventEmitter, Output } from '@angular/core';
import ButtonComponent from '../../../../../../shared/components/button/button.component';

export type createPostOption = 'heading' | 'paragraph' | 'unordered_list' | 'ordered_list' | 'divider' | 'code_block' | 'table' | 'task_list' | 'image' | 'block_quote';

@Component({
  selector: 'app-post-creater-options',
  standalone: true,
  imports: [ButtonComponent],
  templateUrl: './post-creater-options.component.html',
  styles: `

  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
class PostCreaterOptionsComponent {
 @Output() optionEvent = new EventEmitter<createPostOption>();
}
export default PostCreaterOptionsComponent;
