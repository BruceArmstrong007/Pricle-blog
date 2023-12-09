import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { OverlayModule } from '@angular/cdk/overlay';
import CardComponent from '../card/card.component';

@Component({
  selector: 'app-popup-menu',
  standalone: true,
  imports: [OverlayModule, CardComponent],
  template: `
    <!-- This button triggers the overlay and is it's origin -->
    <button
      (click)="isOpen.set(!isOpen())"
      type="button"
      cdkOverlayOrigin
      #trigger="cdkOverlayOrigin"
    >
      <ng-content select="popup-source"></ng-content>
    </button>

    <ng-template
      cdkConnectedOverlay
      [cdkConnectedOverlayOrigin]="trigger"
      [cdkConnectedOverlayOpen]="isOpen()"
      [cdkConnectedOverlayPanelClass]="['absolute']"
    >
      <app-card>
        <ng-container ngProjectAs="body">
          <ng-content select="popup-menu"></ng-content>
        </ng-container>
      </app-card>
    </ng-template>
  `,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
class PopupMenuComponent {
  isOpen = signal(false);
}

export default PopupMenuComponent;
