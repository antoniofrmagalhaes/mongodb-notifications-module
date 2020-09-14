import { injectable, inject } from 'tsyringe';

import INotificationsRepository from '../repositories/INotificationsRepository';
import { INotificationDocument } from '../infra/mongoose/entities/schemas/Notification';
import AppError from '../../../errors/AppError';

@injectable()
class ShowNotificationService {
  constructor(
    @inject('NotificationsRepository')
    private notificationsRepository: INotificationsRepository,
  ) {}

  public async execute(
    notification_id: string,
  ): Promise<INotificationDocument> {
    const notification = await this.notificationsRepository.findById(
      notification_id,
    );

    if (!notification) throw new AppError('notification not found');

    return notification;
  }
}

export default ShowNotificationService;
