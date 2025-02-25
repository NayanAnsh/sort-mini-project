import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'socket.io';
import { KafkaService } from 'src/kafka/kafka.service';
@WebSocketGateway({
  cors: {
    orgin: ['*'],
  },
})
export class EventsGateway {
  constructor(private kafka: KafkaService) {}
  @WebSocketServer()
  server: Server;
  handleConnection() {
    console.log('new connection!');
  }
  @SubscribeMessage('Button')
  async handleMessage(
    @MessageBody() data: any[],
  ): Promise<{ success: boolean }> {
    console.log('triggred');
    console.log(data);
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
    
   await this.kafka.sendTopic('Buttons', JSON.stringify(data))
 

    return { success: true };
  }
  @SubscribeMessage('Site')
  async handleSiteMessage(
    @MessageBody() data: any[],
  ): Promise<{ success: boolean }> {
    console.log(data);

  await this.kafka.sendTopic('Site', JSON.stringify(data))
    //console.log(b)
   
    return { success: true }; //Client will clear there history of events
  }
}
