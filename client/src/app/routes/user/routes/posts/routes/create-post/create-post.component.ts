import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
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
import { Store } from '@ngrx/store';
import { selectUrl } from '../../../../../../shared/router-store/router-selector';
import CardComponent from '../../../../../../shared/components/card/card.component';
import PostCreaterOptionsComponent from '../../components/post-creater-options/post-creater-options.component';
import { NgFor, NgIf, NgSwitch } from '@angular/common';
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
import { generateAlertID } from '../../../../../../shared/utils/variables';
import { alertActions } from '../../../../../../stores/alert/alert.action';

export interface fieldEvent {
  action: string;
}

@Component({
  selector: 'app-create-post',
  standalone: true,
  imports: [
    NgSwitch,
    NgIf,
    NgFor,
    ReactiveFormsModule,

    TextareaComponent,
    CardComponent,
    InputComponent,
    MultiSelectComponent,
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

  submit() {
    this.generateMarkdown();
    if (!this.form.valid) {
      this.formError();
      return;
    }
    let result = {
      title: this.form.value.title,
      description: this.form.value.description,
      tags: this.form.value.tags.map((tags: any) => tags._id),
      content: this.form.value.content,
    };
    this.state.createPosts(result);
  }

  previewMarkdown() {
    this.generateMarkdown();
    if (!this.form.valid) {
      this.formError();
      return;
    }

    const form = this.form.value;
    let res = {
      content: btoa(form.content),
      title: form.title,
      description: form.description,
      tags: JSON.stringify(form.tags),
    };
    localStorage.setItem("postPrevData",JSON.stringify(res))
    window.open(`/user/posts/preview`, '_blank');
  }

  generateMarkdown() {
    const builder = this.form.value.builder;
    let res = '';
    builder?.forEach((elt: any) => {
      switch (elt?.type) {
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
          res += '### ' + elt.content;
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
          elt.items.forEach((item: Record<string, string | boolean>) => {
            res +=
              '\n - [' + (item['checked'] ? 'X' : ' ') + '] ' + item['value'];
          });
          res += ' \n ';
          break;
        case 'OrderedList':
          elt.items.forEach((item: Record<string, string>, index: number) => {
            res += '\n ' + `${index + 1}. ` + item['value'];
          });
          res += ' \n ';
          break;
        case 'UnorderedList':
          elt.items.forEach((item: Record<string, string>, index: number) => {
            res += '\n - ' + item['value'];
          });
          res += ' \n ';
          break;
      }
    });
    this.form.patchValue({
      content: res,
    });
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
    this.builder.clear();
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
      this.builder.clear();
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
        res += '\n |';
      } else {
        for (let j = 0; j < transformedArr[i].length; j++) {
          res += transformedArr[i][j] + ' | ';
        }
        res += '\n | 1';
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

  formError() {
    let id = generateAlertID();
    this.store.dispatch(
      alertActions.addAlert({
        alert: {
          id,
          title: 'Field Required',
          message:
            'Make sure all existing fields are entered and make sure you add other fields in blog post.',
          type: 'ERROR',
        },
      })
    );
  }
}

export default CreatePostComponent;
