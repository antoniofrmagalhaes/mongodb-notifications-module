import NotificationsTestRepository from '../infra/mongoose/repositories/test/NotificationsTestRepository';
import CreateNotificationService from './CreateNotificationService';
import DeleteNotificationService from './DeleteNotificationService';
import AppError from '../../../errors/AppError';

let notificationTestRepository: NotificationsTestRepository;
let createNotificationService: CreateNotificationService;
let deleteNotificationService: DeleteNotificationService;

describe('Delete Notification Service Test', () => {
  beforeEach(() => {
    notificationTestRepository = new NotificationsTestRepository();
    createNotificationService = new CreateNotificationService(
      notificationTestRepository,
    );
    deleteNotificationService = new DeleteNotificationService(
      notificationTestRepository,
    );
  });

  it('should delete an specific notification', async () => {
    const notification = await createNotificationService.execute({
      content: 'content',
    });
    expect(deleteNotificationService.execute(notification._id));
  });

  it('should not delete a non existing notification', async () => {
    await expect(
      deleteNotificationService.execute('non-existing-id'),
    ).rejects.toBeInstanceOf(AppError);
  });
});
