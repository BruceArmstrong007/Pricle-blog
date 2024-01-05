import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
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
  Inline \`code\` has \`back-ticks around\` it.


  \`\`\`javascript
  var s = "JavaScript syntax highlighting";

  function alert(s) {
    window.alert(s);
  }

  alert(s);
  \`\`\`

  # Heading1 

  \`\`\`Python
  s = "Python syntax highlighting"
  print s
  \`\`\`
  
  \`\`\`
  No language indicated, so no syntax highlighting.
  But let's throw in a <b>tag</b>.
  \`\`\`
  `)
  markdown2 = signal(`
  \`\`\`javascript
  var s = "JavaScript syntax highlighting";

  function alert(s) {
    window.alert(s);
  }

  alert(s);
  \`\`\`
  `)
  get tags(): FormControl {
    return this.form.controls['tags'] as FormControl;
  }

  submit() {
    console.log(this.form.value, this.tags);
  }

  searchTags(key: SearchEvent) {
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
