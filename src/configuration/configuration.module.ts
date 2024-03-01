import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import * as Joi from 'joi';

import configuration from './configuration';
import { enviroments } from './environments';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      envFilePath: enviroments[process.env.NODE_ENV] || '.env',
      ignoreEnvFile: false,
      isGlobal: true,
      validationSchema: Joi.object({
        PORT: Joi.string().required(),
        DATABASE_URL: Joi.string().required(),
        AMQP_URL: Joi.string().required(),
        MONSTERS_MS_QUEUE_NAME: Joi.string().required(),
      }),
    }),
  ],
  exports: [],
})
export class ConfigurationModule {}
