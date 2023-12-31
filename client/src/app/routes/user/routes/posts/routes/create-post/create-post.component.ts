import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import {
  FormBuilder,
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

@Component({
  selector: 'app-create-post',
  standalone: true,
  imports: [
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
