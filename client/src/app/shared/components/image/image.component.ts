import { NgIf, NgClass } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  signal,
} from '@angular/core';

@Component({
  selector: 'app-image',
  standalone: true,
  imports: [NgIf, NgClass],
  template: `
    <img
      [ngClass]="{ hidden: state() != 'loaded' }"
      [src]="imgSrc"
      fill
      (error)="onError()"
      (load)="onLoad()"
    />
    @if (state() === 'error') {
    <div class="w-full h-full flex justify-center items-center bg-slate-500">
      <i class="material-icons text-md">broken_image</i>
    </div>
    } @else if (state() === 'loading') {
    <div
      class="w-full h-full flex justify-center items-center animate-pulse bg-slate-500"
    >
      <i class="material-icons text-md">image</i>
    </div>
    }
  `,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
class ImageComponent {
  @Input({ required: true }) imgSrc!: string;
  readonly state = signal('loading');

  onError() {
    this.state.update(() => 'error');
  }

  onLoad() {
    this.state.update(() => 'loaded');
  }
}

export default ImageComponent;
