import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AuthController } from './auth/auth.controller';
import { AuthModule } from './auth/auth.module';
import { PrismaService } from './prisma/prisma.service';
import { ReserveRoomController } from './reserve-room/reserve-room.controller';
import { ReserveRoomModule } from './reserve-room/reserve-room.module';

@Module({
  imports: [UsersModule, AuthModule, ReserveRoomModule],
  controllers: [AppController, AuthController, ReserveRoomController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
