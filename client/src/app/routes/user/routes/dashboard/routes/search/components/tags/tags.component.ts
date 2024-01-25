import { NgFor } from '@angular/common';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'app-tags',
  standalone: true,
  imports: [NgFor],
  templateUrl: './tags.component.html',
  styles: `
    :host {
    height: 100%;
  }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
class TagsComponent {
  tags = input.required<any[]>();
  isLoading = input<boolean>()
}
export default TagsComponent;
