import { Processor, Process,OnQueueCompleted  } from '@nestjs/bull';
import { Job } from 'bull';
import { orderDto } from '../dto/order.dto';
import { DatabaseService } from 'src/modules/database/database.service';
import { orders } from '@prisma/client';
@Processor('ordersQueue')
export class OrdersConsumer {
  constructor(private readonly db: DatabaseService) {}
  @Process()
  async transcode(job: Job<orders>) {
    return {};
  }

  @OnQueueCompleted()
  async onCompleted(job: Job,result:any) {
    await this.db.orders.update({
      where: { id: job.data.data.id },
      data: {status:'processed'},
    });
  }
}
