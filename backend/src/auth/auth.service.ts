import { Injectable } from '@nestjs/common';
import { SqsService } from 'src/sqs/sqs.service';

@Injectable()
export class AuthService {
    constructor(private readonly sqsService: SqsService) {}

    async signup(email:string) {
        const message = {
            email,
            type: 'welcome-email',
        }
        await this.sqsService.sendMessage(message)
        return {
            message: 'Signup success. Email queued.',
        }
    }
    
}
