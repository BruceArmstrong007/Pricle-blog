import {
  ConnectedSocket,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { NotificationService } from './notification.service';
import { Server } from 'socket.io';
import { ContactNotification, SocketWithAuth } from '@app/common';

@WebSocketGateway({ namespace: 'notification' })
export class NotificationGateway
  implements OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer()
  private server: Server;

  // This could be redis keyvalue store for connected clients with redis pubsub for connecting multiple instance of this sever
  private connectedClients: Array<{ socketID: string; userID: string }> = [];

  constructor(private readonly notificationService: NotificationService) {}

  handleConnection(client: SocketWithAuth) {
    this.connectedClients.push({ socketID: client.id, userID: client.userID });
  }

  handleDisconnect(client: SocketWithAuth) {
    this.connectedClients = this.connectedClients.filter(
      (item) => item.socketID !== client.id,
    );
  }

  // Send all the user notificaitons in response
  @SubscribeMessage('get-notifications')
  async getMessages(@ConnectedSocket() client: SocketWithAuth): Promise<any> {
    const notifications = await this.notificationService.getNotifications(
      client.userID,
    );
    return notifications;
  }

  // Send contact notifications to connected client (if online) and store it in MongoDB
  async setContactNotification(data: ContactNotification) {
    const notification = await this.notificationService.setNotification(
      data.contactID,
      'CONTACT',
      data,
    );
    const user = this.connectedClients.find(
      (client) => data.contactID === client.userID,
    );
    if (user) this.server.to(user.socketID).emit('notification', notification);
  }

  // Send user notifications to connected client (if online) and store it in MongoDB
  async setUserNotification(userID: string, subject: string, message: string) {
    const notification = await this.notificationService.setNotification(
      userID,
      'USER',
      null,
      subject,
      message,
    );
    const user = this.connectedClients.find(
      (client) => userID === client.userID,
    );
    if (user) this.server.to(user.socketID).emit('notification', notification);
  }
}
