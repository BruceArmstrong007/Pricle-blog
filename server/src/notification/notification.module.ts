import { Module } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { NotificationGateway } from './notification.gateway';
import { MongooseModule } from '@nestjs/mongoose';
import {
  NotificationSchema,
  Notification,
} from './database/schema/notification.schema';
import { NotificationRepository } from './database/repository/notification.repository';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Notification.name, schema: NotificationSchema },
    ]),
  ],
  exports: [NotificationGateway, NotificationService, NotificationRepository],
  providers: [NotificationGateway, NotificationService, NotificationRepository],
})
export class NotificationModule {}
