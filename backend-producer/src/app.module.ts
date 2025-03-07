import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EventsGateway } from './events/events.gateway';
import { KafkaService } from './kafka/kafka.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService, EventsGateway, KafkaService],
})
export class AppModule {}
