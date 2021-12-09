/**
 * 数値計算を便利にするメソッド
 */
export class MathHelper {

  /**
   * 指定した数値の小数点の四捨五入、切り下げ、切り上げ
   * @param a 数値
   * @param decimalPoint 処理を行う小数の位
   * @param mode 四捨五入・切り下げ・切り上げのいずれかを指定
   * @returns 数値
   */
  static round(a: number, decimalPoint?: number, mode: 'round' | 'floor' | 'ceil' = 'round'): number {
    const decimalPointNum = decimalPoint || 0;
    if (decimalPointNum <= 0) {
      throw new Error('round()の第二引数は1以上の数値を指定して下さい。');
    }
    const pow = 10 ** (decimalPointNum - 1);
    switch (mode) {
      case 'round':
        return Math.round(a * pow) / pow;
      case 'floor':
        return Math.floor(a * pow) / pow;
      case 'ceil':
        return Math.ceil(a * pow) / pow;
    }
  }

  /**
   * 指定した2つの数値の範囲で乱数を生成
   * @param min 生成する乱数の最小値
   * @param max 生成する乱数の最大値
   * @returns 数値
   */
  static random(min: number, max: number): number {
    return Math.floor(Math.random() * (max + 1 - min) + min); // 返値は min 以上、 max以下
  }

  /**
   * 指定した数値を文字列で返す
   * @param a 数値
   * @param option trueを入れるかどうかで数字に桁区切りを入れるかを指定
   * @returns 文字列
   */
  static toString(a: number, option?: { localize?: boolean }): string {
    if (option?.localize) {
      return a.toLocaleString();
    }
    return a.toString();
  }

  /**
   * 指定した文字列が数字であれば、数値型に変換して値を返す
   * 数値に変換できない文字列が指定された場合はエラーになる
   * @param a 文字列
   * @returns 数値に変換できない文字列はNaNが返される
   */
  static toNumber(a: string): number {
    return Number(a.replace(/,/g, ''));
  }

  /**
   * 指定した数値の左側に必要な数だけ「0」を付けて文字列で返す
   * @param a 数値
   * @param digit 「0」を含んだ桁数
   * @returns 文字列
   */
  static zeroPadding(a: number, digit: number): string {
    if (digit <= 0) {
      throw new Error('zeroPadding()の第二引数は1以上の数値を指定して下さい。');
    }
    return `${Array(digit).fill('0').join('')}${a}`.slice(-digit);
  }
}
