import { Component, inject } from '@angular/core';
import { NotificationSocketService } from '../../shared/sockets/notification-socket.service';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css',
})
export class UserComponent {
  private readonly notificationSocket = inject(NotificationSocketService);
}
