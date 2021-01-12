// //////////////////////////////////////////////////////
// Copyright (c) 2021 Luna's Torture Room / るなてぃっく
// Released under the MIT license
// http://opensource.org/licenses/mit-license.php
//
// //////////////////////////////////////////////////////

/**
 * g2e.common モジュール
 */
var g2e = g2e || {};
g2e.common = g2e.common || {};
g2e.common.PATH_ROOT_APP = './story/';
g2e.common.PATH_ROOT_CONT = '../../story/';

{

    class Transition {

        /**
         * id属性がgame-fade-curtainの要素に対してフェードイン処理を行う。
         * @param {Number} duration ミリ秒 デフォルト：500msec
         * @param {Function} complete アニメーション完了時に実行する関数
         */
        static fadeIn({duration=500, complete}={}) {

            $("#game-fade-curtain").fadeIn({
                duration: duration,
                complete: complete
            });
            
        };

        /**
         * id属性がgame-fade-curtainの要素に対してフェードアウト処理を行う。
         * @param {Number} duration ミリ秒 デフォルト：1000msec 
         * @param {Function} complete アニメーション完了時に実行する関数
         */
        static fadeOut({duration=1000, complete}={}) {

            $("#game-fade-curtain").fadeOut({
                duration: duration,
                complete: complete
            });

        };

    };

    var _loading_instance = null;

    /**
     * Singleton
     */
    class Loading {

        constructor() {

            this.state = null;

            // Loading animation
            this.isVAdd = false;
            this.videoElem = document.createElement("video");
            this.videoElem.controls = false;
            this.videoElem.src = "movies/loading.webm";
            this.videoElem.autoplay = false;
            this.videoElem.loop = true;
            this.videoElem.load();

        }

        /**
         * Loadingインスタンスを取得する。
         * ※Singletonなのでコンストラクタは直接呼び出さないこと。
         * @returns {Loading}
         */
        static getInstance() {

            if(_loading_instance) {
                return _loading_instance;
            }
            else {
                return new Loading();   
            };

        };

        /**
         * ローディング画面の表示処理を行う。
         * 表示/非表示の対象 … id属性="loading-container"の要素
         * スプライトシートアニメーションの対象 … id属性="canvas-loading"の要素
         */
        start() {

            if(this.state != "playing") {
                this._play();
                this.state = "playing";
            }

        };

        _play() {

            if(!this.isVAdd) {
                $("#loading-container").append($(this.videoElem));
                this.isVAdd = true;
            }
            this.videoElem.play();
            $("#loading-container").show();

        };

        stop() {

            $("#loading-container").hide();
            this.state = null;
            this.videoElem.pause();
            this.videoElem.load();

        };

        get isLoading() {

            return this.state == "playing";

        };

    };

    class StopWatch {

        /**
         * StopWatchコンストラクタ
         * 
         * @param {Boolean} start newすると同時にストップウォッチを開始するかどうか true：開始(デフォルト)
         * @param {Number} elapseTime 指定した時間が経過した状態でストップウォッチを開始する(ミリ秒)
         * @param {Number} speed ストップウォッチの実行速度。通常：1.0 2倍速：2.0
         */
        constructor({start=true, elapseTime=0, speed=1.0} = {}) {
            
            this._state = "stop";
            this._speed = speed;
            if(start) {
                this.start(elapseTime, speed);
            }

        }

        /**
         * StopWatchを開始する。既に開始していたり、ポーズ中でも強制的に現在時刻からスタートを行う。
         * 
         * @param {Number} elapseTime 経過時間(ミリ秒) 
         * @param {Number} speed ストップウォッチの実行速度。通常：1.0 2倍速：2.0
         */
        start(elapseTime=0, speed=1.0) {

            this._speed = speed;
            this._record = []; // 経過時間記録 [速度が設定された時間(Date.now()), 速度]
            this._record.push([Date.now() - elapseTime, speed]);
            this._startTime = this._elapseBase = Date.now() - elapseTime;
            this._state = "running";

        };

        /**
         * 開始しているStopWatchをポーズする。
         */
        pause() {

            if(this._state == "pause") {
                return;
            }

            this._record.push([Date.now(), 0]);
            this._pauseTime = Date.now();
            this._elapsePause = Date.now() - this._elapseBase;
            this._state = "pause";

        };

        /**
         * ポーズ中のStopWatchを再開する。
         */
        resume() {

            if(this._state != "pause") {
                return;
            }

            this._record.push([Date.now(), this.speed]);
            this._elapseBase = this._elapseBase + (Date.now() - this._pauseTime);
            this._state = "running";

        };

        /**
         * StopWatchをストップする。
         */
        stop() {

            this._state = "stop";

        };

        /**
         * ストップウォッチ実行速度
         */
        get speed() {

            return this._speed;

        };

        /**
         * ストップウォッチ実行速度
         */
        set speed(speed) {

            if(this._state == "running") {
                this._record.push([Date.now(), speed]);
            }

            this._speed = speed;

        };

        /**
         * 速度を考慮した経過時間(ミリ秒) ※読み取り専用
         */
        get elapseTime() {

            if(this._state == "stop") {
                return 0;
            }

            var ret = 0; // elapseTime
            var max = this._record.length - 1;
            var rec1;
            var rec2;
            for(var i=0; i<max; i++) {

                rec1 = this._record[i];
                rec2 = this._record[i+1];

                ret = ret + (rec2[0] - rec1[0]) * rec1[1];

            }

            if(this._state == "running") {
                ret = ret + (Date.now() - this._record[max][0]) * this.speed;
            }

            return ret;

        };

        /**
         * 速度を反映しない経過時間
         */
        get realElapseTime() {

            if(this._state == "running") {
                return Date.now() - this._elapseBase;
            }
            else if(this._state == "pause") {
                return this._elapsePause;
            }
            else {
                return 0;
            }

        };

        set realElapseTime(time) {

            if(this._state == "running") {
                this._elapseBase = Date.now() - time;
            }
            else if(this._state == "pause") {
                this._elapsePause = time;
            }
            else {
                // noop
            }

        };

    };

    class CSSUtil {

        /**
         * 読み込み済みCSSからセレクタに合致するCSS定義を取得する。
         * 
         * @param {String} selector CSSセレクタ 例：".<class名>" 
         * @returns {CSSRule}
         */
        static getCSSRule(selector) {

            var ret = null;
            for(const sheet of document.styleSheets) {

                for(const rule of sheet.cssRules) {

                        if(rule.selectorText == selector) {

                            ret = rule;
                            break;

                        }

                }

            }

            return ret;

        };

    };

    g2e.common.Transition = Transition;
    g2e.common.Loading = Loading;
    g2e.common.StopWatch = StopWatch;
    g2e.common.CSSUtil = CSSUtil;

} // global汚染対策
