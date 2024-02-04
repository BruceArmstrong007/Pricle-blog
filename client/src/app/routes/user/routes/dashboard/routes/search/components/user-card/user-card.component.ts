import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import CardComponent from '../../../../../../../../shared/components/card/card.component';
import ImgAvatarComponent from '../../../../../../../../shared/components/img-avatar/img-avatar.component';
import { User } from '../../../../../../../../stores/user/user.model';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-user-card',
  standalone: true,
  imports: [NgIf, CardComponent, ImgAvatarComponent],
  template: `
    <app-card class="w-full">
      <ng-container ngProjectAs="body">
        <div class="w-full flex justify-between items-center">
          <div class="flex gap-4">
            <avatar class="pointer" [url]="user()?.profile?.url ?? ''" />
            <section class="flex flex-col gap-1">
              @if(user()?.name) {
              <div class="text-xs">{{ user()?.name }}</div>
              } @else {
              <div class="text-xs w-52 h-4 animate:pulse rounded bg-slate-400"></div>
              }
              @if(user()?.name) {
                <div class="text-xs">{{ '@' + user()?.username }}</div>
              } @else {
                <div class="text-xs w-36 h-4 animate:pulse rounded bg-slate-400"></div>
              }
            </section>
          </div>
          <div class="flex gap-4">
            <ng-content select="buttons" />
          </div>
        </div>
      </ng-container>
    </app-card>
  `,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
class UserCardComponent {
 user = input<User>();
}
export default UserCardComponent;
