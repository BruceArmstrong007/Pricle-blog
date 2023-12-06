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

@Component({
  selector: 'app-alert-popup',
  standalone: true,
  imports: [NgClass, ButtonComponent],
  templateUrl: './alert-popup.component.html',
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
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
