const redisStore = require('koa-redis');
const Redisdb = require('ioredis');

/**
 * redis config.
 * if you Linux hava firewalld, you need stop it.
 * systemctl stop firewalld.service
 */
module.exports = class Redis {
  constructor() {
    this.config = {
      port: 6379,
      host: '127.0.0.1',
      db: 0
    };
    this.client = new Redisdb(this.config);
    this.options = { client: this.client, db: 0 };
    this.store = redisStore(this.options);
  }

  async storeClient() {
    return this.store.client;
  }

  /**
   *
   * @param {*} key
   * @param {*} value
   * @param {*} expiryMode
   * EX seconds -- Set the specified expire time, in seconds.
   * PX milliseconds -- Set the specified expire time, in milliseconds.
   * NX -- Only set the key if it does not already exist.
   * XX -- Only set the key if it already exist.
   * KEEPTTL -- Retain the time to live associated with the key
   * @param {*} time
   * @returns
   */
  async set(key, value, expiryMode = 'EX', time = 1800) {
    return this.client.set(key, value, expiryMode, time);
  }

  async get(key) {
    return this.client.get(key);
  }

  async sadd(key, data) {
    return this.client.sadd(key, data);
  }

  async sget(key) {
    return this.client.smembers(key);
  }

  async setObjArr(key, objArr) {
    return this.client.smembers(key);
  }

  async hmset(key, data) {
    return this.client.hmset(key, data);
  }

  async expire(key, time) {
    return this.client.expire(key, time);
  }

  async hmget(key) {
    return this.client.hgetall(key);
  }

  async getAllKey() {
    return this.client.keys('*');
  }
};
