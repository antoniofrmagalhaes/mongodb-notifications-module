import NotificationsTestRepository from '../infra/mongoose/repositories/test/NotificationsTestRepository';
import CreateNotificationService from './CreateNotificationService';
import FindAllNotificationsService from './FindAllNotificationsService';

let notificationTestRepository: NotificationsTestRepository;
let createNotificationService: CreateNotificationService;
let findAllNotificationsService: FindAllNotificationsService;

describe('Find All Notification Service Test', () => {
  beforeEach(() => {
    notificationTestRepository = new NotificationsTestRepository();
    createNotificationService = new CreateNotificationService(
      notificationTestRepository,
    );
    findAllNotificationsService = new FindAllNotificationsService(
      notificationTestRepository,
    );
  });

  it('should list all notifications', async () => {
    const query = {
      page: '1',
    };

    const notification1 = await createNotificationService.execute({
      content: 'content',
    });

    const notification2 = await createNotificationService.execute({
      content: 'content',
    });

    const notifications = await findAllNotificationsService.execute(query);

    expect(notifications).toStrictEqual([notification1, notification2]);
  });
});
