import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { BroadcastSocketGateway } from './broadcast-socket/broadcast-socket.gateway';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService , private readonly sender:BroadcastSocketGateway) {}
  
  @Get()
  getHello(): string {
    console.log("tfgjkn")
    return this.appService.getHello();
  }
}
