import { container } from 'tsyringe';

import NotificationsRepository from '../modules/notifications/infra/mongoose/repositories/NotificationsRepository';
import INotificationsRepository from '../modules/notifications/repositories/INotificationsRepository';

container.registerSingleton<INotificationsRepository>(
  'NotificationsRepository',
  NotificationsRepository,
);
