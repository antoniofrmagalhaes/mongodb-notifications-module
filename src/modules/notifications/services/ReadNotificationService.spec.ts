import NotificationsTestRepository from '../infra/mongoose/repositories/test/NotificationsTestRepository';
import CreateNotificationService from './CreateNotificationService';
import ReadNotificationService from './ReadNotificationService';
import AppError from '../../../errors/AppError';

let notificationTestRepository: NotificationsTestRepository;
let createNotificationService: CreateNotificationService;
let readNotificationService: ReadNotificationService;

describe('Read Notification Service Test', () => {
  beforeEach(() => {
    notificationTestRepository = new NotificationsTestRepository();
    createNotificationService = new CreateNotificationService(
      notificationTestRepository,
    );
    readNotificationService = new ReadNotificationService(
      notificationTestRepository,
    );
  });

  it('should mark a notification as read', async () => {
    const notification = await createNotificationService.execute({
      content: 'content',
    });

    const readNotification = await readNotificationService.execute(
      notification._id,
    );

    expect(readNotification.read).toBe(true);
  });

  it('should not mark a non existing notification as read', async () => {
    await expect(
      readNotificationService.execute('non-existing-id'),
    ).rejects.toBeInstanceOf(AppError);
  });
});
