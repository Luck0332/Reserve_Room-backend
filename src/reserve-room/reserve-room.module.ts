import { Module } from '@nestjs/common';
import { ReserveRoomService } from './reserve-room.service';

@Module({
  providers: [ReserveRoomService]
})
export class ReserveRoomModule {}
