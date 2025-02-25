import { Injectable } from '@nestjs/common';
import { Admin, Kafka, Producer } from 'kafkajs';

@Injectable()
export class KafkaService {
  private readonly kafka: Kafka;
  private readonly producer: Producer;
  private readonly admin: Admin;
  private readonly topics: string[];
  constructor() {
    this.kafka = new Kafka({
      clientId: 'analytical-producer',
      brokers: ['localhost:9092'],
    });
    this.producer = this.kafka.producer();
    this.admin = this.kafka.admin();
    this.topics = ['Buttons', 'Site'];
    //await this.producer.connect();
  }

  async onModuleInit() {
    try {
      await this.producer.connect();
      console.log('Kafka producer connected.');
      await this.admin.connect();
      const topicList = await this.admin.listTopics();
      await Promise.all(
        this.topics.map(async (element) => {
          if ( topicList.includes(element)) return Promise<void>;
        
          const result =  await this.admin.createTopics({
            topics: [
              {
                topic: element,
                numPartitions: 2, // default: -1 (uses broker `num.partitions` configuration)
                replicationFactor: 1, // default: -1 (uses broker `default.replication.factor` configuration)
                // Example: [{ name: 'cleanup.policy', value: 'compact' }] - default: []
              },
            ],
          });
          console.log('Topic creation result:', result);
        }),
      );
      console.log(await this.admin.listTopics());

      await this.admin.disconnect();
    } catch (e) {
      console.error('Error in Kafka operations:', e);
      throw new Error(`Failed Kafka operation: ${e}`);
    }
  }

  async sendTopic(topic: string, payload: string) {
    try {
      console.log(typeof payload);
      await this.producer.send({
        topic,
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        messages: [{ key: 'button', value: Buffer.from(payload) }],
      });
      console.log(payload, ' sent');
    } catch (error) {
      console.log(error);
      throw new Error('Error in sending message ');
    }
  }

  async onModuleDestroy() {
    try {
      await this.producer.disconnect();
      console.log('Kafka producer disconnected.');
    } catch (error) {
      console.error('Error disconnecting producer:', error);
    }
  }
}
