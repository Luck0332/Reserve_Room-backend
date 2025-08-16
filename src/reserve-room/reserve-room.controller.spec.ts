import { Test, TestingModule } from '@nestjs/testing';
import { ReserveRoomController } from './reserve-room.controller';

describe('ReserveRoomController', () => {
  let controller: ReserveRoomController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ReserveRoomController],
    }).compile();

    controller = module.get<ReserveRoomController>(ReserveRoomController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
