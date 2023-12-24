import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { ContactModule } from './contact/contact.module';
import { UploadModule } from './upload/upload.module';
import { MongoDBModule } from '@app/common';
import { NotificationModule } from './notification/notification.module';
import { TagsModule } from './tags/tags.module';
import { PostsModule } from './posts/posts.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
      validationSchema: Joi.object({
        CLIENT_URI1: Joi.string().required(),
        CLIENT_URI2: Joi.string().required(),
        JWT_EXPIRATION: Joi.string().required(),
        MAIL_SERVICE: Joi.string().required(),
        MAIL_HOST: Joi.string().required(),
        MAIL_PORT: Joi.string().required(),
        MAIL_EMAIL: Joi.string().required(),
        MAIL_PASSWORD: Joi.string().required(),
        MAIL_FROM: Joi.string().required(),
        VERFIY_TOKEN_TIME: Joi.string().required(),
        HASH_SALT: Joi.string().required(),
        COOKIE_EXPIRATION: Joi.string().required(),
        MONGODB_URI: Joi.string().required(),
        MONGODB_PASS: Joi.string().required(),
        MONGODB_NAME: Joi.string().required(),
        FIREBASE_API_KEY: Joi.string().required(),
        FIREBASE_PROJECT_ID: Joi.string().required(),
        FIREBASE_STORAGE_BUCKET: Joi.string().required(),
      }),
    }),
    AuthModule,
    UserModule,
    ContactModule,
    UploadModule,
    MongoDBModule,
    NotificationModule,
    TagsModule,
    PostsModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
