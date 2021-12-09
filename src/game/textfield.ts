export class TextField extends createjs.Container {
  private _textSprite = new createjs.Container();
  private _mc: new () => createjs.MovieClip;
  private _origin: any;
  private _texts: any[] = [];
  private _adjustW: any;
  public text = this.createText;

  constructor(text: any, mc: new () => createjs.MovieClip, origin: any, adjustW: any) {
    super();
    this._mc = mc;
    this._origin = origin;
    this.addChild(this._textSprite);
    this._adjustW = adjustW;
    this.createText(text);
  }

  private createText(textValue: any) {
    let str = textValue + "";

    //文字幅
    let dummy = new this._mc();
    dummy.gotoAndStop(0);
    dummy.x = this.x;
    dummy.y = this.y;

    let NUM_WIDTH = dummy.getBounds().width + this._adjustW; // 文字調整用

    //初期化
    this._texts.forEach((value) => {
      this._textSprite.removeChild(value);
    });
    this._texts = [];
    Array.prototype.forEach.call(str, (value, index) => {
      // valueがコロン(:)または点(.)の時は、11番目のフレーム番号に変換する処理を追加
      if (value === ":" || value === ".") {
        value = 11;
      }

      let _textMc = new this._mc();
      _textMc.gotoAndStop(value);
      _textMc.x = index * NUM_WIDTH;
      this._texts.push(_textMc);
      this._textSprite.addChild(this._texts[index]);
    });

    if (this._origin == 2 || this._origin == 5 || this._origin == 8) {
      this._textSprite.x = (-NUM_WIDTH * str.length) / 2 + this._adjustW / 2;
    } else if (this._origin == 3 || this._origin == 6 || this._origin == 9) {
      this._textSprite.x = -NUM_WIDTH * str.length + this._adjustW / 2;
    }
    if (this._origin == 1 || this._origin == 2 || this._origin == 3) {
      this._textSprite.y = -this._textSprite.getBounds().height;
    } else if (this._origin == 4 || this._origin == 5 || this._origin == 6) {
      this._textSprite.y = -this._textSprite.getBounds().height / 2;
    }
  }
}
