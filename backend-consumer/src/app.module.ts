import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { KafkaConsumerService } from './kafka-consumer/kafka-consumer.service';
import { BroadcastSocketGateway } from './broadcast-socket/broadcast-socket.gateway';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService, KafkaConsumerService, BroadcastSocketGateway],
})
export class AppModule {}
