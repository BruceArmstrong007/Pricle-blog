import { NgClass } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  inject,
} from '@angular/core';
import { OverlayModule } from '@angular/cdk/overlay';
import CardComponent from '../card/card.component';
import { ModeService } from '../../services/mode/mode.service';

@Component({
  selector: 'app-popup-menu',
  standalone: true,
  imports: [NgClass, OverlayModule, CardComponent],
  template: `
    <button
      (click)="isOpen = !isOpen"
      type="button"
      cdkOverlayOrigin
      #trigger="cdkOverlayOrigin"
      class="widthInherit"
    >
      <ng-content select="popup-source"></ng-content>
    </button>
    <ng-template
      cdkConnectedOverlay
      [cdkConnectedOverlayOrigin]="trigger"
      [cdkConnectedOverlayOpen]="isOpen"
      [cdkConnectedOverlayDisposeOnNavigation]="true"
      cdkConnectedOverlayPanelClass="absolute"
    >
      <app-card
        (click)="close()"
        [ngClass]="{ dark: darkMode(), 'text-white': darkMode() }"
      >
        <ng-container ngProjectAs="body">
          <ng-content select="popup-menu"></ng-content>
        </ng-container>
      </app-card>
    </ng-template>
  `,
  styles: `
  :host(.sourceWidthInherit) {
    .widthInherit {
      width: inherit;
    }
}
 
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
class PopupMenuComponent {
  @Input('isOpen') isOpen: boolean = false;
  darkMode = inject(ModeService).darkMode;
  @Input('disableClose') disableClose = false;

  close() {
    if (this.disableClose) return;
    this.isOpen = false;
  }
}

export default PopupMenuComponent;
