import { NgClass } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  HostListener,
  Input,
  TemplateRef,
  ViewChild,
  inject,
  signal,
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
      (click)="isOpen.set(!isOpen())"
      type="button"
      cdkOverlayOrigin
      #trigger="cdkOverlayOrigin"
    >
      <ng-content select="popup-source"></ng-content>
    </button>
    <ng-template
    #overlay
      cdkConnectedOverlay
      [cdkConnectedOverlayOrigin]="trigger"
      [cdkConnectedOverlayOpen]="isOpen()"
      cdkConnectedOverlayPanelClass="absolute"
    >
      <app-card (click)="close()" [ngClass]="{ dark: darkMode(), 'text-white': darkMode() }">
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
  darkMode = inject(ModeService).darkMode;
  @Input('disableClose') disableClose = false;
  @ViewChild('overlay') menu!: TemplateRef<any>

  close() {
    if(this.disableClose) return;
    this.isOpen.set(false);
  }

}

export default PopupMenuComponent;
