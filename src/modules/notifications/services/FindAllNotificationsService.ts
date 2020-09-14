import { injectable, inject } from 'tsyringe';

import INotificationsRepository from '../repositories/INotificationsRepository';
import { INotificationDocument } from '../infra/mongoose/entities/schemas/Notification';
import { IQuery } from '../infra/mongoose/repositories/NotificationsRepository';

@injectable()
class FindAllNotificationsService {
  constructor(
    @inject('NotificationsRepository')
    private notificationsRepository: INotificationsRepository,
  ) {}

  public async execute(query: IQuery): Promise<INotificationDocument[]> {
    const notifications = await this.notificationsRepository.find(query);

    return notifications;
  }
}

export default FindAllNotificationsService;
