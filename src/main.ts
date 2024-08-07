import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

import * as heapdump from 'heapdump';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();

  process.on('SIGUSR2', () => {
    const filename = `/tmp/${Date.now()}.heapsnapshot`;
    heapdump.writeSnapshot(filename, (err, filename) => {
      if (err) {
        console.error('Error writing snapshot:', err);
      } else {
        console.log('Heap snapshot written to', filename);
      }
    });
  });

  await app.listen(3333);
}
bootstrap();
