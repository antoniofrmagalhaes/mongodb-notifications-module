import { injectable, inject } from 'tsyringe';
import AppError from '../../../errors/AppError';

import INotificationsRepository from '../repositories/INotificationsRepository';

@injectable()
class DeleteNotificationService {
  constructor(
    @inject('NotificationsRepository')
    private notificationsRepository: INotificationsRepository,
  ) {}

  public async execute(notification_id: string): Promise<void> {
    const notification = await this.notificationsRepository.findById(
      notification_id,
    );

    if (!notification) throw new AppError('notification not found');

    await this.notificationsRepository.delete(notification_id);
  }
}

export default DeleteNotificationService;
