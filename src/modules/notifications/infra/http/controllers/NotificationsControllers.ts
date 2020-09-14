import 'reflect-metadata';
import { container } from 'tsyringe';
import { Request, Response } from 'express';

import FindAllNotificationsService from '../../../services/FindAllNotificationsService';
import ShowNotificationService from '../../../services/ShowNotificationService';
import CreateNotificationService from '../../../services/CreateNotificationService';
import ReadNotificationService from '../../../services/ReadNotificationService';
import DeleteNotificationService from '../../../services/DeleteNotificationService';

class NotificationsController {
  public async index(request: Request, response: Response): Promise<Response> {
    const findAllNotifications = container.resolve(FindAllNotificationsService);

    const notifications = await findAllNotifications.execute(request.query);

    return response.json(notifications);
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const { id: notification_id } = request.params;

    const showNotification = container.resolve(ShowNotificationService);

    const notification = await showNotification.execute(notification_id);

    return response.json(notification);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const createNotification = container.resolve(CreateNotificationService);

    const notification = await createNotification.execute(request.body);

    return response.json(notification);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { id: notification_id } = request.params;

    const readNotification = container.resolve(ReadNotificationService);

    const notification = await readNotification.execute(notification_id);

    return response.json(notification);
  }

  public async delete(request: Request, response: Response): Promise<object> {
    const { id: notification_id } = request.params;

    const deleteNotification = container.resolve(DeleteNotificationService);

    await deleteNotification.execute(notification_id);

    return response.json({
      status: 'success',
      message: `notification ${notification_id} deleted successfully`,
    });
  }
}

export default new NotificationsController();
