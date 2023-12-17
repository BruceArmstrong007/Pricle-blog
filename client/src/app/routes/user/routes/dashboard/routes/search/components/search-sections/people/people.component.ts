import { contactsFeature } from './../../../../../../../../../stores/contacts/contacts.reducer';
import { NgFor } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
  inject,
} from '@angular/core';
import { User } from '../../../../../../../../../stores/user/user.model';
import ButtonComponent from '../../../../../../../../../shared/components/button/button.component';
import ImgAvatarComponent from '../../../../../../../../../shared/components/img-avatar/img-avatar.component';
import CardComponent from '../../../../../../../../../shared/components/card/card.component';
import UserCardComponent from '../../user-card/user-card.component';
import EmptyComponent from '../../../../../../../../../shared/components/empty/empty.component';
import { ClickEvent } from '../../../search.component';
import LoaderComponent from '../../../../../../../../../shared/components/loader/loader.component';
import { Store } from '@ngrx/store';
import { CheckUserByIDPipe } from '../../../pipes/check-user-by-id.pipe';

@Component({
  selector: 'app-people',
  standalone: true,
  imports: [
    NgFor,
    CheckUserByIDPipe,
    ButtonComponent,
    ImgAvatarComponent,
    CardComponent,
    UserCardComponent,
    EmptyComponent,
    LoaderComponent,
  ],
  template: `
    <div class="flex flex-col gap-4">
      @if(isLoading && !clickedID){ @for (item of [1,2,3]; track $index) {
      <app-user-card />
      } } @else { @for (user of people; track user._id) {
      <app-user-card [user]="user">
        <ng-container ngProjectAs="buttons">
          @if(! (sentRequestList() | checkUserByID:user._id)){
          <app-button
            [disabled]="clickedID === user._id && isLoading"
            class="rounded-full bg-green-600 text-white"
            (click)="clickEvent.emit({ id: user._id, type: 'request' })"
          >
            <ng-container ngProjectAs="btn-name">
              @if(clickedID === user._id && isLoading) {
              <loader />
              } @else {
              <i class="material-icons text-xs">person_add</i>
              }
            </ng-container>
          </app-button>

          }
        </ng-container>
      </app-user-card>
      } @empty {
      <app-empty />
      } }
    </div>
  `,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
class PeopleComponent {
  @Input({ required: true }) people?: User[];
  @Input() isLoading?: boolean;
  @Input() clickedID?: string;
  @Output() clickEvent = new EventEmitter<ClickEvent>();
  private readonly store = inject(Store);
  readonly sentRequestList = this.store.selectSignal(
    contactsFeature.sentRequestList
  );
}
export default PeopleComponent;
