import { NgFor } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'app-tags',
  standalone: true,
  imports: [NgFor],
  templateUrl: './tags.component.html',
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
class TagsComponent {
  @Input({ required: true }) tags?: any[];
  @Input() isLoading?: boolean;
}
export default TagsComponent;
