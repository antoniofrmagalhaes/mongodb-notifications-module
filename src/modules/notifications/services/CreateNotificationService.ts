import 'reflect-metadata';
import { injectable, inject } from 'tsyringe';

import INotificationsRepository from '../repositories/INotificationsRepository';
import { INotificationDocument } from '../infra/mongoose/entities/schemas/Notification';
import AppError from '../../../errors/AppError';

interface IRequest {
  content: string;
  read?: boolean;
}

@injectable()
class CreateNotificationService {
  constructor(
    @inject('NotificationsRepository')
    private notificationsRepository: INotificationsRepository,
  ) {}

  public async execute({ content }: IRequest): Promise<INotificationDocument> {
    const notification = await this.notificationsRepository.create({ content });

    if (!content || content === ' ')
      throw new AppError('content must be provided');

    return notification;
  }
}

export default CreateNotificationService;
