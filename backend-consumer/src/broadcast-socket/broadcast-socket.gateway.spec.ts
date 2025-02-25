import { Test, TestingModule } from '@nestjs/testing';
import { BroadcastSocketGateway } from './broadcast-socket.gateway';

describe('BroadcastSocketGateway', () => {
  let gateway: BroadcastSocketGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BroadcastSocketGateway],
    }).compile();

    gateway = module.get<BroadcastSocketGateway>(BroadcastSocketGateway);
  });

  it('should be defined', () => {
    expect(gateway).toBeDefined();
  });
});
