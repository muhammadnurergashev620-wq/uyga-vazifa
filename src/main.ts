import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { env } from './config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = env.PORT || 3000;
  await app.listen(port);
  console.log(`Server running: http://localhost:${port}/graphql`);
}
bootstrap();
