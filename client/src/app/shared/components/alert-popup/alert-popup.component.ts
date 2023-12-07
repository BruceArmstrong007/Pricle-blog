import {
  ChangeDetectionStrategy,
  Component,
  Signal,
  inject,
} from '@angular/core';
import { Alerts } from '../../../stores/alert/alert.model';
import { Store } from '@ngrx/store';
import { alertFeature } from '../../../stores/alert/alert.reducer';
import ButtonComponent from '../button/button.component';
import { alertActions } from '../../../stores/alert/alert.action';
import { NgClass } from '@angular/common';
import { animate, state, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-alert-popup',
  standalone: true,
  imports: [NgClass, ButtonComponent],
  templateUrl: './alert-popup.component.html',
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('fadeInOut', [
      state('in', style({ opacity: 1 })),
      transition(':enter', [
        style({ opacity: 0, transform: 'translateX(100%)' }),
        animate('0.5s ease', style({ opacity: 1, transform: 'translateX(0)' }))
      ]),
      transition(':leave', [
        animate('0.5s ease', style({ opacity: 0, transform: 'translateX(100%)' }))
      ])
    ])
  ],
})
class AlertPopupComponent {
  private readonly store = inject(Store);
  readonly alerts: Signal<Alerts[]> = this.store.selectSignal(
    alertFeature.selectAll
  );

  removePopup(alertID: string) {
    this.store.dispatch(alertActions.removeAlert({ alertID }));
  }
}
export default AlertPopupComponent;
