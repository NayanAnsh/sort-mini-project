import { Injectable, Logger } from '@nestjs/common';
import { Kafka, Consumer } from 'kafkajs';
import { BroadcastSocketGateway } from 'src/broadcast-socket/broadcast-socket.gateway';

@Injectable()
export class KafkaConsumerService {
  private readonly kafka: Kafka;
  private readonly consumer: Consumer;
  private readonly logger = new Logger(KafkaConsumerService.name);

  constructor(private readonly sender:BroadcastSocketGateway ) {
    this.kafka = new Kafka({
      clientId: 'analytical-consumer',
      brokers: ['localhost:9092'],
    });
    // The consumer must have a group id defined.
    this.consumer = this.kafka.consumer({ groupId: 'consumer-group' });

  }

  async onModuleInit() {
    try {
      await this.consumer?.connect();
      this.logger.log('Kafka consumer connected.');

      // Subscribe to the topic(s) you need. Adjust 'your-topic' as needed.
      await this.consumer.subscribe({
        topic: 'Buttons',
        fromBeginning: true,
      });
      await this.consumer.subscribe({
        topic: 'Site',
        fromBeginning: true,
      });
      await this.consumer.subscribe({
        topic: 'Mouse',

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
          if(topic == "Buttons"){
            this.sender.emitButtonData(message?.value?.toString());

          }else if( topic == "Site" ){
            console.log("sdfsdf")
            this.sender.emitSiteData(message?.value?.toString());

          }else if(topic == "Mouse"){
            this.sender.emitMouseData(message?.value?.toString());
          }
        },
      });
    } catch (error) {
      this.logger.error('Error during Kafka consumer initialization:', error);
      // Depending on your needs, you might retry connection or handle this error further.
     // throw new Error('Kafka consumer initialization failed.');
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
