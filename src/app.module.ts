import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import ConfigEnv from './ConfigEnv';
import { HttpModule } from '@nestjs/axios';
import { GaleryanModule } from './galeryan/galeryan.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [ConfigEnv]
    }),

    HttpModule,

    GaleryanModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
