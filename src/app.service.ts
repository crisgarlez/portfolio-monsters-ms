import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getInstanceName(): string {
    return 'Monsters Microservice';
  }
}
