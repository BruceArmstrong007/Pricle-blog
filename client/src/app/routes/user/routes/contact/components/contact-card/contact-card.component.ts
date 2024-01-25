import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import CardComponent from '../../../../../../shared/components/card/card.component';
import ImgAvatarComponent from '../../../../../../shared/components/img-avatar/img-avatar.component';
import { ContactDetails } from '../../../../../../stores/contacts/contacts.model';
import { User } from '../../../../../../stores/user/user.model';

@Component({
  selector: 'app-contact-card',
  standalone: true,
  imports: [
    CardComponent,
    ImgAvatarComponent,
  ],
  template: `
    <app-card class="w-full">
      <ng-container ngProjectAs="body">
        <div class="w-full flex justify-between items-center">
          <div class="flex gap-4">
            <avatar class="pointer" [url]="contact().profile.url" />
            <section class="flex flex-col gap-1">
              <div class="text-xs">{{ contact().name }}</div>
              <div class="text-xs">{{ '@' + contact().username }}</div>
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
class ContactCardComponent {
 contact = input.required< ContactDetails | User>();
}
export default ContactCardComponent;
