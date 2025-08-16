import { Test, TestingModule } from '@nestjs/testing';
import { ReserveRoomService } from './reserve-room.service';

describe('ReserveRoomService', () => {
  let service: ReserveRoomService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ReserveRoomService],
    }).compile();

    service = module.get<ReserveRoomService>(ReserveRoomService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
