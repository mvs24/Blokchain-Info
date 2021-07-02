import redis, { RedisClient } from "redis";

if (!process.env.REDIS_HOST) {
  console.log("REDIS_HOST must be defined");
  process.exit(1);
}

class Redis {
  public redisClient: RedisClient;
  constructor() {
    this.redisClient = redis.createClient({
      host: process.env.REDIS_HOST,
      port: 6379,
    });
  }

  has(key: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.redisClient.exists(key, (err, exists) => {
        if (err) reject(err);
        if (exists) resolve(true);
        else resolve(false);
      });
    });
  }

  getData(key: string) {
    return new Promise((resolve, reject) => {
      this.redisClient.get(key, (err, reply) => {
        if (err || !reply) reject(err);
        if (reply) resolve(JSON.parse(reply));
      });
    });
  }

  set(key: string, value: any) {
    return this.redisClient.set(key, JSON.stringify(value));
  }
}

export default new Redis();
