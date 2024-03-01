import { Global, Module } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import config from '../configuration/configuration';

@Global()
@Module({
  imports: [
    MongooseModule.forRootAsync({
      inject: [config.KEY],
      useFactory: (configService: ConfigType<typeof config>) => {
        const { DatabaseUri } = configService.database;
        return {
          uri: DatabaseUri,
        };
      },
    }),
  ],
})
export class DatabaseModule {}
