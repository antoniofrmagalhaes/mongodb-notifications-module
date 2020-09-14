import Notification, {
  INotificationDocument,
} from '../entities/schemas/Notification';
import ICreateNotificationDTO from '../../../DTO/ICreateNotificationDTO';

export interface IQuery {
  page?: string;
  unread?: string;
}

class NotificationsRepository {
  public async find(query: IQuery): Promise<INotificationDocument[]> {
    const { page, unread } = query;
    if (!!unread) {
      const unreadOnly = await Notification.find()
        .where('read')
        .equals(false)
        .limit(7)
        .skip((Number(page) - 1) * 7)
        .sort('-createdAt');
      return unreadOnly;
    }
    const notifications = await Notification.find()
      .limit(7)
      .skip((Number(page) - 1) * 7)
      .sort('-createdAt');
    return notifications;
  }

  public async findById(
    notification_id: string,
  ): Promise<INotificationDocument> {
    const notification = await Notification.findById({ _id: notification_id });

    return notification;
  }

  public async create({
    content,
    read,
  }: ICreateNotificationDTO): Promise<INotificationDocument> {
    const notification = await Notification.create({
      content,
      read,
    });

    return notification;
  }

  public async markAsRead(
    notification_id: string,
  ): Promise<INotificationDocument> {
    const updated = await Notification.findByIdAndUpdate(
      notification_id,
      { read: true },
      { new: true },
    );

    return updated;
  }

  public async delete(notification_id: string): Promise<void> {
    await Notification.findByIdAndDelete({ _id: notification_id });
  }
}

export default NotificationsRepository;
