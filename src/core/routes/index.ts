import { Router } from 'express';

import notificationsRouter from '../../modules/notifications/infra/http/routes/notifications.routes';

const routes = Router();

routes.get('/', (request, response) => {
  return response.json({ status: 'ok' });
});

routes.use('/notifications', notificationsRouter);

export default routes;
