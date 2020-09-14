import NotificationsTestRepository from '../infra/mongoose/repositories/test/NotificationsTestRepository';
import CreateNotificationService from './CreateNotificationService';
import ShowNotificationService from './ShowNotificationService';
import AppError from '../../../errors/AppError';

let notificationTestRepository: NotificationsTestRepository;
let createNotificationService: CreateNotificationService;
let showNotificationService: ShowNotificationService;

describe('Show Notification Service Test', () => {
  beforeEach(() => {
    notificationTestRepository = new NotificationsTestRepository();
    createNotificationService = new CreateNotificationService(
      notificationTestRepository,
    );
    showNotificationService = new ShowNotificationService(
      notificationTestRepository,
    );
  });

  it('should show a single notification', async () => {
    const notification = await createNotificationService.execute({
      content: 'content',
    });
    const notificationFound = await showNotificationService.execute(
      notification._id,
    );
    expect(notificationFound).toStrictEqual(notification);
  });

  it('should not show a non existing notification', async () => {
    await expect(
      showNotificationService.execute('non-existing-id'),
    ).rejects.toBeInstanceOf(AppError);
  });
});
