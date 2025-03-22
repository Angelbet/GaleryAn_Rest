import { Module } from '@nestjs/common';
import { GaleryanService } from './galeryan.service';
import { GaleryanController } from './galeryan.controller';
import { DatabaseService } from 'src/database/database.service';
import { ConfigModule } from '@nestjs/config';
import ConfigEnv from 'src/ConfigEnv';
import { HttpModule } from '@nestjs/axios';
import { ManagerAuthService } from 'src/manager-auth/ManagerAuth.service';

@Module({
  imports:[
    ConfigModule.forRoot({
      load: [ConfigEnv]
    }),

    HttpModule
  ],
  
  providers: [GaleryanService, DatabaseService, ManagerAuthService],
  controllers: [GaleryanController]
})
export class GaleryanModule {}
