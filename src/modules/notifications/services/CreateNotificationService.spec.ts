import NotificationsTestRepository from '../infra/mongoose/repositories/test/NotificationsTestRepository';
import CreateNotificationService from './CreateNotificationService';
import AppError from '../../../errors/AppError';

let createNotificationService: CreateNotificationService;
let notificationTestRepository: NotificationsTestRepository;

describe('Create Notification Service Test', () => {
  beforeEach(() => {
    notificationTestRepository = new NotificationsTestRepository();
    createNotificationService = new CreateNotificationService(
      notificationTestRepository,
    );
  });

  it('should create a new notification', async () => {
    const notification = await createNotificationService.execute({
      content: 'content',
    });
    expect(notification).toHaveProperty('_id');
  });

  it('should not create a new notification with empty content', async () => {
    await expect(
      createNotificationService.execute({
        content: ' ',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
