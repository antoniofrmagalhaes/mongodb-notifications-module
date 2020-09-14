import { uuid } from 'uuidv4';

import Notification, {
  INotificationDocument,
} from '../../entities/schemas/Notification';
import ICreateNotificationDTO from '../../../../DTO/ICreateNotificationDTO';
import { IQuery } from '../NotificationsRepository';

class NotificationsTestRepository {
  private notificationsRepository: INotificationDocument[] = [];

  public async find(query: IQuery): Promise<INotificationDocument[]> {
    return this.notificationsRepository;
  }

  public async findById(
    notification_id: string,
  ): Promise<INotificationDocument> {
    const notification = this.notificationsRepository.find(
      notification => notification._id === notification_id,
    );

    return notification;
  }

  public async create({
    content,
  }: ICreateNotificationDTO): Promise<INotificationDocument> {
    const notification = new Notification();

    this.notificationsRepository.push(
      Object.assign(
        notification,
        { _id: uuid() },
        {
          content,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ),
    );

    return notification;
  }

  public async markAsRead(
    notification_id: string,
  ): Promise<INotificationDocument> {
    const notification = this.notificationsRepository.find(
      notification => notification._id === notification_id,
    );

    const index = this.notificationsRepository.findIndex(
      notification => notification._id === notification_id,
    );

    const updated = Object.assign(notification, {
      read: true,
      updatedAt: new Date(),
    });

    this.notificationsRepository[index] = updated;

    return updated;
  }

  public async delete(notification_id: string): Promise<void> {
    const notificationIndex = this.notificationsRepository.findIndex(
      notification => notification._id === notification_id,
    );

    this.notificationsRepository.splice(notificationIndex, 1);
  }
}

export default NotificationsTestRepository;
