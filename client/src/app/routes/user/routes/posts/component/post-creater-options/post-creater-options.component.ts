import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Output,
} from '@angular/core';
import ButtonComponent from '../../../../../../shared/components/button/button.component';

export type createPostOption =
  | 'heading'
  | 'paragraph'
  | 'unordered_list'
  | 'ordered_list'
  | 'divider'
  | 'code_block'
  | 'table'
  | 'task_list'
  | 'image'
  | 'block_quote';

@Component({
  selector: 'app-post-creater-options',
  standalone: true,
  imports: [ButtonComponent],
  templateUrl: './post-creater-options.component.html',
  styles: `

  .tooltip:hover::before {
      content: attr(data-tooltip);
      position: absolute;
      left: -50%; /* Adjust this value based on your desired tooltip position */
      background-color: #333;
      color: white;
      padding: 5px;
      border-radius: 5px;
      white-space: nowrap;
    }

  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
class PostCreaterOptionsComponent {
  @Output() optionEvent = new EventEmitter<createPostOption>();
}
export default PostCreaterOptionsComponent;
