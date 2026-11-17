import { Controller, MessageEvent, Sse } from '@nestjs/common';
import { Observable, interval, map } from 'rxjs';
import { Public } from '../auth/decorators/public.decorator.js';
import { EventsGateway } from './events.gateway.js';

export const SSE_INTERVAL_MS = 5000;

@Public()
@Controller('notifications')
export class NotificationsController {
  constructor(private readonly eventsGateway: EventsGateway) {}

  @Sse('events/stream')
  stream(): Observable<MessageEvent> {
    return interval(SSE_INTERVAL_MS).pipe(
      map((tick) => ({
        id: String(tick),
        type: 'serverStatus',
        data: {
          tick,
          status: 'online',
          serverTime: new Date().toISOString(),
          uptimeSeconds: Math.round(process.uptime()),
          activeConnections: this.eventsGateway.connectionsCount,
          activeDeliveryRooms: this.eventsGateway.deliveryRoomsCount,
          memoryMb:
            Math.round((process.memoryUsage().rss / 1024 / 1024) * 10) / 10,
        },
      })),
    );
  }
}
