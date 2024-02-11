import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  signal,
} from '@angular/core';
import {
  FormArray,
  FormControl,
  FormGroup,
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  MultiSelectComponent,
  SearchEvent,
} from '../../../../../../shared/components/multi-select/multi-select.component';
import { CreatePostsStore } from './create-post.store';
import InputComponent from '../../../../../../shared/components/input/input.component';
import TextareaComponent from '../../../../../../shared/components/textarea/textarea.component';
import ButtonComponent from '../../../../../../shared/components/button/button.component';
import LoaderComponent from '../../../../../../shared/components/loader/loader.component';
import { MarkdownComponent } from 'ngx-markdown';
import { Store } from '@ngrx/store';
import { selectUrl } from '../../../../../../shared/router-store/router-selector';
import CardComponent from '../../../../../../shared/components/card/card.component';
import PostCreaterOptionsComponent from '../../components/post-creater-options/post-creater-options.component';
import { NgFor, NgSwitch } from '@angular/common';
import { PostCreaterOptionsService } from '../../services/post-creater-options.service';
import { BlockQuoteComponent } from '../../components/block-quote/block-quote.component';
import { CodeBlockComponent } from '../../components/code-block/code-block.component';
import { OrderedListComponent } from '../../components/ordered-list/ordered-list.component';
import { ParagraphComponent } from '../../components/paragraph/paragraph.component';
import { PreviewComponent } from '@ctrl/ngx-emoji-mart';
import { TableComponent } from '../../components/table/table.component';
import { TaskListComponent } from '../../components/task-list/task-list.component';
import { UnorderedListComponent } from '../../components/unordered-list/unordered-list.component';
import { BlogPostFieldOptions } from '../../../../../../shared/utils/types';
import { HeadingComponent } from '../../components/heading/heading.component';
import { HorizontalRuleComponent } from '../../components/horizontal-rule/horizontal-rule.component';

export interface fieldEvent {
  action: string;
}

