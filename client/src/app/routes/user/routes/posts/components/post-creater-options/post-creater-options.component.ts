import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Output,
} from '@angular/core';
import ButtonComponent from '../../../../../../shared/components/button/button.component';
import { BlogPostFieldOptions } from '../../../../../../shared/utils/types';


@Component({
  selector: 'app-post-creater-options',
  standalone: true,
  imports: [ButtonComponent],
  template: `
    <div
      class="flex justify-center items-center h-full w-full gap-4 py-2 overflow-x-auto"
    >
      <app-button
        (click)="optionEvent.emit('Heading')"
        data-tooltip="Heading"
        class="rounded bg-blue-600 text-white sm tooltip"
      >
        <ng-container ngProjectAs="btn-name">
          <span class="text-sm"
            ><i class="material-icons text-sm">title</i></span
          >
        </ng-container>
      </app-button>
      <app-button
        (click)="optionEvent.emit('Paragraph')"
        data-tooltip="Paragraph"
        class="rounded bg-blue-600 text-white sm tooltip"
      >
        <ng-container ngProjectAs="btn-name">
          <span class="text-sm"
            ><i class="material-icons text-sm">segment</i></span
          >
        </ng-container>
      </app-button>
      <app-button
        (click)="optionEvent.emit('HorizontalRule')"
        data-tooltip="Horizontal Rule"
        class="rounded bg-blue-600 text-white sm tooltip"
      >
        <ng-container ngProjectAs="btn-name">
          <span class="text-sm"
            ><i class="material-icons text-sm">horizontal_rule</i></span
          >
        </ng-container>
      </app-button>
      <app-button
        data-tooltip="Code Block"
        (click)="optionEvent.emit('FencedCodeBlock')"
        class="rounded bg-blue-600 text-white sm tooltip"
      >
        <ng-container ngProjectAs="btn-name">
          <span class="text-sm"
            ><i class="material-icons text-sm">code</i></span
          >
        </ng-container>
      </app-button>

      <app-button
        data-tooltip="Block Quote"
        (click)="optionEvent.emit('BlockQuote')"
        class="rounded bg-blue-600 text-white sm tooltip"
      >
        <ng-container ngProjectAs="btn-name">
          <span class="text-sm"
            ><i class="material-icons text-sm">format_quote</i></span
          >
        </ng-container>
      </app-button>


      <app-button
        data-tooltip="Table"
        (click)="optionEvent.emit('Table')"
        class="rounded bg-blue-600 text-white sm tooltip"
      >
        <ng-container ngProjectAs="btn-name">
          <span class="text-sm"
            ><i class="material-icons text-sm">table_view</i></span
          >
        </ng-container>
      </app-button>

      <app-button
        data-tooltip="Task List"
        (click)="optionEvent.emit('TaskList')"
        class="rounded bg-blue-600 text-white sm tooltip"
      >
        <ng-container ngProjectAs="btn-name">
          <span class="text-sm"
            ><i class="material-icons text-sm">playlist_add_check</i></span
          >
        </ng-container>
      </app-button>

      <app-button
        (click)="optionEvent.emit('UnorderedList')"
        data-tooltip="Unordered List"
        class="rounded bg-blue-600 text-white sm tooltip"
      >
        <ng-container ngProjectAs="btn-name">
          <span class="text-sm"
            ><i class="material-icons text-sm">format_list_bulleted</i></span
          >
        </ng-container>
      </app-button>

      <app-button
        (click)="optionEvent.emit('OrderedList')"
        data-tooltip="Ordered List"
        class="rounded bg-blue-600 text-white sm tooltip"
      >
        <ng-container ngProjectAs="btn-name">
          <span class="text-sm"
            ><i class="material-icons text-sm">format_list_numbered</i></span
          >
        </ng-container>
      </app-button>
    </div>
  `,
  styles: `

  .tooltip:hover::before {
      content: attr(data-tooltip);
      position: absolute;
      z-index: 10;
      top: 13%;
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
  @Output() optionEvent = new EventEmitter<BlogPostFieldOptions>();
}
export default PostCreaterOptionsComponent;
'Enter'
