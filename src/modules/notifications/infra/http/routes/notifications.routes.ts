import { Router } from 'express';

import NotificationsController from '../controllers/NotificationsControllers';

const notificationsRouter = Router();

notificationsRouter.get('/', NotificationsController.index);
notificationsRouter.get('/:id', NotificationsController.show);
notificationsRouter.post('/', NotificationsController.create);
notificationsRouter.post('/:id', NotificationsController.update);
notificationsRouter.delete('/:id', NotificationsController.delete);

export default notificationsRouter;