@Component({
  selector: 'app-create-post',
  standalone: true,
  imports: [
    NgSwitch,
    NgFor,

    MarkdownComponent,
    TextareaComponent,
    CardComponent,
    InputComponent,
    MultiSelectComponent,
    ReactiveFormsModule,
    ButtonComponent,
    LoaderComponent,
    PostCreaterOptionsComponent,

    BlockQuoteComponent,
    CodeBlockComponent,
    OrderedListComponent,
    ParagraphComponent,
    PreviewComponent,
    TableComponent,
    TaskListComponent,
    HeadingComponent,
    HorizontalRuleComponent,
    UnorderedListComponent,
  ],
  templateUrl: './create-post.component.html',
  styles: `
.height {
    height: calc(100dvh - 280px);
  }

  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [CreatePostsStore],
})
class CreatePostComponent {
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
        'Enter';
        currentRoute = 'Create Post';
        break;
    }
    return currentRoute;
  });
  private readonly fb = inject(NonNullableFormBuilder);
  readonly state = inject(CreatePostsStore);
  readonly form: FormGroup = this.fb.group({
    tags: [
      [],
      Validators.compose([Validators.required, Validators.maxLength(5)]),
    ],
    title: [
      '',
      Validators.compose([
        Validators.required,
        Validators.minLength(1),
        Validators.maxLength(100),
      ]),
    ],
    description: [
      '',
      Validators.compose([
        Validators.required,
        Validators.minLength(1),
        Validators.maxLength(300),
      ]),
    ],
    content: [
      '',
      Validators.compose([
        Validators.required,
        Validators.minLength(1),
        Validators.maxLength(2000),
      ]),
    ],
    builder: new FormArray([]),
  });
  private readonly postCreaterOptionsService = inject(
    PostCreaterOptionsService
  );

  val = '';

  //   markdown = signal(`
  //   # Heading level 1

  //   1. First item
  //   .height {
  //   height: calc(100dvh - 200px);
  // }

  //   2. Second item

  //   - First item
  //   - Second item

  //   ---

  //   [Duck Duck Go](https://duckduckgo.com).

  //   ![Pricle Image!](/assets/pricle/pricle-icon.png "Pricle Icon")

  //   | Syntax      | Description |
  // | ----------- | ----------- |
  // | Header      | Title       |
  // | Paragraph   | Text        |

  // - [x] Write the press release
  // - [ ] Update the website
  // - [ ] Contact the media

  // First Term
  // : This is the definition of the first term.

  // Second Term
  // : This is one definition of the second term.
  // : This is another definition of the second term.

  // $\sqrt{3x-1}+(1+x)^2$

  // X$^a$$^a$$^a$$^a$

  // X$_2$$_2$$_2$$_2$$_2$

  // \`\`\`mermaid
  //   graph TD;
  //       A-->B;
  //       A-->C;
  //       C-->B;
  //       B-->D;
  //       C-->D;
  // \`\`\`

  //   Inline \`code\` has \`back-ticks around\` it.

  //   \`\`\`javascript
  //   var s = "JavaScript syntax highlighting";

  //   function alert(s) {
  //     window.alert(s);
  //   }

  //   alert(s);.builder.controls
  //   \`\`\`

  //   \`\`\`Python
  //   s = "Python syntax highlighting"
  //   print s
  //   \`\`\`

  //   \`\`\`
  //   No language indicated, so no syntax highlighting.
  //   But let's throw in a <b>tag</b>.
  //   \`\`\`
  //   `);
  //   markdown2 = signal(`
  //   \`\`\`javascript
  //   var s = "JavaScript syntax highlighting";

  //   function alert(s) {
  //     window.alert(s);
  //   }

  //   alert(s);
  //   \`\`\`
  //   `);

  get tags(): FormControl {
    return this.form.controls['tags'] as FormControl;
  }

  submit() {
    const builder = this.form.value.builder;
    let res = '';
    console.log(`builder`);

    builder.forEach((elt: any) => {
      switch (elt.type) {
        case 'BlockQuote':
          let value = '> ' + elt.content;
          value = value.replaceAll('\n\n', '\n\n > ');
          value = value.substring(0, value.length - 2);
          res += value;
          break;
        case 'Paragraph':
          res += '\n\n' + elt.content + '\n\n';
          break;
        case 'Heading':
          res += '# ' + elt.content;
          break;
        case 'HorizontalRule':
          res += '\n --- \n';
          break;
        case 'FencedCodeBlock':
          res += '\n```\n' + elt.content + '\n ``` \n';
          break;
        case 'Table':
          res += this.createTable(elt.rows, elt.columns, elt.items);
          break;
        case 'TaskList':
          break;
        case 'OrderedList':
          break;
        case 'UnorderedList':
          break;
      }
    });

    this.val = res;
  }

  searchTags(key: SearchEvent) {
    if (!key.value) {
      this.state.clearTags('clear');
      return;
    }
    switch (key.type) {
      case 'enter':
        this.state.createTag({ name: key.value });
        break;
      case 'typing':
      default:
        this.state.searchTags({ key: key.value });
        break;
    }
  }

  clear() {
    this.form.reset();
    this.state.resetState();
  }

  postOptionsEvent(event: BlogPostFieldOptions) {
    this.addField(event);
  }

  addField(option: BlogPostFieldOptions) {
    this.builder.push(this.postCreaterOptionsService.generateField(option));
  }

  fieldEvent(event: any, index: number) {
    switch (event.action) {
      case 'delete':
        this.deleteField(index);
        break;
      default:
    }
  }

  deleteField(index: number) {
    if (this.builder.length > 1) {
      this.builder.removeAt(index);
    } else {
      this.builder.reset();
    }
  }

  get builder(): FormArray<FormGroup> {
    return this.form.controls['builder'] as FormArray;
  }

  createTable(rows: number, columns: number, items: string[]): string {
    let res = '';
    let transformedArr = this.transform2dArray(rows, columns, items);

    for (let i = 0; i < transformedArr.length; i++) {
      res += '\n ';
      if (i === 0) {
        for (let j = 0; j < transformedArr[i].length; j++) {
          res += '**' + transformedArr[i][j] + '** | ';
        }
        res += '\n ';
        for (let j = 0; j < transformedArr[i].length; j++) {
          res += '---' + ' | ';
        }
        res += '\n ';
      } else {
        for (let j = 0; j < transformedArr[i].length; j++) {
          res += transformedArr[i][j] + ' | ';
        }
      }
    }
    return res;
  }

  transform2dArray(rows: number, columns: number, items: string[]) {
    let gfg: any[] = [];
    let h = 0;
    for (let i = 0; i < rows; i++) {
      gfg[i] = [];
      for (let j = 0; j < columns; j++) {
        gfg[i][j] = items[h++];
      }
    }
    return gfg;
  }
}

export default CreatePostComponent;
