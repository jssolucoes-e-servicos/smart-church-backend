import { NestFactory } from '@nestjs/core';
import { _AppModule } from 'src/modules/_app/_app.module';

async function bootstrap() {
  const app = await NestFactory.create(_AppModule);
  await app.listen(3000);
}
bootstrap();
