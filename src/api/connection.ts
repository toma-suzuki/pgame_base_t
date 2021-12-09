import { ApiBase } from './api-base';

/**
 * httpメソッドを呼び出すクラス
 */
class ConnectionClass {
  constructor() {}

  public async run(api: ApiBase<any>): Promise<any> {
    switch (api.method) {
      case 'GET':
        return this.runGet(api);
      case 'POST':
        return this.runPost(api);
      case 'FUNCTION':
        return this.runFunction(api);
      default:
        throw new Error(`${api.method} is undefined !!`);
    }
  }

  private runGet(api: ApiBase<any>) {
    return fetch(api.createUrl() + new URLSearchParams(api.param)).then((response) => response.json());
  }

  private runPost(api: ApiBase<any>) {
    const init = {
      method: api.method,
      body: JSON.stringify(api.param),
    };
    return fetch(api.createUrl(), init).then((response) => response.json());
  }

  private runFunction(api: ApiBase<any>) {
    if (!api.func) {
      throw new Error('func が設定されていません !!');
    }
    const param = api.param ? api.param : {};
    try {
      const result = api.func(param);
      return Promise.resolve(result);
    } catch (e) {
      return Promise.reject(e);
    }
  }
}

export const Connection = new ConnectionClass();
