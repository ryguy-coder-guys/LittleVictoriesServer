import { dbConnection } from './database';
import httpServer from './websocket';

import job from './cron';
dbConnection
  .sync()
  .then(() => {
    console.log('little victories database successfully synced');
    const PORT = 3000;
    httpServer.listen(PORT, () => {
      console.log(`little victories server listening on port ${PORT}`);
      job.start();
    });
  })
  .catch((err) => {
    console.log('little victories database unsuccessfully synced');
    console.log(err);
  });
