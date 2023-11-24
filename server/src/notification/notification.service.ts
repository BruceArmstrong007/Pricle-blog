import { Injectable } from '@nestjs/common';
import { NotificationRepository } from './database/repository/notification.repository';
import { ContactNotification } from '@app/common';
import { NotificationType } from './database/schema/notification.schema';

@Injectable()
export class NotificationService {
  constructor(
    private readonly notificationRepository: NotificationRepository,
  ) {}

  async getNotifications(userID: string) {
    return await this.notificationRepository.getNotifications(userID);
  }

  async setNotification(
    userID: string,
    type: NotificationType,
    data: object | null,
    subject?: string,
    message?: string,
  ) {
    return await this.notificationRepository.setNotification(
      userID,
      type,
      data,
      subject,
      message,
    );
  }
}
