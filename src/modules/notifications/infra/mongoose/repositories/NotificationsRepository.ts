import Notification, {
  INotificationDocument,
} from '../entities/schemas/Notification';
import ICreateNotificationDTO from '../../../DTO/ICreateNotificationDTO';

export interface IQuery {
  page?: string;
  unread?: string;
}

class NotificationsRepository {
  public async find(query: IQuery): Promise<object> {
    const { page, unread } = query;
    const totalUnread = await Notification.count({ read: false });
    const totalRecords = await Notification.countDocuments();
    if (Boolean(unread)) {
      const unreadOnly = await Notification.find()
        .where('read')
        .equals(false)
        .limit(10)
        .skip((Number(page) - 1) * 10)
        .sort('-createdAt');
      return {
        total_records: totalRecords,
        total_unread: totalUnread,
        result: unreadOnly,
      };
    }

    const notifications = await Notification.find()
      .limit(10)
      .skip((Number(page) - 1) * 10)
      .sort('-createdAt');
    return {
      total_records: totalRecords,
      total_unread: totalUnread,
      result: notifications,
    };
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
