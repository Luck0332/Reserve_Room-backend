
import { Module, Global } from '@nestjs/common';
import { PrismaService } from './prisma.service';


@Global()
@Module({
  providers: [PrismaService, PrismaService],
  exports: [PrismaService, PrismaService],
})
export class PrismaModule {}