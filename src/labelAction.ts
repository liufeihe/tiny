import { IRedisConfig } from "./interface";
import { RedisService } from "./utils/redis";

export class LabelActionService {
  private redisService: RedisService;

  constructor(config: IRedisConfig) {
    this.redisService = new RedisService(config);
    this.redisService.sub('athena:event-strategy-label-updated', this.handleLabelChange)
  }

  handleLabelChange(data: any) {
    console.log('data', data);
  }
}