import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import {
  SQSClient,
  SendMessageCommand,
} from '@aws-sdk/client-sqs';

@Injectable()
export class SqsService {
  private sqsClient: SQSClient;

  constructor(private configService: ConfigService) {
    this.sqsClient = new SQSClient({
      region: this.configService.get<string>('AWS_REGION'),

      credentials: {
        accessKeyId:
          this.configService.get<string>('AWS_ACCESS_KEY_ID')!,

        secretAccessKey:
          this.configService.get<string>(
            'AWS_SECRET_ACCESS_KEY',
          )!,
      },
    });
  }

  async sendMessage(messageBody: any) {
    const command = new SendMessageCommand({
      QueueUrl:
        this.configService.get<string>('SQS_QUEUE_URL'),

      MessageBody: JSON.stringify(messageBody),
    });

    const result = await this.sqsClient.send(command);

    return result;
  }
}