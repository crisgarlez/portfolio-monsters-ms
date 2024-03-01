import { registerAs } from '@nestjs/config';

export default registerAs('config', () => {
  return {
    app: {
      port: process.env.PORT,
    },
    database: {
      DatabaseUri: process.env.DATABASE_URL,
    },
    amqp: {
      server: process.env.AMQP_URL,
      queue: process.env.MONSTERS_MS_QUEUE_NAME,
    },
  };
});
