import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Notification, NotificationType } from '../schema/notification.schema';

@Injectable()
export class NotificationRepository {
  protected readonly logger = new Logger(NotificationRepository.name);

  constructor(
    @InjectModel(Notification.name)
    public readonly notificationModel: Model<Notification>,
  ) {}

  async setNotification(
    userID: string,
    type: NotificationType,
    data: object | null,
    subject?: string,
    messsage?: string,
  ) {
    let object: any = {
      userID: new Types.ObjectId(userID),
      data,
      type,
    };
    if (subject) object = { ...object, subject };
    if (messsage) object = { ...object, messsage };
    const notification = await new this.notificationModel(object);
    return await notification.save();
  }

  async getNotifications(userID: string): Promise<Notification[] | null> {
    return await this.notificationModel
      .find({ userID: new Types.ObjectId(userID) })
      .sort({ createdAt: -1 })
      .exec();
  }
}
