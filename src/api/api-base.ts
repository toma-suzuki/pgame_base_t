type HttpMethod = 'GET' | 'POST' | 'FUNCTION';
type KeyValue = { [key: string]: any };

/**
 * APIクラスを作成するベースクラス
 */
export abstract class ApiBase<T extends KeyValue> {
  /**
   * @param method HttpMethod
   * @param protocol URLのプロトコル
   * @param host URLのドメイン名
   * @param path URLのパス名
   * @param param APIの呼び出し時に指定する引数
   */
  protected constructor(
    public method: HttpMethod = 'GET',
    public protocol: string = '',
    public host: string = '',
    public path: string = '',
    public param: T | undefined
  ) {}

  private static _COMMON_HOST: string = '';

  public static get COMMON_HOST() {
    return this._COMMON_HOST;
  }

  public static set COMMON_HOST(host: string) {
    this._COMMON_HOST = host;
  }

  /**
   * 「pgame_fw_〇〇」という形式のAPIを生成する際にオーバーライドする
   */
  public func: (e: T) => void = () => {};

  /**
   * @returns プロトコル、ドメイン名、パス名を基に生成したURL
   */
  public createUrl(): string {
    return this.protocol ? `${this.protocol}://${this.host}${this.path}` : `${this.host}${this.path}`;
  }

  /**
   * @returns フォームデータ
   */
  public createFormData(): FormData {
    let formData: FormData = new FormData();
    formData.append('', '');
    return formData;
  }
}
