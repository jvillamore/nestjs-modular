import { Injectable, Inject } from '@nestjs/common';
import { ConfigService, ConfigType } from '@nestjs/config';
import config from 'config';
@Injectable()
export class AppService {
  constructor(
    //private configService: ConfigService,
    @Inject('API_KEY') private apikey: string,
    @Inject('TASKS') private tasks: any[],
    @Inject(config.KEY) private configService: ConfigType<typeof config>,
  ) {}
  getHello(): string {
    // Tipado
    console.log(this.configService.apikey);
    return `apikey ${this.configService.database.name}`;
  }
}
