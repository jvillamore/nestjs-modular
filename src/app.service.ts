import { Injectable, Inject } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
@Injectable()
export class AppService {
  constructor(
    private configService: ConfigService,
    @Inject('API_KEY') private apikey: string,
    @Inject('TASKS') private tasks: any[],
  ) {}
  getHello(): string {
    console.log(this.configService.get('API_KEY'));
    return `apikey ${this.configService.get('API_KEY')}`;
  }
}
