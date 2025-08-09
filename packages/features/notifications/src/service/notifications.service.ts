import {
  Notification,
  NotificationType,
  NotificationWidget,
} from '../config/notifications.config';
import {
  getNotificationsAction,
  sendNotificationAction,
} from './server-actions';

export function createNotificationService({
  platformId,
  notificationWidgets,
  notificationTypes,
}: {
  platformId: string;
  notificationWidgets: NotificationWidget[];
  notificationTypes: NotificationType[];
}) {
  return new NotificationService({
    platformId,
    notificationWidgets,
    notificationTypes,
  });
}

type WidgetIdToInput<TWidgets extends readonly NotificationWidget[]> = {
  [K in TWidgets[number] as K['id']]: K['input'] extends z.ZodSchema<
    infer Input
  >
    ? Input
    : never;
};

class NotificationService<
  TTypes extends NotificationType[],
  TWidgets extends NotificationWidget[],
> {
  private platformId: string;
  private widgets: TWidgets;
  private types: TTypes;

  private widgetInputMap: WidgetIdToInput<TWidgets>;

  constructor({
    platformId,
    notificationWidgets,
    notificationTypes,
  }: {
    platformId: string;
    notificationWidgets: TWidgets;
    notificationTypes: TTypes;
  }) {
    this.platformId = platformId;
    this.widgets = notificationWidgets;
    this.types = notificationTypes;
    this.widgetInputMap = {} as any; // not needed at runtime
  }

  async getNotifications({
    userId,
  }: {
    userId: string;
  }): Promise<Notification[]> {
    const data = await getNotificationsAction({
      userId,
      platformId: this.platformId,
    });

    return data.map((item) => {
      const findNotificationType = () => {
        const type = this.types.find(
          (notifType) => notifType.id === item.notificationType,
        );

        if (!type) {
          throw new Error(
            `Notification type ${item.notificationType} not found`,
          );
        }

        return type;
      };

      const getWidget = () => {
        if (!item.widgetId) {
          return undefined;
        }

        const widget = this.widgets.find(
          (widget) => widget.id === item.widgetId,
        );

        if (!widget) {
          throw new Error(`Widget with ID ${item.widgetId} not found`);
        }

        return widget;
      };

      return {
        id: item.id,
        title: item.title,
        description: item.description,
        timestamp: item.timestamp.toISOString(),
        isRead: item.isRead,
        notificationType: findNotificationType(),
        widget: getWidget(),
      };
    });
  }

  async sendNotification<K extends keyof WidgetIdToInput<TWidgets>>({
    userId,
    title,
    description,
    notificationType,
    widgetId,
    widgetInput,
  }: {
    userId: string;
    title: string;
    description: string;
    notificationType: TTypes[number]['id'];
    widgetId?: K;
    widgetInput?: WidgetIdToInput<TWidgets>[K];
  }): Promise<void> {
    const widget = widgetId
      ? this.widgets.find((w) => w.id === widgetId)
      : undefined;

    if (widget && !widget.input.safeParse(widgetInput).success) {
      throw new Error(`Invalid input for widget ${String(widgetId)}`);
    }

    await sendNotificationAction({
      userId,
      title,
      description,
      platformId: this.platformId,
      notificationType,
      widgetId: widgetId as string | undefined,
      widgetData: widgetInput as Record<string, any> | undefined,
    });
  }
}
