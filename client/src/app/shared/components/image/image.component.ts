import { NgIf, NgClass } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  signal,
} from '@angular/core';

type BrokenImageType = 'image' | 'person';

@Component({
  selector: 'app-image',
  standalone: true,
  imports: [NgIf, NgClass],
  template: `
    <img
      class="cursor-default inheritClass"
      [ngClass]="{ hidden: state() != 'loaded' }"
      [src]="imgSrc"
      fill
      (error)="onError()"
      (load)="onLoad()"
    />
    @if (state() === 'error') {
    <div class="inheritClass flex justify-center items-center bg-slate-500 text-white">
      <i class="material-icons text-md">{{ brokenImage }}</i>
    </div>
    } @else if (state() === 'loading') {
    <div
      class="inheritClass flex justify-center items-center animate-pulse bg-slate-500 text-white"
    >
      <i class="material-icons text-md">image</i>
    </div>
    }
  `,
  styles: ` 
  .inheritClass{
    border-radius: inherit;
    width: inherit;
    height: inherit;
    cursor: inherit;
  }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
class ImageComponent {
  @Input({ required: true }) imgSrc: string | null | undefined;
  readonly state = signal('loading');
  @Input() brokenImage: BrokenImageType = 'image';

  onError() {
    this.state.update(() => 'error');
  }
  onLoad() {
    this.state.update(() => 'loaded');
  }
}

export default ImageComponent;
