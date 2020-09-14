import { INotificationDocument } from '../infra/mongoose/entities/schemas/Notification';
import ICreateNotificationDTO from '../DTO/ICreateNotificationDTO';
import { IQuery } from '../infra/mongoose/repositories/NotificationsRepository';

export default interface INotificationsRepository {
  find(query: IQuery): Promise<INotificationDocument[]>;
  findById(notification_id: string): Promise<INotificationDocument>;
  create(
    notificationData: ICreateNotificationDTO,
  ): Promise<INotificationDocument>;
  markAsRead(notification_id: string): Promise<INotificationDocument>;
  delete(notification_id: string): Promise<void>;
}
