import { MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'http';

@WebSocketGateway({
  cors: {
    orgin: ['*'],
  },
})
export class BroadcastSocketGateway {
  @WebSocketServer()
   server : Server
  @SubscribeMessage('Buttons')
  emitButtonData(@MessageBody() data: any): string {
    console.log("Emited to  Buttons")
    this.server.emit('Buttons', data);
    return 'Hello world!';
  }
  @SubscribeMessage('Site')
  emitSiteData(@MessageBody() data: any): string {
    console.log("Emited to  Site")

    this.server.emit('Site', data);
    return 'Hello world!';
  }

}
