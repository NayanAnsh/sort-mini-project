import { Injectable, Logger } from '@nestjs/common';
import { Kafka, Consumer } from 'kafkajs';

@Injectable()
export class KafkaConsumerService {
  private readonly kafka: Kafka;
  private readonly consumer: Consumer;
  private readonly logger = new Logger(KafkaConsumerService.name);

  constructor() {
    this.kafka = new Kafka({
      clientId: 'analytical-consumer',
      brokers: ['localhost:9092'],
    });
    // The consumer must have a group id defined.
    this.consumer = this.kafka.consumer({ groupId: 'consumer-group' });
  }

  async onModuleInit() {
    try {
      await this.consumer.connect();
      this.logger.log('Kafka consumer connected.');

      await this.consumer.subscribe({
        topic: 'Buttons',
        fromBeginning: true,
      });
      this.logger.log('Subscribed to topic: your-topic');
      await this.consumer.run({
        // eslint-disable-next-line @typescript-eslint/require-await
        eachMessage: async ({ topic, partition, message }) => {
          console.log({
            topic: topic,
            partition: partition,
            value: message?.value?.toString(),
          });
        },
      });
    } catch (error) {
      this.logger.error('Error during Kafka consumer initialization:', error);
      throw new Error('Kafka consumer initialization failed.');
    }
  }

  async onModuleDestroy() {
    try {
      await this.consumer.disconnect();
      this.logger.log('Kafka consumer disconnected.');
    } catch (error) {
      this.logger.error('Error disconnecting Kafka consumer:', error);
    }
  }
}
