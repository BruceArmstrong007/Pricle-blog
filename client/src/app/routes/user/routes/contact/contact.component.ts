import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './contact.component.html',
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
class ContactComponent {}
export default ContactComponent;
