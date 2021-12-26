import { IRedisConfig } from "../interface";
import Redis from 'ioredis';

export class RedisService {
  private redisInstance: any;
  constructor(config: IRedisConfig) {
    this.redisInstance = new Redis(config);
  }
  
  sub(event: string, cb) {
    this.redisInstance.subscribe(event, (e) => {
      console.log({ event }, 'subscribe');
    });
    this.redisInstance.on("message", (channel, res) => {
      console.log({ channel, res }, '收到事件');
      if (channel === event && cb) {
        cb(res);
      }
    });
    this.redisInstance.on("error", (error) => {
      console.log({error}, 'error');
    });
  }
}