import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-post',
  standalone: true,
  imports: [],
  templateUrl: './create-post.component.html',
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
class CreatePostComponent {
  private readonly fb = inject(FormBuilder);
  readonly form: FormGroup = this.fb.group({
    tags: this.fb.array([this.createTagsControl()], [Validators.maxLength(5)]),
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

  get tagsArray(): FormArray {
    return this.form.controls['tags'] as FormArray;
  }

  createTagsControl(name: string = '', id: string = ''): FormGroup {
    return this.fb.group({
      name: [name, Validators.required],
      id: [id, Validators.required],
    });
  }

  addTag(): void {
    this.tagsArray.push(this.createTagsControl());
  }

  removeTag(index: number): void {
    this.tagsArray.removeAt(index);
  }
}

export default CreatePostComponent;
