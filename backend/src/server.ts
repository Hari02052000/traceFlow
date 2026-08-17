import { config } from './config/env';
import { connectDB } from './config/database';
import { app } from './app';

async function main(): Promise<void> {
  await connectDB();
  app.listen(config.port, () => {
    console.log(`Server running on port ${config.port}`);
  });
}

main();
