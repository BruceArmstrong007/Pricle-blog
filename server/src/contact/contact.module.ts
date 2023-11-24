import { Module, forwardRef } from '@nestjs/common';
import { ContactService } from './contact.service';
import { ContactController } from './contact.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Contact } from './dto/contact.request';
import { ContactSchema } from './database/schema/contact.schema';
import { UserModule } from '../user/user.module';
import { ContactRepository } from './database/repository/contact.repository';
import { NotificationModule } from 'src/notification/notification.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Contact.name, schema: ContactSchema }]),
    forwardRef(() => UserModule),
    NotificationModule,
  ],
  controllers: [ContactController],
  providers: [ContactService, ContactRepository],
  exports: [ContactService, ContactRepository],
})
export class ContactModule {}
