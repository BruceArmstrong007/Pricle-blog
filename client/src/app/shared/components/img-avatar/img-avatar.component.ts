import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import ImageComponent from '../image/image.component';

@Component({
  selector: 'avatar',
  standalone: true,
  imports: [ImageComponent],
  template: `
    <div class="relative">
      <app-image
        class="cursor rounded-full size"
        [imgSrc]="url"
        [brokenImage]="'person'"
      />
      <span class="signal rounded-xl w-3 h-3 absolute bottom-0 right-0"></span>
    </div>
  `,
  styles: `
  .signal {
    display: none;
  }

  .cursor {
    cursor: default;
  }

  :host-context(.pointer) {
    .cursor {
      cursor: pointer;
    }
  }

  :host-context(.online) {
    .signal {
      background-color: blue;
      display: block;
    }
  }
  
  :host-context(.offline) {
    .signal {
      background-color: red;
      display: block;
    }
  }
  
  .size {
    width: 2.5rem;
    height: 2.5rem;
  }
  
  :host-context(.sm) {
    .size {
      width: 2rem;
      height: 2rem;
    }
  }
  
  :host-context(.xs) {
    .size {
      width: 1.5rem;
      height: 1.5rem;
    }
  }
  
  :host-context(.lg) {
    .size {
      width: 3rem;
      height: 3rem;
    }
  }
  
  :host-context(.xl) {
    .size {
      width: 4rem;
      height: 4rem;
    }
  }
  
  :host-context(.dxl) {
    .size {
      width: 5rem;
      height: 5rem;
    }
  }

  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
class ImgAvatarComponent {
  @Input({ required: true }) url: string | null | undefined;
}

export default ImgAvatarComponent;
