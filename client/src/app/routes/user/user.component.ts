import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { NotificationSocketService } from '../../shared/sockets/notification-socket.service';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [],
  templateUrl: './user.component.html',
  styles: '',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
class UserComponent {
  private readonly notificationSocket = inject(NotificationSocketService);
}

export default UserComponent;
