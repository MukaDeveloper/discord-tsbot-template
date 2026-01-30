import * as dotenv from 'dotenv';
import { createClient } from '@infrastructure/discord/client';

dotenv.config();

async function bootstrap() {
  const client = await createClient();
  await client.login(process.env.CLIENT_TOKEN);
}

bootstrap();
