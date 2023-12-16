import { ChangeDetectionStrategy, Component } from '@angular/core';
import ImgAvatarComponent from '../../../../../../shared/components/img-avatar/img-avatar.component';
import CardComponent from '../../../../../../shared/components/card/card.component';
import ButtonComponent from '../../../../../../shared/components/button/button.component';
import LoaderComponent from '../../../../../../shared/components/loader/loader.component';

@Component({
  selector: 'app-contact-skeleton',
  standalone: true,
  imports: [ImgAvatarComponent, CardComponent, ButtonComponent, LoaderComponent],
  templateUrl: './contact-skeleton.component.html',
  styles: `
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
class ContactSkeletonComponent {}

export default ContactSkeletonComponent;
