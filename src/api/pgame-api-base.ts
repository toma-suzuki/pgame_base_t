import { ApiBase } from './api-base';

type KeyValue = { [key: string]: any };

/**
 * ゲームに関わるAPIを作成するクラス
 */
export class PgameApiBase<Param extends KeyValue> extends ApiBase<Param> {
  private readonly values: Array<Param> = [];

  constructor(param: Param, private methodName: string) {
    super('FUNCTION', '', '', '', param);
    this.values = Object.values(this.param || {});
  }

  /**
   * メソッドをオーバーライドして「pgame_fw_〇〇」という形式のWindowオブジェクトにアクセス
   * SV1環境でのみ動作
   */
  func = () => {
    if (window.hasOwnProperty(this.methodName)) {
      (window as any)[this.methodName](...this.values);
    } else {
      console.log(`${this.methodName} is not found !!`);
    }
  };
}
