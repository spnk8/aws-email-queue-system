import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { SqsModule } from '../sqs/sqs.module';

@Module({
  imports: [SqsModule],
  controllers: [AuthController],
  providers: [AuthService]
})
export class AuthModule {}
