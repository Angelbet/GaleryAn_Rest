import { Module } from '@nestjs/common';
import { EventController } from './event.controller';
import { EventService } from './event.service';
import { ConfigModule } from '@nestjs/config';
import ConfigEnv from 'src/ConfigEnv';
import { HttpModule } from '@nestjs/axios';
import { ManagerAuthService } from 'src/manager-auth/ManagerAuth.service';
import { DatabaseService } from 'src/database/database.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [ConfigEnv]
    }),

    HttpModule
  ],

  controllers: [EventController],
  providers: [EventService, DatabaseService, ManagerAuthService]
})
export class EventModule { }
