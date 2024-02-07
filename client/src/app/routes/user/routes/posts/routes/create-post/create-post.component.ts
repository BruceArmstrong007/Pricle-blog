import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from '@angular/core';
import {
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

@Component({
  selector: 'app-create-post',
  standalone: true,
  imports: [
    MarkdownComponent,
    TextareaComponent,
    InputComponent,
    MultiSelectComponent,
    ReactiveFormsModule,
    ButtonComponent,
    LoaderComponent,
  ],
  templateUrl: './create-post.component.html',
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [CreatePostsStore],
})
class CreatePostComponent {
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
  });
  markdown = signal(`
  # Heading level 1

  1. First item
  2. Second item

  - First item
  - Second item

  ---

  [Duck Duck Go](https://duckduckgo.com).

  ![Pricle Image!](/assets/pricle/pricle-icon.png "Pricle Icon")

  | Syntax      | Description |
| ----------- | ----------- |
| Header      | Title       |
| Paragraph   | Text        |


- [x] Write the press release
- [ ] Update the website
- [ ] Contact the media

First Term
: This is the definition of the first term.

Second Term
: This is one definition of the second term.
: This is another definition of the second term.

$\sqrt{3x-1}+(1+x)^2$

X$^a$$^a$$^a$$^a$

X$_2$$_2$$_2$$_2$$_2$


\`\`\`mermaid
  graph TD;
      A-->B;
      A-->C;
      C-->B;
      B-->D;
      C-->D;
\`\`\`

  Inline \`code\` has \`back-ticks around\` it.


  \`\`\`javascript
  var s = "JavaScript syntax highlighting";

  function alert(s) {
    window.alert(s);
  }

  alert(s);
  \`\`\`


  \`\`\`Python
  s = "Python syntax highlighting"
  print s
  \`\`\`

  \`\`\`
  No language indicated, so no syntax highlighting.
  But let's throw in a <b>tag</b>.
  \`\`\`
  `);
  markdown2 = signal(`
  \`\`\`javascript
  var s = "JavaScript syntax highlighting";

  function alert(s) {
    window.alert(s);
  }

  alert(s);
  \`\`\`
  `);
  get tags(): FormControl {
    return this.form.controls['tags'] as FormControl;
  }

  submit() {
    console.log(this.form.value, this.tags);
  }

  searchTags(key: SearchEvent) {
    if(!key.value) {this.state.clearTags('clear'); return;}
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
}

export default CreatePostComponent;
