/**
 * AnimateCCで使用するムービークリップ名をクラス名で定義
 */
declare module lib {
  export class properties implements Object {
    static width: number;
    static height: number;
    static fps: number;
    static color: string;
    static manifest: Object[];
  }

  export class BtnNext extends createjs.MovieClip {
  }

  export class BtnStart extends createjs.MovieClip {
  }

  export class BtnHowTo extends createjs.MovieClip {
  }

  export class BtnStartFromHowTo extends createjs.MovieClip {
  }

  export class BtnPause extends createjs.MovieClip {
  }

  export class BtnReset extends createjs.MovieClip {
  }

  export class BtnRetry extends createjs.MovieClip {
  }

  export class BtnLine extends createjs.MovieClip {
  }

  export class BtnTwitter extends createjs.MovieClip {
  }

  export class GameOver extends createjs.MovieClip {
  }

  export class GameClear extends createjs.MovieClip {
  }

  export class NumberClip extends createjs.MovieClip {
  }

  export class BlockNumberClip extends createjs.MovieClip {
  }

  export class PageTop extends createjs.MovieClip {
    btnStart: BtnStart;
    btnHowTo: BtnHowTo;
  }

  export class PageHowTo extends createjs.MovieClip {
    btnStartFromHowTo: BtnStartFromHowTo;
  }

  export class PageGame extends createjs.MovieClip {
    btnNext: BtnNext;
    btnPause: BtnPause;
    btnReset: BtnReset;
  }

  export class PageResult extends createjs.MovieClip {
    btnRetry: BtnRetry;
    btnLine: BtnLine;
    btnTwitter: BtnTwitter;
  }
}
