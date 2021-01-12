// //////////////////////////////////////////////////////
// Copyright (c) 2021 Luna's Torture Room / るなてぃっく
// Released under the MIT license
// http://opensource.org/licenses/mit-license.php
//
// //////////////////////////////////////////////////////

/**
 * g2e.contents モジュール
 */
var g2e = g2e || {};
g2e.contents = g2e.contents || {};

{

    const PATH_ROOT_APP = g2e.common.PATH_ROOT_APP;
    const PATH_ROOT_CONT = g2e.common.PATH_ROOT_CONT;
    const config = g2e.config.getConfigValues();
    const SPRITESHEET_FPS_DEFAULT = 24; // スプライトシート全般のフレームレートのデフォルト値
    createjs.Ticker.framerate = 24; // CreateJSのTickerのフレームレート
    const RETICLE_FRAMERATE = 24; // 照準アニメーションのフレームレート
    const loading = g2e.common.Loading.getInstance();

    const CUE_LATENCY = 400;
    const SKIP_SPEED = 3.0;
    const BUFTIME_PAUSE = 200;
    const TEXTSPEED_LOW = 200;
    const TEXTSPEED_HIGH = 10;
    const PAGE_INTVL_TEXT = 0;
    const PAGE_INTVL_BALLOON = 200;
    const PAGE_INTVL_AUTO = 1500;
    const PAGE_INTVL_SKIP = 50;
    const PAGE_CLOSE_GAP = 200;
    const TEXTLINE_INTVL = 500;
    const LETTERS_ABORT_TIMEOUT = 2000;
    const CSS_FOCUSUI_CLSMAP = new Map([["game-controller-svg-frame", "gc-frame-base-high"]]);
    const TEXTSPEED_HIGH_BIAS = -(TEXTSPEED_LOW - TEXTSPEED_HIGH) / 100;
    const FONT_COLOR_DEFAULT = "#FFFFFFFF";
    const CSS_LETTERS_CONTAINER = 'textscn_container';
    const CSS_LETTERS_BG = 'textscn_bg';
    const CSS_LETTERS_NAME = 'textscn_name';
    const CSS_LETTERS_TEXT = 'textscn_text';
    const LETTERS_START_CSSANIM = [ "textscn_anim_start_from" ];
    const LETTERS_CLOSE_CSSANIM = [ "textscn_anim_close_from" ];
    const LETTERS_SHAKE1_CSSANIM = [ "textscn_anim_shake1" ];
    const LETTERS_SHAKE2_CSSANIM = [ "textscn_anim_shake2" ];
    const CSS_ADD_INTERVAL = 12; // CSSアニメーションクラスを複数追加する場合の間隔(ミリ秒)。アニメーションが正常に実行されない場合は増やす
    const LETTERS_CSSANIM_TIMEOUT = 5000; // CSSアニメーション完了を待機する上限時間のデフォルト値(ミリ秒)
    const LETTERS_PAGENEXT_CURSOR = {
        images: ["images/ltr_anim_pageend.png"],
        frames: [[0,0,140,140],[140,0,140,140],[280,0,140,140],[420,0,140,140],[560,0,140,140],[700,0,140,140],[840,0,140,140],[980,0,140,140],[1120,0,140,140],[1260,0,140,140],[1400,0,140,140],[1540,0,140,140],[1680,0,140,140],[1820,0,140,140],[0,140,140,140],[140,140,140,140],[280,140,140,140],[420,140,140,140],[560,140,140,140],[700,140,140,140],[840,140,140,140],[980,140,140,140],[1120,140,140,140],[1260,140,140,140],[1400,140,140,140],[1540,140,140,140],[1680,140,140,140],[1820,140,140,140],[0,280,140,140],[140,280,140,140],[280,280,140,140],[420,280,140,140],[560,280,140,140],[700,280,140,140],[840,280,140,140],[980,280,140,140],[1120,280,140,140],[1260,280,140,140],[1400,280,140,140],[1540,280,140,140],[1680,280,140,140],[1820,280,140,140],[0,420,140,140],[140,420,140,140],[280,420,140,140],[420,420,140,140],[560,420,140,140],[700,420,140,140],[840,420,140,140],[980,420,140,140],[1120,420,140,140],[1260,420,140,140],[1400,420,140,140],[1540,420,140,140],[1680,420,140,140],[1820,420,140,140],[0,560,140,140],[140,560,140,140],[280,560,140,140],[420,560,140,140],[560,560,140,140],[700,560,140,140],[840,560,140,140],[980,560,140,140],[1120,560,140,140],[1260,560,140,140],[1400,560,140,140],[1540,560,140,140],[1680,560,140,140],[1820,560,140,140],[0,700,140,140],[140,700,140,140],[280,700,140,140],[420,700,140,140],[560,700,140,140],[700,700,140,140],[840,700,140,140],[980,700,140,140],[1120,700,140,140],[1260,700,140,140],[1400,700,140,140],[1540,700,140,140],[1680,700,140,140],[1820,700,140,140],[0,840,140,140],[140,840,140,140],[280,840,140,140],[420,840,140,140],[560,840,140,140],[700,840,140,140],[840,840,140,140],[980,840,140,140],[1120,840,140,140],[1260,840,140,140],[1400,840,140,140],[1540,840,140,140],[1680,840,140,140],[1820,840,140,140],[0,980,140,140],[140,980,140,140],[280,980,140,140],[420,980,140,140],[560,980,140,140],[700,980,140,140],[840,980,140,140],[980,980,140,140],[1120,980,140,140],[1260,980,140,140],[1400,980,140,140],[1540,980,140,140],[1680,980,140,140],[1820,980,140,140],[0,1120,140,140],[140,1120,140,140],[280,1120,140,140],[420,1120,140,140],[560,1120,140,140],[700,1120,140,140],[840,1120,140,140],[980,1120,140,140],[1120,1120,140,140],[1260,1120,140,140],[1400,1120,140,140],[1540,1120,140,140],[1680,1120,140,140],[1820,1120,140,140],[0,1260,140,140],[140,1260,140,140],[280,1260,140,140],[420,1260,140,140],[560,1260,140,140],[700,1260,140,140],[840,1260,140,140],[980,1260,140,140],[1120,1260,140,140],[1260,1260,140,140],[1400,1260,140,140],[1540,1260,140,140],[1680,1260,140,140],[1820,1260,140,140],[0,1400,140,140],[140,1400,140,140],[280,1400,140,140],[420,1400,140,140],[560,1400,140,140],[700,1400,140,140],[840,1400,140,140],[980,1400,140,140],[1120,1400,140,140],[1260,1400,140,140],[1400,1400,140,140],[1540,1400,140,140],[1680,1400,140,140],[1820,1400,140,140],[0,1540,140,140],[140,1540,140,140],[280,1540,140,140],[420,1540,140,140],[560,1540,140,140],[700,1540,140,140],[840,1540,140,140],[980,1540,140,140],[1120,1540,140,140],[1260,1540,140,140],[1400,1540,140,140],[1540,1540,140,140],[1680,1540,140,140],[1820,1540,140,140],[0,1680,140,140],[140,1680,140,140],[280,1680,140,140],[420,1680,140,140],[560,1680,140,140],[700,1680,140,140],[840,1680,140,140],[980,1680,140,140],[1120,1680,140,140],[1260,1680,140,140],[1400,1680,140,140],[1540,1680,140,140],[1680,1680,140,140],[1820,1680,140,140],[0,1820,140,140],[140,1820,140,140],[280,1820,140,140],[420,1820,140,140],[560,1820,140,140],[700,1820,140,140],[840,1820,140,140],[980,1820,140,140],[1120,1820,140,140],[1260,1820,140,140]],
        coordx:1240, coordy:280, scale:0.47
    };
    const LETTERS_END_CURSOR = {
        images: ["images/ltr_anim_end.png"],
        frames: [[0,0,140,140],[140,0,140,140],[280,0,140,140],[420,0,140,140],[560,0,140,140],[700,0,140,140],[840,0,140,140],[980,0,140,140],[1120,0,140,140],[1260,0,140,140],[1400,0,140,140],[1540,0,140,140],[1680,0,140,140],[1820,0,140,140],[0,140,140,140],[140,140,140,140],[280,140,140,140],[420,140,140,140],[560,140,140,140],[700,140,140,140],[840,140,140,140],[980,140,140,140],[1120,140,140,140],[1260,140,140,140],[1400,140,140,140],[1540,140,140,140],[1680,140,140,140],[1820,140,140,140],[0,280,140,140],[140,280,140,140],[280,280,140,140],[420,280,140,140],[560,280,140,140],[700,280,140,140],[840,280,140,140],[980,280,140,140],[1120,280,140,140],[1260,280,140,140],[1400,280,140,140],[1540,280,140,140],[1680,280,140,140],[1820,280,140,140],[0,420,140,140],[140,420,140,140],[280,420,140,140],[420,420,140,140],[560,420,140,140],[700,420,140,140],[840,420,140,140],[980,420,140,140],[1120,420,140,140],[1260,420,140,140],[1400,420,140,140],[1540,420,140,140],[1680,420,140,140],[1820,420,140,140],[0,560,140,140],[140,560,140,140],[280,560,140,140],[420,560,140,140],[560,560,140,140],[700,560,140,140],[840,560,140,140],[980,560,140,140],[1120,560,140,140],[1260,560,140,140],[1400,560,140,140],[1540,560,140,140],[1680,560,140,140],[1820,560,140,140],[0,700,140,140],[140,700,140,140],[280,700,140,140],[420,700,140,140],[560,700,140,140],[700,700,140,140],[840,700,140,140],[980,700,140,140],[1120,700,140,140],[1260,700,140,140],[1400,700,140,140],[1540,700,140,140],[1680,700,140,140],[1820,700,140,140],[0,840,140,140],[140,840,140,140],[280,840,140,140],[420,840,140,140],[560,840,140,140],[700,840,140,140],[840,840,140,140],[980,840,140,140],[1120,840,140,140],[1260,840,140,140],[1400,840,140,140],[1540,840,140,140],[1680,840,140,140],[1820,840,140,140],[0,980,140,140],[140,980,140,140],[280,980,140,140],[420,980,140,140],[560,980,140,140],[700,980,140,140],[840,980,140,140],[980,980,140,140],[1120,980,140,140],[1260,980,140,140],[1400,980,140,140],[1540,980,140,140],[1680,980,140,140],[1820,980,140,140],[0,1120,140,140],[140,1120,140,140],[280,1120,140,140],[420,1120,140,140],[560,1120,140,140],[700,1120,140,140],[840,1120,140,140],[980,1120,140,140],[1120,1120,140,140],[1260,1120,140,140],[1400,1120,140,140],[1540,1120,140,140],[1680,1120,140,140],[1820,1120,140,140],[0,1260,140,140],[140,1260,140,140],[280,1260,140,140],[420,1260,140,140],[560,1260,140,140],[700,1260,140,140],[840,1260,140,140],[980,1260,140,140],[1120,1260,140,140],[1260,1260,140,140],[1400,1260,140,140],[1540,1260,140,140],[1680,1260,140,140],[1820,1260,140,140],[0,1400,140,140],[140,1400,140,140],[280,1400,140,140],[420,1400,140,140],[560,1400,140,140],[700,1400,140,140],[840,1400,140,140],[980,1400,140,140],[1120,1400,140,140],[1260,1400,140,140],[1400,1400,140,140],[1540,1400,140,140],[1680,1400,140,140],[1820,1400,140,140],[0,1540,140,140],[140,1540,140,140],[280,1540,140,140],[420,1540,140,140],[560,1540,140,140],[700,1540,140,140],[840,1540,140,140],[980,1540,140,140],[1120,1540,140,140],[1260,1540,140,140],[1400,1540,140,140],[1540,1540,140,140],[1680,1540,140,140],[1820,1540,140,140],[0,1680,140,140],[140,1680,140,140],[280,1680,140,140],[420,1680,140,140],[560,1680,140,140],[700,1680,140,140],[840,1680,140,140],[980,1680,140,140],[1120,1680,140,140],[1260,1680,140,140],[1400,1680,140,140],[1540,1680,140,140],[1680,1680,140,140],[1820,1680,140,140],[0,1820,140,140],[140,1820,140,140],[280,1820,140,140],[420,1820,140,140],[560,1820,140,140],[700,1820,140,140],[840,1820,140,140],[980,1820,140,140],[1120,1820,140,140],[1260,1820,140,140]],
        coordx:1240, coordy:280, scale:0.47
    };
    const LETTERS_ANIM_ALIAS = {
        all_none : {
            start : { active:false }, 
            end : { active:false },
            close : { active:false },
            pagestart : { active:false },
            pageend : { active:false },
            pageclose : { active:false },
            realtime : { active:false }
        },
        text_default : {
            start : { active:true, js : { css : { classes : LETTERS_START_CSSANIM, isWait : true } } }, 
            end : { active:true, canvas : { spritesheet : LETTERS_END_CURSOR }},
            close : { active:true, js : { css : { classes : LETTERS_CLOSE_CSSANIM, isWait : true } } },
            pagestart : { active:true },
            pageend : { active:true, canvas : { spritesheet : LETTERS_PAGENEXT_CURSOR } },
            pageclose : { active:true },
            realtime : { active:true }
        },
        balloon_default : {
            start : { active:true, js : { css : { classes : LETTERS_START_CSSANIM, isWait : true } } },
            end : { active:true },
            close : { active:true, js : { css : { classes : LETTERS_CLOSE_CSSANIM, isWait : true } } },
            pagestart : { active:true, js : { css : { classes : LETTERS_START_CSSANIM, isWait : true } } }, 
            pageend : { active:true },
            pageclose : { active:true, js : { css : { classes : LETTERS_CLOSE_CSSANIM, isWait : true } } },
            realtime : { active:true }
        },
        shake1 : {
            realtime : { active:true, js : { css : { classes : LETTERS_SHAKE1_CSSANIM, isWait : false } } }
        },
        shake2 : {
            realtime : { active:true, js : { css : { classes : LETTERS_SHAKE2_CSSANIM, isWait : false, timeout : 2000 } } }
        }
    };

    class Util {

        /**
         * カメラ番号を指定し、スクリーンタイプを返却する。
         * 
         * @param {Number} cam カメラ番号 
         */
        static getScreenType(cam) {

            return cam == 360 ? "3d" : "2d";

        };

        /**
         * 指定した座標がUIコントローラー上かどうかを返却する。
         * @param {Number} x x座標(left)
         * @param {Number} y y座標(top)
         * @returns {Boolean} true コントローラー上
         */
        static isOnController(x, y) {

            const ctrlElm = $("#game-controller-container");
            const width = ctrlElm.outerWidth();
            const height = ctrlElm.outerHeight();
            var minX = ctrlElm.offset().left;
            var maxX = minX + width;
            var minY = ctrlElm.offset().top;
            var maxY = minY + height;

            return (minX <= x && x <= maxX) && (minY <= y && y < maxY);

        };

    }

    class Video {

        /**
         * コンストラクタ
         * 
         * @param {VideoData} videoData 再生するビデオのVideoDataオブジェクト
         * @param {String} videoElemId 取得するvideoElementのid属性。指定しない場合は新規作成する。 
         * @param {String} movieStageId CreateJSのStageとして指定するCanvas要素のid属性。デフォルト：canvas-movie 
         * @param {function} handler_video_end ビデオが終端まで再生終了した場合に実行するハンドラー関数。 
         * @param {ContentPlayer} player 自身を登録管理するContentPlayerのインスタンス。
         * @param {Number} cam カメラアングルの番号。デフォルト:-1(アングルなし) 1 or 2 or 3or 360。
         * @param {Number} seektime ビデオ再生開始時のシーク時間(sec) デフォルト:0[sec]
         */
        constructor({videoData, videoElemId, handler_video_end, player, cam=-1, seektime=0}) {

            // メンバー変数
            this.player = player; // ContentsPlayer
            this.dummy_cont = document.getElementById("non-display-dummy-container");

            this.videoElemId = videoElemId;
            this._genVideoElement();
            this.cam = cam;
            [this.videoElem.src, this.realCam] = videoData.getVideoPath({is_outline:config.is_outline, is_60fps:config.is_60fps, cam:cam});
            this.screen_type = Util.getScreenType(this.realCam);
            this.videoElem.currentTime = seektime;
            this.videoData = videoData;

            this.vttcues = [];
            this._genTrackCues();

            this.handler_video_end = handler_video_end;
            this.addVideoEndHandler(handler_video_end);

            $(this.player).on("change_speed", () => { this.speed = this.player.speed; }); // ContentPlayerの再生速度変更イベントを監視
        
        }

        get currentSec() {
            return this.videoElem.currentTime;
        };

        get currentMSec() {
            return this.videoElem.currentTime * 1000;
        };

        _genVideoElement() {

            this.videoElem = this.videoElemId ? document.getElementById(this.videoElemId) : document.createElement("video");
            this.videoElem.autoplay = false;
            this.dummy_cont.appendChild(this.videoElem);

        };

        _removeVideoElement() {

            this.dummy_cont.removeChild(this.videoElem);

        };

        _regenVideoElement() {

            this._removeVideoElement();
            this._genVideoElement();
            this.addVideoEndHandler(this.handler_video_end);

        };

        _genTrackCues() {

            this.trackElem = this.videoElem.addTextTrack("chapters", "japanese", "ja");
            this.trackElem.default = true;
            this.trackElem.mode = "hidden";

            for(const [ctime, cd] of this.videoData.cues ) { // [キュータイム, キューデータ]

                var time = ctime - CUE_LATENCY;
                time = time > 0 ? time / 1000 : 0;
                var cue = new VTTCue(time, time, "fire cue");
                cue.cue_data = cd; // * onenter内で参照可
                cue.player = this.player; // * onenter内で参照可
                cue.video = this; // * onenter内で参照可
                this.trackElem.addCue(cue);
                this.vttcues.push(cue);
                cue.onenter = this._cue_onenter_handler; // onenterハンドラ

            }
        
        };

        _cue_onenter_handler() {

            var videoElem = this.video.videoElem;
            if(this.cue_data.cue_time <= CUE_LATENCY && videoElem.currentTime == 0) {
                return; // 動画の冒頭は二重にキューが発行されるので無効
            }

            var diff = (this.cue_data.cue_time - videoElem.currentTime * 1000) / this.player.speed;
            var delay = diff > 0 ? diff : 0;
            if(this.video.videoElem.played.length > 0) { // 二重キュー対策その２

                // ラグのないなるべく正確な時刻にキューを実行(内setTimeout)
                this.player.fire_cues({cue_data:this.cue_data, delay:delay});

            }

        };

        /**
         * ビデオを切り替える。
         * 
         * @param {VideoData} videoData 再生するビデオデータ
         * @param {Number} seektime[msec] 再生時に開始する時間 
         * @param {Number} cam カメラ番号 
         * @param {Function} seedend シーク完了後に実行するコールバック関数
         */
        async setVideo({videoData, seektime=0, cam=-1, seekend=()=>{}}) {

            this.removeCueAll();
            this.videoData = videoData;
            this._regenVideoElement();
            this._genTrackCues();
            this.cam = cam;
            [this.videoElem.src, this.realCam] = videoData.getVideoPath({is_outline:config.is_outline, is_60fps:config.is_60fps, cam:cam});;
            this.screen_type = Util.getScreenType(this.realCam);
            this.videoElem.load();
            this.speed = this.player.speed;

            return new Promise((resolve) => {

                if(seektime) {
                    var v = $(this.videoElem);
                    v.one('seeked', seekend);
                    v.one('seeked', resolve);
                }
                else {
                    seekend();
                    resolve();
                }
    
                this.videoElem.currentTime = seektime / 1000;    

            });

        };

        async setCamera({cam=-1, state="play"}) {

            this.removeCueAll();
            var currTime = this.videoElem.currentTime;
            this.cam = cam;
            this._regenVideoElement();
            this._genTrackCues();
            [this.videoElem.src, this.realCam] = this.videoData.getVideoPath({is_outline:config.is_outline, is_60fps:config.is_60fps, cam:cam});
            this.videoElem.load();
            this.speed = this.player.speed;
            this.screen_type = Util.getScreenType(this.realCam);
            this.videoElem.currentTime = currTime;
            if(state == "play") {
                await this.videoElem.play();
            }
            else { // or "pause"
                await this.videoElem.play();
                this.videoElem.pause();
            }

            return "set camera to" + cam;

        };

        /**
         * 指定した時間にビデオをシークする。
         * ビデオをシークする時は必ずラグがあるため、シーク後に確実に実行したい処理はseekendに指定する。
         * シーク -> waitingイベント発火 -(ラグ)-> seekedイベント発火 -> canplayイベント発火 -> playingイベント発火
         * 
         * @param {Object} seektime - シーク時間(ミリ秒)
         * @param {Function} seekend - シーク完了時に実行する関数(seekedイベント)
         * @param {Number} buftime - 一時停止中にシークした後、画面更新のために動画を再生する時間 (ミリ秒 デフォルト：@see BUFTIME_PAUSE 50)
         * @param {Boolean} refresh - 一時停止中にシークした後、画面更新処理を行うかどうか。(デフォルト：true 実行)
         * @param {Boolean} isSameSrc - シーク前に動画のソースに変更があるかどうか。(デフォルト：true 同じ動画ソース内でシーク)
         */
        seek({seektime, seekend, buftime=BUFTIME_PAUSE, refresh=true, isSameSrc=true}) {

            return new Promise((resolve) => {

                var v = $(this.videoElem);
                var isEnd = this.videoElem.ended;
    
                if(seekend && !(this.player.play_state == 'pause' && refresh)) {
                    v.one('seeked', seekend);
                    v.one('seeked', resolve);
                }
    
                if(isEnd) { // ビデオが終端まで再生が終わっている場合、シーク後にplayを実行
                    v.one('canplay', () => { this.videoElem.play(); });
                    v.one('canplay', resolve);
                }

                if(!refresh && isSameSrc && (this.videoElem.currentTime == seektime / 1000)) { // シークしない場合は即時リゾルブ

                    resolve();
                    return "non seek";

                }

                this.videoElem.currentTime = seektime / 1000;
    
                // 一時停止中にseekした場合、画面を更新する
                if(this.player.play_state == 'pause' && refresh && !isEnd) {
                    loading.start();
                    v.one('canplay', () => {
    
                        this.videoElem.play();
                        setTimeout(() => {
    
                            this.videoElem.pause();
                            this.player.movie_screen.refresh();
                            this.player.movie_screen.render_stop();
                            v.one('seeked', seekend);
                            v.one('seeked', resolve);
                            v.one('play', () => { this.player.movie_screen.render_start();});
                            this.videoElem.currentTime = seektime / 1000;
                            loading.stop();
    
                        }, buftime);
    
                    });
                }
    
            });

        };

        removeCueAll() {

            while(this.vttcues.length > 0) {

                this.trackElem.removeCue(this.vttcues.pop());

            }

        };

        addVideoEndHandler(handler) {

            this.videoElem.addEventListener("ended", handler);

        };

        async play() {

            return this.videoElem.play();

        };

        async resume() {

            return this.videoElem.play();

        };

        pause() {

            this.videoElem.pause();

        };

        /**
         * 現在の再生速度を取得する
         */
        get speed() {

            return this.videoElem.playbackRate;

        };

        /**
         * 再生速度を設定する。@see HTMLMediaElement.playbackRate
         */
        set speed(playbackRate) {

            this.videoElem.playbackRate = playbackRate;

        };

        /**
         * 再生速度を通常速度に戻す
         */
        reset_speed() {

            this.videoElem.playbackRate = 1.0;

        };

    }

    class VideoData {

        /**
         * コンストラクタ
         * 
         * @param {String} id 動画ID ex) PartA
         * @param {Scene} scene 初期化済シーンオブジェクト @see g2e.contents.Scene
         * @param {Array} cams カメラ番号(Int)の配列
         * @param {Object} caminfos カメラ情報
         * @param {VideoData} prevVd 自身のひとつ前のビデオ情報
         * @param {VideoData} nextVd 自身のひとつ前のビデオ情報
         */
        constructor({id, scene, cams, caminfos, prevVd, nextVd}) {

            this.id = scene.dir + "/" + id; // シーン内で動画を一意に指定するID
            this.vid = id; // 動画ID
            this.scene = scene; // シーンオブジェクト
            this.cams = cams ? cams : []; // カメラアングルリスト
            this.caminfos = caminfos ? caminfos : {};
            this.cuts = new Map(); // 動画に含まれるカットのMap
            this.cues = new Map(); // 動画に含まれるキューのMap
            this.nextVd = nextVd;
            this.prevVd = prevVd ? prevVd : null;
            if(prevVd) {
                prevVd.nextVd = this;
            }


        }

        /**
         * 動画ファイルのパスを取得する。
         * <シーンディレクトリ名>/movie/<プレフィックス><ファイルID><カメラ番号>.webm
         * プレフィックス… 輪郭線なし(nl_) 60fps(60fps_)
         * カメラ番号はthis.camsに存在しない数字を指定した場合は付加しない。
         * 
         * ex) C01_S00010_1_オープニング/movie/60fps_nl_PartA_2.webm
         * 
         * @param {String} is_outline 輪郭線ON/OFF デフォルト:"mv-outline-on" @see g2e.config 
         * @param {Boolean} is_60fps  60FPS ON/OFF デフォルト:false(無効) @see g2e.config
         * @param {Int} cam カメラ番号
         * 
         * @returns {Array} [src, realCam] src … 動画のパス realCam … 引数のcamが存在する場合はcamと同値、それ以外は-1
         */
        getVideoPath({is_outline="mv-outline-on", is_60fps=false, cam=-1}) {
 
            var dir = PATH_ROOT_CONT + this.scene.dir + "/movie/";
            var vname = this.vid;
            var realCam = -1;

            // カメラ番号
            if($.inArray(cam, this.cams) > -1) {
                vname = vname + "_" + cam;
                realCam = cam;
            }
            else if(this.cams.length > 0) {
                vname = vname + "_" + this.cams[0];
                realCam = this.cams[0];
            }

            // 輪郭線有無
            if(is_outline != "mv-outline-on") {
                vname = "nl_" + vname;
            }

            // 60fps
            if(is_60fps) {
                vname = "60fps_" + vname;
            }

            vname = vname + ".webm";

            return [dir + vname, realCam];

        };

        setCut(id, videoData) {
            this.cuts.set(id, videoData);
        };

        /**
         * キュー時間をキーとしてthis.cuesにCueオブジェクトを登録する。
         * 既に同時間にデータが存在している場合には値をマージする。
         * 値が重複する場合には上書き。
         * 
         * @param {Number} id キューを発火する時間 
         * @param {Cue} cue 
         */
        setCue(id, cue) {

            var newCue = this.cues.get(id);
            if(newCue) {
                var events = newCue.events;
                $.extend(events, cue.events);
                this.cues.set(id, newCue);
            }
            else {
                this.cues.set(id, cue);
            }

        };

        /**
         * 登録されているCueオブジェクトを返却する。
         * 
         * @param {Number} id 
         */
        getCue(id) {

            return this.cues.get(id);

        };

    }

    class Sound {

        /**
         * コンストラクタ
         * 
         * @param {ContentPlayer} player - ContentPlayerオブジェクト
         * @param {SoundData} soundData - SoundDataオブジェクト
         * @param {Number} volume - 音量計算の基準となるマスターボリューム(0～100)。@see volume 
         */
        constructor({player, soundData, volume=100}) {

            this.player = player;
            this.soundData = soundData;
            this.dummy_cont = document.getElementById("non-display-dummy-container");
            this._genSoundElement();
            this.soundElem.src = this.soundData.getSoundPath();
            this._mVol = volume; // マスター音量
            this._vol = 100; // キューから設定された音量
            this.volume = this._vol;
            this.speed = this.player.speed;
            this._end_handlers = new Set();

            this._handler_changespeed = () => { this.speed = this.player.speed; };
            $(this.player).on("change_speed", this._handler_changespeed); // ContentPlayerの再生速度変更イベントを監視

        }

        _genSoundElement() {

            var soundElem = document.createElement("audio");
            $(soundElem).attr("id", this.soundData.uid);

            this.soundElem = soundElem;
            this.soundElem.loop = false;
            this.soundElem.autoplay = false;
            this.soundElem.preload = 'auto';
            this.dummy_cont.appendChild(this.soundElem);

        };

        _removeSoundElement() {

            this.dummy_cont.removeChild(this.soundElem);

        };

        _regenSoundElement() {

            this._removeSoundElement();
            this._genSoundElement();

        };

        addSoundEndHandler(handler) {

            this.soundElem.addEventListener("ended", handler);

        };

        addSoundSeekedHandler(handler) {

            var s = $(this.soundElem);
            s.one('seeked', handler);

        };

        /** 
         * サウンドのボリューム 0～100
         * 実際にaudioエレメントに設定されている値ではなく、
         * Setterで指定した値をそのまま返却する。
         */
        get volume() {

            return this._vol;

        };

        /** 
         * サウンドのボリューム
         * マスター音量からのパーセンテージを指定する。(マスター音量はコンストラクタで指定したコンフィグ音量)
         * ユーザー設定音量 80、volパラメータ 50の場合、audioエレメントに設定されるVolumeは
         * 80 x 0.5 = 40 (* 0.01)
         * となる。
         * 
         * @param {Number} - 音量設定 0～100
         */
        set volume(vol) {

            this._vol = vol;
            this.soundElem.volume = (this._mVol * (vol / 100)) / 100;

        };

        get id() {

            return this.soundData.id;

        };

        get file() {

            return this.soundData.file;

        };

        get currentSec() {

            return this.soundElem.currentTime;

        };

        get currentMSec() {

            return this.soundElem.currentTime * 1000;

        };

                /**
         * 現在の再生速度を取得する
         */
        get speed() {

            return this.soundElem.playbackRate;

        };

        /**
         * 再生速度を設定する。@see HTMLMediaElement.playbackRate
         */
        set speed(playbackRate) {

            this.soundElem.playbackRate = playbackRate;

        };

        /**
         * 再生速度を通常速度に戻す
         */
        reset_speed() {

            this.soundElem.playbackRate = 1.0;

        };

        seek(msec) {

            this.soundElem.currentTime = msec / 1000;

        };

        play() {

            this.speed = this.player.speed;
            this.soundElem.play();

        };

        loop() {

            this.speed = this.player.speed;
            this.soundElem.loop = true;
            this.soundElem.play();

        };

        loopOnPause() {

            this.soundElem.loop = true;
            this.pause();

        };

        resume() {

            this.speed = this.player.speed;
            this.soundElem.play();

        };

        pause() {

            this.soundElem.pause();

        };

        stop() {

            this.soundElem.pause();
            this.soundElem.load();

        };

        addEnd(handler) {

            this.soundElem.addEventListener('ended', handler);
            this._end_handlers.add(handler);

        };

        removeEnd(handler) {

            this.soundElem.removeEventListener('ended', handler);
            this._end_handlers.delete(handler);

        };

        finalize () {

            this.stop();
            $(this.player).off("change_speed", this._handler_changespeed);
            for(const handler of this._end_handlers) {
                this.soundElem.removeEventListener('ended', handler);
            }
            this._end_handlers.clear();
            this._removeSoundElement();

        };

    }

    class SoundData {

        /**
         * コンストラクタ
         * 
         * @param {String} id - (オプション) シーン内で一意なID。省略の場合はfileの値を設定する。
         * @param {Scene} scene - サウンドファイルが属するシーンのSceneオブジェクト
         * @param {String} file - サウンドファイルのファイル名 ex) park.opus
         * @param {String} type - サウンドの種別 'BGM' or 'SE' or 'VOC' or 'LVOC'
         */
        constructor({id=null, scene, file}) {

            this.scene = scene;
            this.id_param = id;
            this.id = id ? id : file;
            this.file = file;

        }

        /**
         * 音声ファイルのパスを取得する。
         * <シーンディレクトリ名>/sound/<ファイル名>
         * ※ファイル形式はopusのみ
         * 
         * ex) C01_S00010_1_オープニング/sound/park.opus
         * 
         */
        getSoundPath() {
 
            return PATH_ROOT_CONT + this.scene.dir + "/sound/" + this.file;

        };

        /**
         * 全シーン間で一意なIDを取得する。(String)
         */
        get uid() {

            return this.scene + '/' + this.id;

        };


    }

    class SoundManager {

        /**
         * コンストラクタ
         * 
         * @param {ContentPlayer} player 
         */
        constructor({player}) {

            this.player = player;
            // シーン中のsoundリソースのリスト Key:音声ID value:Sound
            this.snd_bgms = new Map();
            this.snd_ses = new Map();
            this.snd_vocs = new Map();
            this.snd_lvocs = new Map();

            // 再生/ループ中のSoundのリスト key:Sound value:handler(end)
            this.playing_bgms = new Map();
            this.playing_ses = new Map();
            this.playing_vocs = new Map();
            this.playing_lvocs = new Map();
            this.looping_bgms = new Map();
            this.looping_ses = new Map();
            this.looping_vocs = new Map();
            this.looping_lvocs = new Map(); 

            this.state_pause = false;

        }

        /**
         * 不要になったSoundオブジェクトを破棄する。
         */
        async clearSounds() {
            return "Clear Sounds";
        };

        /**
         * Soundオブジェクトを取得する。生成済みの場合はmapから取得して返却し、そうでない場合は生成する。
         * 
         * @param {Map} map - 生成したSoundオブジェクトの登録先 @see this.snd_bgms
         * @param {Object} data - キューから取得したサウンドひとつ分のデータ
         * @param {Number} volume - コンフィグから読み取ったマスターボリューム 
         */
        _genSound({map, data, volume}) {

            var sd = new SoundData({id:data.id, scene:this.player.cut.scene, file:data.file});
            var sound = map.get(sd.id);
            sound = sound ? sound : new Sound({player:this.player, soundData:sd, volume:volume});

            map.set(sound.id, sound);
            return sound;

        };

        get bgm() {

            return {
                do : ({data}) => {

                    let sound = this._genSound({map:this.snd_bgms, data:data, volume:config.volume_bgm});
                    this._do({isLoop:true, data:data, sound:sound, playing:this.playing_bgms, looping:this.looping_bgms});

                }
            };

        };

        get se() {

            return {
                do : ({data}) => {

                    let sound = this._genSound({map:this.snd_ses, data:data, volume:config.volume_se});
                    this._do({isLoop:false, data:data, sound:sound, playing:this.playing_ses, looping:this.looping_ses});

                }
            };

        };

        get voc() {

            return {
                do : ({data}) => {

                    let sound = this._genSound({map:this.snd_vocs, data:data, volume:config.volume_voice});
                    this._do({isLoop:false, data:data, sound:sound, playing:this.playing_vocs, looping:this.looping_vocs});

                }
            };

        };

        get lvoc() {

            return {
                do : ({data}) => {

                    let sound = this._genSound({map:this.snd_lvocs, data:data, volume:config.volume_lvoice});
                    this._do({isLoop:true, data:data, sound:sound, playing:this.playing_lvocs, looping:this.looping_lvocs});

                }
            };

        };

        _do({isLoop, data, sound, playing, looping}) {

            // action実行
            var action = data.action;
            if(action) {
                this[action]({isLoop:isLoop, sound:sound, playing:playing, looping:looping, seektime:data.seektime});
            }

            // 音量設定
            var vol = data.vol;
            if(vol) {
                sound.volume = vol;
            }

        };

        /**
         * start … 音声の再生をスタートする。既に同名のファイルが再生中の場合は継続する。
         */
        start({sound, playing, seektime}) {

            // console.log("[start]", sound.file, this.player.speed, sound.speed);
            var end = () => { 
                // console.log("[sound end]", sound.id, "act start");
                playing.delete(sound);
            };
            playing.set(sound, end);
            sound.addEnd(end);

            var exec = () => {

                if(this.state_pause) {
                    sound.pause();
                }
                else {
                    sound.play();
                }

            };

            if(seektime) {
                sound.addSoundSeekedHandler(exec);
                sound.seek(seektime);
            }
            else {
                exec();
            }

        };

        /**
         * loop … 音声をループ再生する。startのループ版。
         */
        loop({sound, looping}) {

            // console.log("[loop]", sound.file);
            looping.set(sound, () => {});

            if(this.state_pause) {
                sound.loopOnPause();
            }
            else {
                sound.loop();
            }

        };

        /**
         * pause … 再生中の音声を一時停止する。再開時は停止時点から再生する。
         */
        pause({sound}) {

            // console.log("[pause]", sound.file);
            sound.pause();

        };

        /**
         * stop … 再生中の音声を停止する。再開時は最初から再生する。
         */
        stop({isLoop, sound, playing, looping}) {

            if(isLoop) { // ループ音声は"stop"が指定されてもループ停止処理
                this.loopstop({sound:sound, looping});
            }

            // console.log("[stop]", sound.file);
            playing.delete(sound);
            sound.stop();

        };

        loopstop({sound, looping}) {

            looping.delete(sound);
            sound.stop();

        };

        /**
         * 現在再生中の音声を全て一時停止する。コントローラーの一時停止ボタンなどで使用。
         * resume()で再開。
         */
        pauseAll() {

            var map = this._getAllMap();

            this.state_pause = true;

            for(const sound of map.keys()) {

                sound.pause();

            }

        };

        resumeAll() {

            var map = this._getAllMap();

            this.state_pause = false;

            for(const sound of map.keys()) {

                sound.resume();

            }


        };

        abortAll() {

            this.stopAll(); // 再生中停止＆登録解除
            var map = this._getAllResourceMap();

            for(const [id, sound] of map) {

                sound.finalize();

            }

            this._clearAllResourceMap();

        };

        stopAll() {

            var map = this._getAllMap();

            for(const [sound, handler] of map) {

                sound.removeEnd(handler);
                sound.stop();

            }

            this._clearAllMap();

        };

        /**
         * ループ以外の再生中の音声を全てストップする
         */
        stopAllPlay() {

            var map = this._getAllPlayingMap();

            for(const [sound, handler] of map) {

                sound.removeEnd(handler);
                sound.stop();

            }

            this._clearAllPlaying();

        };

        _getAllResourceMap() {

            return new Map([
                ...this.snd_bgms,
                ...this.snd_ses,
                ...this.snd_vocs,
                ...this.snd_lvocs
            ]);

        };

        _getAllMap() {

            return new Map([
                ...this.playing_bgms,
                ...this.playing_ses,
                ...this.playing_vocs,
                ...this.playing_lvocs,
                ...this.looping_bgms,
                ...this.looping_ses,
                ...this.looping_vocs,
                ...this.looping_lvocs
            ]);

        };

        _getAllPlayingMap() {

            return new Map([
                ...this.playing_bgms,
                ...this.playing_ses,
                ...this.playing_vocs,
                ...this.playing_lvocs
            ]);

        };

        _clearAllResourceMap() {

            this.snd_bgms.clear();
            this.snd_ses.clear();
            this.snd_vocs.clear();
            this.snd_lvocs.clear();

        };

        _clearAllMap() {

            this._clearAllPlaying();
            this._clearAllLooping();

        };

        _clearAllPlaying() {

            this.playing_bgms.clear();
            this.playing_ses.clear();
            this.playing_vocs.clear();
            this.playing_lvocs.clear();

        };

        _clearAllLooping() {

            this.looping_bgms.clear();
            this.looping_ses.clear();
            this.looping_vocs.clear();
            this.looping_lvocs.clear();

        };

        /**
         * 現在再生中の音声のキューデータを取得する(ループを除く)。
         * 各音声のキューデータには現在の再生時間(Element.currentTime)をミリ秒に変換して付加し、
         * 音声のレジューム再生に対応する。
         * 
         * @returns
         */
        getPlayingCueData() {

            var ret = {};

            // snd_bgm
            if(this.playing_bgms.size) {
                ret.snd_bgm = this._getSoundCue({playing:this.playing_bgms});
            }

            // snd_voc
            if(this.playing_vocs) {
                ret.snd_voc = this._getSoundCue({playing:this.playing_vocs});
            }

            // snd_se
            if(this.playing_ses) {
                ret.snd_se = this._getSoundCue({playing:this.playing_ses});
            }

            // snd_lvoc
            if(this.playing_lvocs) {
                ret.snd_lvoc = this._getSoundCue({playing:this.playing_lvocs});
            }

            return ret;

        };

        _getSoundCue({playing}) {

            var ret = [];
            for(const sound of playing.keys()) {

                var scd = {};
                scd.action = 'start';
                scd.seektime = sound.currentMSec;
                scd.file = sound.soundData.file;
                if(sound.soundData.id_param) {
                    scd.id = sound.soundData.id_param;
                }

                ret.push(scd);

            }

            return ret;

        };

        /**
         * Generate sound index map from cue_img
         * @param {String} key cue key e.g. snd_bgm / snd_se
         * @param {Object} cue_img 
         */
        static genSoundIdxMap(key, cue_img) {

            var idxMap = new Map();
            for(const idx in cue_img[key]) {

                var id = cue_img[key][idx].id;
                var file = cue_img[key][idx].file;
                idxMap.set(id ? id : file, idx);

            };

            return idxMap;

        };

        /**
         * Copy sound cue event data from snd_cds to cue_img.
         * @param {Object} cue_img cue events object 
         * @param {Object} snd_cds sound cue events object 
         */
        static overrideSoundCues({cue_img, snd_cds}) {

            for(const key in snd_cds) {

                SoundManager.overrideSoundCue({key:key, cue_img:cue_img, snds:snd_cds[key]});

            };

        };

        /**
         * Override sound cue per event key
         * @param {String} key - event key e.g.'snd_bgm'
         * @param {Object} cue_img @see Cut.cue_img
         * @param {Object} snds @see Cue.events @see Cut.cues
         */
        static overrideSoundCue({key, cue_img, snds}) {

            cue_img[key] = $.isArray(cue_img[key]) ? cue_img[key] : [];

            // cue_img上のインデックスマップを生成
            var idxMap = SoundManager.genSoundIdxMap(key, cue_img);

            // オーバーライド
            for(const cData of snds) {

                var cId = cData.id;
                var cFile = cData.file;
                var cAct = cData.action;
                var cVol = cData.vol;
                var cSeekTime = cData.seektime;

                var cKey = cId ? cId : cFile;
                var data = idxMap.has(cKey) ? cue_img[key][idxMap.get(cKey)] : {};
                
                if("id" in data) {
                    data.id = cId;
                }
                data.file = cFile;

                if(cAct) {
                    data.action = cAct;
                }

                if(cVol) {
                    data.vol = cVol;
                }

                if(!data.vol) {
                    data.vol = 100; // Volumeが空欄の場合
                }

                if(cSeekTime) {
                    data.seektime = cSeekTime;
                }

                if(!idxMap.has(cKey)) {
                    // 新規登録(既存データは更新済)
                    idxMap.set(data.id ? data.id : data.file, cue_img[key].push(data) - 1);
                }

            }

        };

    }

    class Scene {

        /**
         * 
         * @param {Object} param0
         *   - scenario 自身が登録されているScenarioManager
         *   - title シーンのタイトル(String)。
         *   - dir シーンのディレクトリ名。(ゲーム内で一意)
         *   - prevScene 前シーンのSceneオブジェクト。 
         *   - nextScene 次シーンのSceneオブジェクト。
         */
        constructor({scenario, title, dir, prevScene, nextScene}) {

            // メンバー変数
            this.scenario = scenario; // 自身が登録されているScenarioManager
            this.title = title; // シーンのタイトル
            this.dir = dir; // ディレクトリ名(String)
            this.videos = new Map(); // VideoDataのMap(VideoData)
            this.cuts = new Map(); // カットのMap(Cut)
            this.snd_bgms = new Map(); // BGMのMap
            this.snd_ses = new Map(); // SEのMap
            this.snd_vocs = new Map(); // VOICEのMap
            this.snd_lvocs = new Map(); // L.VOICEのMap
            this.reticles = new Map(); // 照準のMap キー:レティクルID 値:レティクルデータ(JSON)
            this.letters = new Map(); // 文字シナリオデータのMap キー：ID 値：データ(JSON)
            this.nextScene = nextScene;
            this.prevScene = prevScene ? prevScene : null;
            if(prevScene) {
                prevScene.nextScene = this;
            }

        }

        get id() {

            return this.dir;

        };

        /**
         * 初期再生時のCutオブジェクトを取得する。
         */
        getFirstCut() {

            return this.cuts.values().next().value; // Cuts(Map)のキーは挿入順

        };

        /**
         * シーン設定ファイルのデータからレティクルのデータを読み込みthis.reticles(Map)に保存する。
         * 
         * @param {JSON} obj_sf シーン設定ファイル読み込みデータ 
         */
        loadReticleData(obj_sf) {

            for(const retId in obj_sf.reticles) {

                this.reticles.set(retId, obj_sf.reticles[retId]);

            }

        };

        loadLettersData(obj_sf) {

            for(const lttrId in obj_sf.letters) {

                this.letters.set(lttrId, obj_sf.letters[lttrId]);

            }

        };


    }

    class Cut {

        /**
         * コンストラクタ
         * 
         * prevCutがnullでない場合、prevCutのnextCutプロパティにthisを設定する。
         * 
         * @param {Object} 
         *   - @param {String} id : カットID
         *   - @param {Scene} scene : Sceneオブジェクト
         *   - @param {VideoData} videoData : VideoDataオブジェクト
         *   - @param {Number} seektime : (紐づく動画ファイル内での)シークタイム(ミリ秒)。 デフォルト値：0
         *   - @param {Number} looptime : seektimeからのループ時間。負値の場合ループしない(ミリ秒)。 デフォルト値：-1
         *   - @param {Cut} prevCut : 前カットのCutオブジェクト
         *   - @param {Cut} nextCut : 次カットのCutオブジェクト 
         *   - @param {Cut} returnCut : 動画の流れを無視してカット再生後に戻るカット
         */
        constructor({id, scene, videoData, seektime=0, looptime=-1, endtime, prevCut, nextCut, next_id, returnCut}) {

            this.id = id; // カットID
            this.scene = scene; // Sceneオブジェクト
            this.videoData = videoData; // VideoDataオブジェクト
            this.seektime = seektime;
            this.looptime = looptime;
            this.nextCut = nextCut;
            this.next_id = next_id;
            this.prevCut = prevCut;
            if(prevCut && (this.id == prevCut.next_id || prevCut.next_id == "_next_stu")) {
                // 前カットの次カットに自身を設定(カットが連続している場合のみ)
                prevCut.nextCut = this;
                prevCut.next_id = this.id;
            }
            this.endtime = endtime ? endtime : (looptime > 0 ? looptime : null);
            this.cues = new Map();
            this.returnCut = returnCut;
            this.cue_img = {}; // 前カットまでに発行されて有効になっているべきキューのイメージ @see Cue.events

        }

    }

    class Cue {

        /**
         * WebVTTキュー情報を格納する。
         * 
         * @param {Number} cue_time // キュー時間 - ミリ秒(動画ファイル内で一意)
         * @param {Object} events // キュー時間に発火されるイベントを収めたオブジェクト
         * @param {Cut} cut // キューが属するカットのCutオブジェクト
         * @param {VideoData} videoData // キューが属する動画のVideoDataオブジェクト
         */
        constructor({
            cue_time,
            events,
            cut,
            videoData
        }) {

            this.cue_time = cue_time; 

            this.events = {};
            for(const key in events) {

                this.events[key] = events[key];

            }

            this.cut = cut;
            this.videoData = videoData;
            
        }

    }

    /**
     * ▽コンストラクタ呼び出し時
     *   設定ファイル(scene.json、timeline.json)を読み込み、Scene、Cut、VideoData、Cueオブジェクトを生成し管理する。
     *   生成された各オブジェクトは相互に紐づくデータにリンクし、持ち回る形で参照する。
     * 
     *   ☆生成される各オブジェクトの概要
     *     Cue - SceneとVideoDataとリンクする。
     *     Cut - SceneとVideoDataとリンクする。また次カットと前カットのCutオブジェクトをリンクする(nextCut/prevCut)。
     *     VideoData - Sceneとリンクする。また1ビデオデータに紐づくCutオブジェクトとCueオブジェクトのMapを保持する。
     *     Scene - 次シーン、前シーンのシーンオブジェクトを持つ。また、シーンに紐づくVideoDataとCutのMapを保持する。
     * 
     *   また、自クラスのメンバーとしてScene、VideoData、Cut全体のMapを保持する。
     */
    class ScenarioManager { 

        /**
         * コンストラクタ
         * 
         * @param {ContentPlayer} player 自身(ScenarioManager)のインスタンスを保持するContentPlayerのインスタンス 
         */
        constructor({player}) {

            // メンバー変数
            this.player = player;
            this.scenes = new Map(); // key:シーンID(フォルダ名) value:Sceneオブジェクト

            // シーンのリスト
            this.loadScenes();

        }

        /**
         * 設定ファイルを読み込みScene,Cut,VideoDataオブジェクトなどを登録する。
         */
        loadScenes() {

            const fs = nodeRequire('fs');
            const dirStory = fs.readdirSync(PATH_ROOT_APP, {withFileTypes:true});

            var prevScene = null; // 前シーン保持変数
            var prevCut = null; // 前カット保持変数
            var prevVd = null; // 前ビデオ保持変数
            var linkCutsMap = new Map(); // 次カットが記載順ではない用のMap
            for(const v of dirStory) {

                if(!v.isDirectory) {
                    continue;
                }

                let path_sf = PATH_ROOT_APP + v.name + "/scenario/scene.json";
                let path_tf = PATH_ROOT_APP + v.name + "/scenario/timeline.json";
                if(!fs.existsSync(path_sf) || !fs.existsSync(path_tf)) {
                    continue;
                }

                // シーン設定ファイル読み込み
                let sf = fs.readFileSync(path_sf, 'utf8');
                let obj_sf = JSON.parse(sf);

                // タイムライン設定ファイル読み込み
                let tf = fs.readFileSync(path_tf, 'utf8');
                let obj_tf = JSON.parse(tf);

                var scene = new Scene({scenario:this, title:obj_sf.title, dir:v.name, prevScene:prevScene});
                scene.loadReticleData(obj_sf);
                scene.loadLettersData(obj_sf);
                this.scenes.set(scene.id, scene);

                // シーンにビデオ、カット、キューのリンクを設定
                for(const mv of obj_tf.movies) {
    
                    var vd = new VideoData({id:mv.id, scene:scene, cams:mv.cams, caminfos:mv.caminfos, prevVd:prevVd});
                    scene.videos.set(vd.id, vd);
    
                    for(const cd of mv.timelines) {
                                
                        // cutオブジェクト
                        var cut = new Cut({
                            id:cd.id, 
                            scene:scene, 
                            videoData:vd, 
                            seektime:cd.seektime,
                            looptime:cd.looptime,
                            endtime:cd.endtime,
                            prevCut:prevCut,
                            next_id:cd.nextid,
                            returnCut:scene.cuts.get(cd.returnid)
                        });
                        
                        // 前カットの次カットに自身を設定できない場合(連続していないカットの場合など)
                        if(cut.prevCut && !cut.prevCut.nextCut) {
                            var linkCuts = linkCutsMap.get(cut.prevCut.next_id);
                            linkCuts = linkCuts ? linkCuts : [];
                            linkCuts.push(cut.prevCut);
                            linkCutsMap.set(cut.prevCut.next_id, linkCuts);
                        }

                        // previdが指定されている場合
                        if(cd.previd) {
                            cut.prevCut = scene.cuts.get(cd.previd);
                        }

                        // 次カット未登録のCutオブジェクトに次カットをセット
                        if(linkCutsMap.has(cut.id)) {
                            var linkCuts = linkCutsMap.get(cut.id);
                            for(const lcut of linkCuts) {
                                lcut.nextCut = cut;
                            }
                        }

                        // 各オブジェクトにカットを登録
                        vd.setCut(cut.id, cut);
                        scene.cuts.set(cut.id, cut);

                        //// Cue生成
                        var tmp_ctms = [];
                        // cutから生成されるcue
                        var cue_cs = new Cue({cue_time:cd.seektime, events:this._getCutStartEvent(cd), cut:cut, videoData:vd});
                        vd.setCue(cue_cs.cue_time, cue_cs);
                        tmp_ctms.push(cue_cs.cue_time);

                        if(cd.endtime) {
                            var cue_ce = new Cue({cue_time:cd.endtime, events:this._getCutEndEvent(cd), cut:cut, videoData:vd});
                            vd.setCue(cue_ce.cue_time, cue_ce);
                            tmp_ctms.push(cue_ce.cue_time);
                        }

                        // cuesプロパティ
                        for(const key in cd.cues) {

                            var ctime = parseInt(key);
                            var cue = new Cue({cue_time:ctime, events:cd.cues[ctime], cut:cut, videoData:vd});
                            vd.setCue(cue.cue_time, cue);
                            tmp_ctms.push(cue.cue_time);
    
                        }

                        // Cutそれぞれに属するCueを設定
                        tmp_ctms.sort(function(a, b){ return a - b; }); // Cut時間順にソート(※VideoData内は挿入順のまま)
                        for(const ctime of tmp_ctms) {

                            cut.cues.set(ctime, vd.getCue(ctime));

                        }
    
                        // 前カットセット(次ループ用)
                        prevCut = cut;
    
                    }

                    // 前ビデオセット(次ループ用)
                    prevVd = vd;
       
                }

                // シーン内の最初のカットに'stu_start'キューを生成
                var fVd = scene.videos.values().next().value;
                var fCut = scene.getFirstCut();
                var stuCue = new Cue({cue_time:0, events:this._getSceneStartEvent(scene), cut:fCut, videoData:fVd});
                fVd.setCue(stuCue.cue_time, stuCue); // vd内で既存キューにマージ
                fCut.cues.set(stuCue.cue_time, fVd.getCue(stuCue.cue_time));
    
                // 前シーンセット(次ループ用)
                prevScene = scene;

            }

            // 各カットのキュー再現データを生成
            this._genSnapshotCues();

        };

        /**
         * 最初のシーン(シチュエーション)を返却する。
         * 
         * @returns {Scene}
         */
        getFirstScene() {

            return this.scenes.values().next().value;  // Scenes(Map)のキーは挿入順

        };

        /**
         * タイムラインのカット頭データからCueイベントデータを生成する。
         * 
         * - cut_start
         * - loop_start
         * - playback_mode
         * 
         * @param {Object} cd JSONから読み取ったtimelinesの各カット頭のデータオブジェクト
         */
        _getCutStartEvent(cd) {

            var ret = {};

            ret.cut_start = cd.id;

            if(cd.looptime) {

                ret.loop_start = cd.looptime;

            }

            ret.playback_mode = cd.playback_mode ? cd.playback_mode : "normal";

            return ret;

        };

        /**
         * タイムラインのカット尻データからCueイベントデータを生成する。
         * 
         * - jump_to
         * 
         * @param {Object} cd JSONから読み取ったtimelinesの各カット頭のデータオブジェクト
         */
        _getCutEndEvent(cd) {

            var ret = {};

            if(cd.returnid) {
                ret.back_to = cd.returnid;
            }

            return ret;

        };

        /**
         * Sceneオブジェクトから'stu_start'イベントを含むCueイベントデータを生成する。
         * 
         * @param {Scene} scene 
         */
        _getSceneStartEvent(scene) {

            var ret = {};
            ret.stu_start = scene.id;

            return ret;

        };

        /**
         * シーン内の各カットにキューのスナップショットイメージ(cue_img)を生成して登録する。
         * スナップショットはシーン単位のため、シーン最初のカットのcue_imgは必ず空オブジェクトとなる。
         */
        _genSnapshotCues() {

            for(const scene of this.scenes.values()) {

                var cue_img = null;
                for(const cut of scene.cuts.values()) {

                    if(cut.returnCut) {
                        this._setCutSnapshotCue(cut, cue_img); // 連続していないカット(インタラクティブモードなど)
                    }
                    else {
                        cue_img = this._setCutSnapshotCue(cut, cue_img);
                    }

                };

            }

            // reverse
            this._overrideCueimgRev();

        };

        /**
         * 指定したcut.cue_imgに指定したcue_imgをディープコピーする。
         * また、cue_imgにcut内の全てのキューの内、カット頭へのジャンプに必要なキューをオーバーライドしたものを返却する。
         * 
         * @param {Cut} cut cue_img設定対象のカットのCutオブジェクト
         * @param {Object} cue_img 設定するキューイメージ
         * @returns {Object} 設定対象のカットのキューを含めたキューイメージ(次カット設定用)
         */
        _setCutSnapshotCue(cut, cue_img = {}) {

            // cue_imgのディープコピーをCut.cue_imgにセット
            $.extend(true, cut.cue_img, cue_img);
            
            // 現カットから次カットに設定するキューイメージを生成
            return this._updateCueImages({cut:cut, cue_img:$.extend(true, {}, cue_img)});

        };

        /**
         * カット内キューをオーバーライドし、
         * カット頭のキューイメージには不要なキューを削除する。
         */
        _updateCueImages({cue_img, cut}) {

            cue_img = this.updateCueImages({cue_img:cue_img, cut:cut});
            delete cue_img.stu_start;
            delete cue_img.cut_start;
            delete cue_img.loop_start;
            delete cue_img.snd_voc;
            delete cue_img.snd_se;
            delete cue_img.playback_mode;
            delete cue_img.effect_glow_button;
            delete cue_img.show_reticle;

            return cue_img;

        };

        /**
         * 指定したキューデータにCut内のキューをキュー時間(max)を上限に上書き更新する。
         * ※snd_seとsnd_vocキューは実行時にタイミングを調整すること。
         * 
         * @param {Object} cue_img 結合するキューのスナップショット @see Cut.cue_img
         * @param {Cut} cut キューを結合するカットのCutオブジェクト @see Cut.cues
         * @param {Number} max カット内のキューの内結合するキュー時間の上限(未指定の場合全てのキューを結合) 
         */
        updateCueImages({cue_img, cut, max=Number.MAX_SAFE_INTEGER}) {

            for(const [ctime, cue] of cut.cues) {

                if(ctime > max) {
                    break;
                }

                for(const key in cue.events) {
    
                    // stu_start => 無視

                    if(key == 'cut_start') {

                        cue_img[key] = cue.events[key];

                    }
                    
                    // jump_to => 無視
                    // back_to => 無視
                    
                    if(key == 'loop_start') {

                        cue_img[key] = cue.events[key];

                    }

                    // loop_stop => 無視
                    
                    // text_start => 無視(sessionStorageに保存したデータから画面遷移前の状態を再現)

                    if(key == "snd_bgm" || key == "snd_lvoc" || key == "snd_voc" || key == "snd_se") {

                        SoundManager.overrideSoundCue({key:key, cue_img:cue_img, snds:cue.events[key]});

                    }

                    // effect_fade_black => ※未実装。長時間暗転するケースがあった場合に実装する。

                    // effect_glow_button
                    if(key == "effect_glow_button") {

                        cue_img[key] = $.extend(true, [], cue.events[key]);

                    }

                    // playback_mode
                    if(key == 'playback_mode') {

                        cue_img[key] = cue.events[key];

                    }
                
                    if(key == "show_reticle") {

                        cue_img[key] = cue.events[key];

                    }

                }
    
            };

            return cue_img;

        };

        _overrideCueimgRev() {

            var rScenes = Array.from(this.scenes.values()).reverse();
            for(const scene of rScenes) {

                var rCuts = Array.from(scene.cuts.values()).reverse();
                var prev_obj = {};
                for(const cut of rCuts) {

                    // カット内のキューを処理
                    prev_obj = this._overrideRevByCut({cut:cut, prev_obj:prev_obj});

                }

            }

        };

        // カット内のキューを処理
        _overrideRevByCut({cut, prev_obj}) {

            var cue_img = cut.cue_img;
            // 上書き用OBJからcue_img
            for(const key in prev_obj) {

                for(const pData of prev_obj[key]) {

                    var pId = pData.id;
                    var pFile = pData.file;
                    var pKey = pId ? pId : pFile;
                    var idxMap = SoundManager.genSoundIdxMap(key, cue_img);
    
                    if(!idxMap.has(pKey)) { // 同IDの登録があったら上書きしない
    
                        var data = {};
                        if("id" in data) {
                            data.id = pId;
                        }                
                        data.file = pFile;
                        data.action = 'stop';
    
                        cue_img[key] = cue_img[key] || [];
                        idxMap.set(data.id ? data.id : data.file, cue_img[key].push(data) - 1);
    
                    }
    
                }
    
            }

            // 自カットCueからcue_img
            for(const cue of cut.cues.values()) {

                for(const key in cue.events) {

                    // LoopSound
                    if(key == "snd_bgm" || key == "snd_lvoc") {

                        prev_obj[key] = prev_obj[key] || [];
                        var idxMap = SoundManager.genSoundIdxMap(key, cue_img);
                        var pIdxMap = SoundManager.genSoundIdxMap(key, prev_obj);

                        for(const cData of cue.events[key]) {

                            var cId = cData.id;
                            var cFile = cData.file;
                            var cKey = cId ? cId : cFile;
                            var data = {};
                            if("id" in data) {
                                data.id = cId;
                            }                
                            data.file = cFile;
                            data.action = 'stop';

                            // カット内cue_img更新
                            if(!idxMap.has(cKey)) { // 同IDの登録があったら上書きしない

                                cue_img[key] = cue_img[key] || [];
                                idxMap.set(data.id ? data.id : data.file, cue_img[key].push(data) - 1);

                            }     
            
                            // 前カット用にcue_imgを保存
                            if(!pIdxMap.has(cKey)) {

                                pIdxMap.set(data.id ? data.id : data.file, prev_obj[key].push($.extend(true, {}, data)) - 1);

                            }

                        }

                    }

                }

            }

            return prev_obj;

        };

    }

    /**
     * コンテンツの再生を管理する
     */
    class ContentPlayer { 

        constructor() {

            // メンバー変数
            this.scenario = null; // シナリオマネージャー
            this.isLoaded = false; // 設定ファイルが読み込み完了しているか
            this.video = null; // loadScenario実行で初期設定する
            this.scene = null; // 現在再生中のシーン(シチュエーション)
            this.cut = null; // 現在再生中のカット
            this.playback_mode = "normal"; // 再生モード 通常:"normal" ループ:"loop" インタラクティブモード："loop_int"
            this.play_state = "play"; // 再生状態 再生(デフォルト):"play" 一時停止:"pause"
            this.cam = -1; // UIで選択中のカメラ番号。コントローラー操作からのみ変更し、ビデオイベントでは切替しない(アングルが存在しない場合など)。
            this.isAuto = false; // Autoモードが有効かどうか true(有効) デフォルト:false
            this.isSkip = false; // Skipモードが有効かどうか true(有効) デフォルト:false
            this._speed = 1.0; // 再生速度。デフォルト:1.0 HTMLMediaElementと同じ値

            this.screen_type_now = null; // '2d' or '3d' @see Video
            this.movie_screen = null; // Screen2D or Screen3D
            this._scrn2DIns = null;
            this._scrn3DIns = null;
            this.screenUI = new ScreenUI({canvas_id:"canvas-ui"});

            this.sound_manager = new SoundManager({player:this}); // サウンドデータはSceneとSoundManagerが保持

            this.letters_manager = new LettersManager({player:this});

            this.reticle_maneger = new ReticleManager({player:this});
            this.reticles = []; // 現在表示中のReticleインスタンスのリスト

            // コントローラーのボタンインスタンスのリスト (Button/ToggleButton/ToggleGroup)
            // 外部(ボタン生成側)で初期化 @see g2e.scenario_view
            this.gc_buttons = new Map(); 

            this.loop_manager = new LoopManager({player:this});

            this.cue_tm_stack = new Map(); // キューのsetTimeoutのclearidを管理する
            this.seekends = new Map(); // カットシーク後のコールバック関数を管理する

            this._id_cutseek = 0; // シーク処理の一意な実行ID用カウンタ
            this._stack_cutseek = new Set(); // 実行中シーク処理のUIDを格納するSet
            this._cutseek_resolves = []; // シーク処理実行待ちのPromiseのresolve関数のリスト

            this.resume_cue = null; // レジュームする際に実行するキュー(現在時間以降のキューは含まない) @see Cue

            this.is_ui_visible = true; // UIを表示する(状態)か否か true 表示

        };

        /**
         * シナリオを再生開始する。
         * 
         * @see g2e.contents.ContentPlayer.resume_from_pagemove()
         */
        async start({resume=false} = {}) {

            if(!resume) { // レジュームでない場合、前再生時のセッション情報はすべて削除

                this._remove_resume_sessionData();

            }

            // 設定ファイルがロードされていない場合、loadScenarioを実行。
            if(!this.isLoaded) {
                await this.loadContents({resume:resume});
            }

            this.init_for_play({resume:resume});

            if(this.play_state == 'play') {
                await this.video.play();
            }
            else {
                this.video.pause();
            }

            return "start playing scenario.";

        };

        /**
         * ページ遷移などをする時に現在の再生状態をセッションに退避した上でポーズする。
         */
        async pause_for_pagemove() {

            g2e.session.SessionManager.setPlayState(this.play_state);
            await this.pause(true);
            g2e.session.SessionManager.setSceneID(this.scene.id);
            g2e.session.SessionManager.setCutID(this.cut.id);
            g2e.session.SessionManager.setCurrentTime(this.video.videoElem.currentTime);
            g2e.session.SessionManager.setCamera(this.cam);
            g2e.session.SessionManager.setPlayingSounds(this.sound_manager.getPlayingCueData());
            this.letters_manager.storeResumeData(); // ポーズが完了していること

            return "save playstate to sessionStorage";

        };

        async loadContents({resume=false}) {

            // 設定ファイル読み込み
            this.loadScenario();

            // await Video Element ready
            await this.readyVideo({resume:resume});

            // スクリーンを初期化&設定
            this.screen_type_now = this.video.screen_type;
            await this.connect_screen(); // ビデオスクリーン
            this.connect_ui_screen(); // UIスクリーン

            this.isLoaded = true;

            return "Contents loaded.";

        };

        loadScenario() {

            this.scenario = new ScenarioManager({player:this});

            return "scenario loadeed.";

        };

        async readyVideo({resume=false}) {

            if(resume) {
                // レジューム(コンフィグ画面からの遷移など)
                this.resume_video_for_pagemove();
            }
            else {
                // 初期再生
                this.scene = this.scenario.getFirstScene();
                this.cut = this.scene.getFirstCut();
                let vd = this.cut.videoData;
                this.video = new Video({videoData:vd, handler_video_end:this.handler_video_end, player:this});
            }

            return "ready for video.";

        };

        init_for_play({resume=false}) {

            if(resume) {

                // 再生状態を設定 play or pause
                this.play_state = g2e.session.SessionManager.getPlayState();

                // カメラ番号(UI)を設定
                this.cam = g2e.session.SessionManager.getCamera();

                // スナップショットキューを実行
                let cue_img = $.extend(true, {}, this.cut.cue_img);
                let currMSec = g2e.session.SessionManager.getCurrentTime() * 1000;
                this.scenario.updateCueImages({cue_img:cue_img, cut:this.cut, max:currMSec});
                SoundManager.overrideSoundCues({cue_img:cue_img, snd_cds:g2e.session.SessionManager.getPlayingSounds()});
                let cue = new Cue({cue_time:currMSec, events:cue_img, cut:this.cut, videoData:this.cut.videoData});

                this.fire_cues({cue_data:cue}); // Cueの実行順は関知しない。必要な場合はPromise実装に変更。
                this.fire_cues_by_manual({vd:this.cut.videoData, seektime:currMSec, latency:CUE_LATENCY});

                var isPause = this.play_state == 'pause';

                // 文字シナリオのレジューム(sessionStorageから再現)
                this.letters_manager.resume_for_pagemove({isPause:isPause});

                // コントローラーの表示状態を設定
                let playButton = this.gc_buttons.get('button_play');
                if(isPause){

                    // 表示：Playボタン
                    playButton.switchTo({id:'button_play'});

                    // pauseの場合はレジューム時にキュー実行
                    this.resume_cue = cue;

                }
                else {

                    // 表示：Pauseボタン
                    playButton.switchTo({id:'button_pause'});

                }

            }

            // カメラアングルの状態を通知(コントローラー初期化)
            this._dispatch_cam_angles();

        };

        /**
         * 一旦他のページに遷移した後、再生状態を復帰する。
         */
        async resume_video_for_pagemove() {

            this.scene = this.scenario.scenes.get(g2e.session.SessionManager.getSceneID());
            this.cut = this.scene.cuts.get(g2e.session.SessionManager.getCutID());
            let vd = this.cut.videoData;
            this.video = new Video({
                videoData:vd,
                handler_video_end:this.handler_video_end,
                player:this,
                cam:g2e.session.SessionManager.getCamera(),
                seektime:g2e.session.SessionManager.getCurrentTime()
            });

            return "resume video from session(page)";

        };

        _remove_resume_sessionData() {

            g2e.session.SessionManager.removeCamera();
            g2e.session.SessionManager.removeSceneID();
            g2e.session.SessionManager.removeCutID();
            g2e.session.SessionManager.removeCurrentTime();
            g2e.session.SessionManager.removePlayState();
            g2e.session.SessionManager.removePlayingSounds();
            g2e.session.SessionManager.removePlayingLetters();

        };

        /**
         * 2Dスクリーンが初期化されていなければ初期化して返却する。this.videoが少なくとも1回は初期化されていること。
         * 
         * @see this.screen2D
         */
        get screen2D() {

            if(!this._scrn2DIns) {

                this._scrn2DIns = new Screen2D({canvas_id:"canvas-movie", video:this.video});

            }

            return this._scrn2DIns;

        };

        /**
         * 3Dスクリーンが初期化されていなければ初期化して返却する。this.videoが少なくとも1回は初期化されていること。
         * 
         * @see this.screen3D
         */
        get screen3D() {

            if(!this._scrn3DIns) {

                this._scrn3DIns = new Screen3D({canvas_id:"canvas-3d", video:this.video});

            }

            return this._scrn3DIns;
            
        };

        /**
         * this.video.screen_typeに従って、スクリーンの接続を行う。
         * スクリーンが初期化されていない場合は初期化を行う。
         */
        async connect_screen() {

            if(this.video.screen_type == "3d") {

                this.screen2D.disable_screen();
                this.screen3D.reset_video(this.video);
                this.screen3D.active_screen();
                this.movie_screen = this._scrn3DIns;

            }
            else {

                this.screen3D.disable_screen();
                this.screen2D.reset_video(this.video);
                this.screen2D.active_screen();
                this.movie_screen = this._scrn2DIns;

            }

            return "screen is fetched.";

        };

        /**
         * UIスクリーンの初期化
         */
        connect_ui_screen() {

            this.screenUI.active_screen();
            this.screenUI.register_event_propagation({targetElem:this.screen3D.canvasElem});

        };

        /**
         * スクリーンの切替を行う。現在のスクリーンとthis.videoのスクリーンタイプが異なる場合に切替処理を行う。
         * 切り替える場合には、先にthis.videoの切替を行ってから呼び出すこと。
         */
        async switch_screen() {

            if(this.screen_type_now == this.video.screen_type) {
                // スクリーンの切り替え必要なし
                this.movie_screen.reset_video(this.video);
                return;
            }

            await this.connect_screen();
            this.screen_type_now = this.video.screen_type;

        };


        /** ビデオイベント & キュー系 */
        handler_video_end = (evt) => {

            this._video_end();

        };

        async _video_end() {

            if(!this._isExecVideoEnd()) {
                // playback_modeによりビデオ終端処理を行わない場合 @see this.playback_mode
                return "video end is off.";
            }

            var nextVd = this.video.videoData.nextVd;
            if(!nextVd){
                this._moveTo_endPage();
                return;
            }

            var sid = this._registerCutSeek({name:"video end"}); // シーク処理開始を登録

            await this._cut_finalizer({nextCut:this.cut.nextCut});

            loading.start();

            if(this.cut.nextCut.scene != this.cut.scene) {
                await this._scene_finalizer({nextScene:this.cut.nextCut.scene});
            }

            await this.video.setVideo({videoData:nextVd, cam:this.cam});
            this.cut = this.cut.nextCut;
            this.scene = this.cut.scene;
            await this.switch_screen(); 
            await this._play({isSameSrc:false});

            loading.stop();
            this._unregisterCutSeek({id:sid, name:"video end"}); // シーク処理完了を登録

            return "viideo is ended.";

        };

        _isExecVideoEnd() {

            if(this.playback_mode == 'normal') {
                return true;
            }
            else {
                return false;
            }

        };

        _moveTo_endPage() {

            g2e.common.Transition.fadeIn({
                duration:1000,
                complete:() => {
                    location.href = "./end-credit.html";
                }
            });

        };

        /**
         * キューデータを解釈し、delayに指定した時間経過後に実行する(setTimeout)。
         * 
         * @param {Cue} cue_data キュー発火時間のCueオブジェクト
         * @param {Number} delay delay指定時間後にCue処理を実行する。ミリ秒。デフォルト：0
         * @returns {Boolean} true:キューを実行した場合 false:キューを実行しなかった場合(一時停止中など)
         */
        fire_cues({cue_data, delay=0}) {

            if(this.play_state == 'pause') { // 一時停止中はキューを発行せず、レジューム時に必要なキューを発行する
                return false;
            }

            var clearid; // シーク処理が走る場合、Deleyで処理が実行されないようにclearTimeout用idを保存。
            var key;
            if((key = "cut_start") in cue_data.events) {

                clearid = setTimeout(this.handler_cut_start, delay, {id:cue_data.events[key]});
                this.cue_tm_stack.set(clearid, key);

            }

            if((key = "stu_start") in cue_data.events) {

                clearid = setTimeout(this.handler_stu_start, delay, {id:cue_data.events[key]});
                this.cue_tm_stack.set(clearid, key);

            }

            if((key = "text_start") in cue_data.events) {

                clearid = setTimeout(this.handler_text_start, delay, cue_data.events[key]);
                this.cue_tm_stack.set(clearid, key);

            }

            if((key = "jump_to") in cue_data.events) {

                clearid = setTimeout(this.handler_jumpCut, delay, {id:cue_data.events[key]});
                this.cue_tm_stack.set(clearid, key);

            }

            if((key = "back_to") in cue_data.events) {

                clearid = setTimeout(this.handler_backCut, delay, {id:cue_data.events[key]});
                this.cue_tm_stack.set(clearid, key);

            }

            if((key = "loop_start") in cue_data.events) {
                
                clearid = setTimeout(this.handler_loop_start, delay, {looptime:cue_data.events[key]});
                this.cue_tm_stack.set(clearid, key);

            }

            if((key = "loop_stop") in cue_data.events) {
                
                clearid = setTimeout(this.handler_loop_stop, delay, cue_data.events[key]);
                this.cue_tm_stack.set(clearid, key);

            }

            if((key = "playback_mode") in cue_data.events) {

                // キューが指定されないカットは自動的に'normal'キューが発行される @see ScenarioManager
                clearid = setTimeout(this.handler_playback_mode, delay, {mode:cue_data.events[key]});
                this.cue_tm_stack.set(clearid, key);

            }

            if((key = "show_reticle") in cue_data.events) {

                clearid = setTimeout(this._handler_show_reticles, delay, {retId:cue_data.events[key]});
                this.cue_tm_stack.set(clearid, key);

            }

            if((key = "snd_bgm") in cue_data.events) {

                clearid = setTimeout(this.handler_snd_bgm, delay, {snds:cue_data.events[key]});
                this.cue_tm_stack.set(clearid, key);

            }

            if((key = "snd_se") in cue_data.events) {

                clearid = setTimeout(this.handler_snd_se, delay, {snds:cue_data.events[key]});
                this.cue_tm_stack.set(clearid, key);

            }

            if((key = "snd_voc") in cue_data.events) {

                clearid = setTimeout(this.handler_snd_voc, delay, {snds:cue_data.events[key]});
                this.cue_tm_stack.set(clearid, key);

            }

            if((key = "snd_lvoc") in cue_data.events) {

                clearid = setTimeout(this.handler_snd_lvoc, delay, {snds:cue_data.events[key]});
                this.cue_tm_stack.set(clearid, key);

            }

            if((key = "effect_glow_button") in cue_data.events) {

                clearid = setTimeout(this.handler_effect_glowbutton, delay, cue_data.events[key]);
                this.cue_tm_stack.set(clearid, key);

            }

            if((key = "effect_focus_controller") in cue_data.events) {

                clearid = setTimeout(this.handler_effect_focus_controller, delay, cue_data.events[key]);
                this.cue_tm_stack.set(clearid, key);

            }

            if((key = "effect_disable_button") in cue_data.events) {

                clearid = setTimeout(this.handler_effect_disable_button, delay, cue_data.events[key]);
                this.cue_tm_stack.set(clearid, key);

            }

            if((key = "effect_enable_button") in cue_data.events) {

                clearid = setTimeout(this.handler_effect_enable_button, delay, cue_data.events[key]);                    
                this.cue_tm_stack.set(clearid, key);

            }

            return true;

        };

        /**
         * キューを手動で実行する。指定したVideoDataのseektime起点にlantencyで指定された時間内のキューを手動で実行する。
         * 
         * @param {VideoData} vd Cueを実行するVideoDataオブジェクト
         * @param {Number} seektime ミリ秒。指定時間以降～latencyの間のCueを実行する。
         * @param {Number} latancy ミリ秒。
         */
        fire_cues_by_manual({vd, seektime, latency}) {

            for(const [ctime, cue] of vd.cues ) {

                let max = seektime + latency;
                if(ctime > max) {
                    continue;
                }

                if(seektime <= ctime) {
                    this.fire_cues({cue_data:cue, delay:ctime - seektime});
                }

            }

        };

        /**
         * カットの終了処理を行う。
         * @param {Cut} nextCut
         */
        async _cut_finalizer({nextCut} = {}) {

            // 実行予定のキューを削除
            this._remove_delayCue_all();
            this._remove_seekend_all();

            // Loop停止
            this.loop_manager.stop();

            // 再生中の音声を停止(ループ音声以外)
            this.sound_manager.stopAllPlay();

            // Reticle解除
            this.reticle_maneger.clear();
            this.clear_reticles();

            // 文字シナリオウィンドウ解除
            if(nextCut) {
                // await this.letters_manager.abort_outrange(nextCut.id);
                await this.letters_manager.abort_all();
            }

            // エフェクト解除
            this.clear_effects();

            // カット移動でレジュームキューをクリア
            this.resume_cue = null;

        };

        async _cut_finalizer_on_intaract({nextCut} = {}) {

            // 実行予定のキューを削除
            this._remove_delayCue_all();

            // Loop停止
            this.loop_manager.stop();

            // 文字シナリオウィンドウ解除
            if(nextCut) {
                // await this.letters_manager.abort_outrange(nextCut.id);
                await this.letters_manager.abort_all();
            }
            
        };

        _cut_finalizer_for_loop() {

            // 実行予定のキューを削除
            this._remove_delayCue_all();

        };

        async _scene_finalizer({nextScene} = {}) {

            // シーン内の全ての音声を停止
            this.sound_manager.abortAll();

            if(nextScene) {

                // 文字シナリオウィンドウ解除(シーンはまたがない)
                await this.letters_manager.abort_all();

                // シーンタイトル解除
                $(".scntitle-container").remove();

            }

        };

        /**
         * 現在delayで予約されているsetTimoutのキューをすべて登録解除する。
         */
        _remove_delayCue_all() {

            for(const tmid of this.cue_tm_stack.keys()) {

                clearTimeout(tmid);

            }

            this.cue_tm_stack.clear();

        };

        /** シーク完了時に予約されているイベントハンドラを削除する */
        _remove_seekend_all() {

            for(const [sid, obj] of this.seekends) {

                $(this.video.videoElem).off('seeked', obj.seekend);
                this._unregisterCutSeek({id:sid, name:obj.name}); // シーク処理完了を登録

            }
            this.seekends.clear();

        };

        /**
         * 照準を表示する。現在登録されている照準はクリアし、全登録を行う。
         * @param {*} reticles 
         */
        _show_reticles(reticles) {

            this.clear_reticles();

            for(const reticle of reticles) {

                this.screenUI.addReticle(reticle);

                if(this.screen_type_now == '3d') {
                    this.screen3D.addReticle(reticle);
                }

            }

            this._dispatch_reticle({isActive:true});
            this.reticles = reticles;

        };

        /**
         * 照準を表示するハンドラー @see ContentPlayer._show_reticles
         */
        _handler_show_reticles = ({retId}) => {

            var reticles = this.reticle_maneger.loadReticle({retId:retId, ranges:[this.cut.id]});

            if(reticles.length > 0) {
                this._show_reticles(reticles);
            }


        };

        /**
         * スクリーンから照準を除去する。(表示＆データ)
         */
        clear_reticles() {

            // Clear reticles
            this.screenUI.removeReticleAll();
            this.screen3D.removeReticleAll();

            this._dispatch_reticle({isActive:false});
            this.reticles = [];

        };

        clear_effects() {

            // ボタングロー
            for(const button of this.gc_buttons.values()){
                button.highOff();
            }

            // コントローラー注視
            for(const [key, value] of CSS_FOCUSUI_CLSMAP) {

                $('#' + key).removeClass(value);

            }

            // ボタンのEnable/Disabledをキュー発行前の状態に戻す
            for(const func of this._temp_gcbtn_state.values()) {
                func();
            }
            this._temp_gcbtn_state.clear();

        };

        _init_cut(id) {

            this.cut = this.scene.cuts.get(id);

            if(!this.loop_manager.is_active) { // cut終端扱いでエフェクトを除去(ループ再生中を除く)

                this.clear_effects();

            }

            // セッションにレジューム情報を保存
            g2e.session.SessionManager.setCutID(id);
            g2e.session.SessionManager.setCurrentTime(this.cut.seektime / 1000);
            g2e.session.SessionManager.setCamera(this.cam);

        };

        /**
         * Cue:cut_start
         * - 現在再生中のカットを設定する
         * 
         * @param {String} カット番号
         */
        handler_cut_start = ({id}) => {

            this._init_cut(id);
            this._dispatch_cam_angles();

            $(this).trigger("cut_start", [{id:id}]);
            // console.log("cut changed => " + this.cut.id);

        };

        handler_loop_start = ({looptime}) => {

            this.loop_manager.start_loop({looptime:looptime});

        };

        handler_loop_stop = async (toNext) => {

            await this._waitCutSeek(); // 他シーク処理の完了を待機
            if(toNext) {
                this.nextCut();
            }
            else {
                this.loop_manager.stop();
            }

        };

        handler_playback_mode = ({mode}) => {

            this.playback_mode = mode;

        };

        handler_stu_start = ({id}) => {

            this.scene = this.scenario.scenes.get(id);
            g2e.session.SessionManager.setSceneID(id);
            // console.log("scene changed => " + this.scene.id);

            // シチュタイトル表示(シーン移動で削除される)
            var container = $("<div></div>", {addClass:"scntitle-container"});
            var textSpan = $("<span></span>", {addClass:"scntitle-text"});
            textSpan.text(this.scene.title);
            container.append(textSpan);
            $("#game-background-fix").append(container);
            container.addClass("scntitle-anim");
            container.one("animationend", () => {
                container.remove();
            });

        };

        handler_text_start = ({id, range}) => {

            this.letters_manager.start({id:id, range:range});

        };

        handler_snd_bgm = ({snds}) => {

            for(const data of snds) {

                this.sound_manager.bgm.do({data:data});

            }


        };

        handler_snd_se = ({snds}) => {

            for(const data of snds) {

                this.sound_manager.se.do({data:data});

            }

        };

        handler_snd_voc = ({snds}) => {

            for(const data of snds) {

                this.sound_manager.voc.do({data:data});

            }

        };

        handler_snd_lvoc = ({snds}) => {

            for(const data of snds) {

                this.sound_manager.lvoc.do({data:data});

            }

        };

        handler_fade_black = ({duration}) => {};

        handler_effect_glowbutton = ({range=[], targets, focus_on=true}) => {

            if (range.length == 0 ? true : range.includes(this.cut.id)) {

                for(const id of targets) {

                    this.gc_buttons.get(id).highOn();
    
                }
    
            }
    
            if(focus_on) {

                this.handler_effect_focus_controller({range:range});

            }

        };

        handler_effect_focus_controller = async ({range=[]}) => {

            if(range.length == 0 ? true : range.includes(this.cut.id)) {

                for(const [key, value] of CSS_FOCUSUI_CLSMAP) {
    
                    $('#' + key).addClass(value);
    
                }
    
            }

        };

        _temp_gcbtn_state = new Map(); // ボタンの状態再現関数のマップ id:ボタンID value:関数(Widget.*.getRevert) カット移動毎にclear()
        _save_gcbtn_state = (id, button) => {

            if(this._temp_gcbtn_state.has(id)) {
                return; // 既に保存済み
            }
            this._temp_gcbtn_state.set(id, button.getRevert());

        };

        handler_effect_disable_button = (targets) => {

            var button;
            for(const id of targets) {

                button = this.gc_buttons.get(id);
                this._save_gcbtn_state(id, button);
                button.disableButton();

            }

        };

        handler_effect_enable_button = (targets) => {

            for(const id of targets) {

                button = this.gc_buttons.get(id);
                this._save_gcbtn_state(id, button);
                button.activateButton();

            }

        };

        /** コントローラーから呼び出される系 */
        /**
         * レジューム(プレイボタン)
         */
        async resume() {

            this.play_state = "play";
            if(this.resume_cue) { // 一時停止中にカット移動やConfig画面を開いた場合などに再現キューなどを実行
                this.fire_cues({cue_data:this.resume_cue});
            }
            this.fire_cues_by_manual({vd:this.video.videoData, seektime:this.video.currentMSec, latency:CUE_LATENCY});
            this.video.resume();
            this.loop_manager.resume();
            this.sound_manager.resumeAll();
            this.letters_manager.resume();

        };
        /**
         * ポーズ
         * @param {Boolean} 必要な処理でawaitを行い完了を待つかどうか true(待つ) デフォルト false
         */
        async pause(isWait=false) {

            this._pause_state = {time:this.video.currentMSec, cut:this.cut};
            this.video.pause();
            this._remove_delayCue_all(); // setTimeoutからdelay cueを登録解除
            this.loop_manager.pause(); // ループを一時停止
            this.sound_manager.pauseAll(); // 再生中のサウンドを全て一時停止
            await this.letters_manager.pause(isWait);
            this.play_state = "pause";
            this.video.seek({seektime:this._pause_state.time, refresh:false});

        };

        /** 
         * 一時停止でない場合、現在のビデオを再生する。
         * @param {Boolean} isSameSrc - シーク前に動画のソースに変更があるかどうか。(デフォルト：true 同じ動画ソース内でシーク)
         * @returns {Promise}
         * */
        _play({isSameSrc=true}={}) {
            
            if(this.play_state == 'play') {
                return this.video.play();
            }
            else {
                // 一時停止の場合画面を更新する対応
                return this.video.seek({seektime:this.video.currentMSec, buftime:BUFTIME_PAUSE, isSameSrc:isSameSrc});
            }

        };

        /**
         * 再生状態とVideo要素の状態の不一致を修正する。(ウィンドウ最小化/最大化でHtmlVideoElement.paused==trueになり続けることの対処)
         */
        repairVideoState() {

            this.video.play();
            if(this.play_state == 'pause') {
                this.video.pause();
            }

        };

        /**
         * カット内のキュースナップショットイメージを実行する。
         * @param {Cut} cut @see Cut.cue_img
         */
        async _fireSnapshotCues({cut}) {

            var cue = new Cue({cue_time:cut.seektime, events:cut.cue_img, cut:cut, videoData:cut.videoData});
            if(!this.fire_cues({cue_data:cue})) {
                // 一時停止中はキューが実行されないのでレジュームキューに登録
                this.resume_cue = cue;
            }

            return cue;

        };

        async _waitCutSeek() { // 全てのシーク処理が完了するまで待機する

            if(this._stack_cutseek.size == 0) {
                return "exec ok";
            }
            else {
                return new Promise((resolve) => { this._cutseek_resolves.push(resolve); });
            }

        };

        _isExistCutSeek() {

            return this._stack_cutseek.size > 0;

        };

        _registerCutSeek({name}) { // シーク処理実行を登録する

            var uid = ++this._id_cutseek;
            if(uid >= Number.MAX_SAFE_INTEGER) {
                uid = this._id_cutseek = 1;
            }
            this._stack_cutseek.add(uid);
            return uid;

        };

        _unregisterCutSeek({id, name}) { // シーク処理完了を登録する

            this._stack_cutseek.delete(id);
            if(this._stack_cutseek.size == 0) {

                var resolve = this._cutseek_resolves.shift(); // 多重に登録されている場合FIFO
                if(resolve) {
                    resolve();
                }

            }

        };

        /**
         * 次カットへ遷移
         */
        async nextCut() {

            let nextCut = this.cut.nextCut;
            if(!nextCut) {
                this._moveTo_endPage(); // 動画終了でエンドクレジットへ
                return;
            }

            var sid = this._registerCutSeek({name:"nextCut"}); // シーク処理開始を登録

            await this._cut_finalizer({nextCut:nextCut});
            if(this.cut.scene != nextCut.scene) {
                await this._scene_finalizer({nextScene:nextCut.scene});
            }

            let nextVd = nextCut.videoData;
            if(this.cut.videoData === nextVd) { // シーク先のカット頭、シーク時間+レイテンシの間のキューが実行されない分は手動でキュー発火する。
                // 現在再生中のビデオ内でシーク
                var seekend = async () => {
                    await this._fireSnapshotCues({cut:nextCut});
                    this.fire_cues_by_manual({vd:nextVd, seektime:nextCut.seektime, latency:CUE_LATENCY});
                    this._unregisterCutSeek({id:sid, name:"nextCut"}); // シーク処理完了を登録
                    this.seekends.delete(sid);
                };
                this.seekends.set(sid, {seekend:seekend, name:"nextCut"});
                this.video.seek({seektime:nextCut.seektime, seekend:seekend});
                this.cut = nextCut;
            }
            else {
                loading.start();
                await this.video.setVideo({videoData:nextVd, cam:this.cam});
                this.cut = nextCut;
                this.scene = this.cut.scene;
                this.switch_screen();
                await this._fireSnapshotCues({cut:nextCut});
                await this._play({isSameSrc:false});
                loading.stop();
                this._unregisterCutSeek({id:sid, name:"nextCut"}); // シーク処理完了を登録
            }

        };

        /**
         * 前カットへ遷移
         */
        async prevCut() {

            var sid = this._registerCutSeek({name:"prevCut"}); // シーク処理開始を登録

            let prevCut = this.cut.prevCut;
            await this._cut_finalizer({nextCut:prevCut});

            if(!prevCut) {
                this.video.seek({seektime:0});
                this._unregisterCutSeek({id:sid, name:"prevCut"}); // シーク処理完了を登録
                return;
            }
            if(this.cut.scene != prevCut.scene) {
                await this._scene_finalizer({nextScene:prevCut.scene});
            }

            let prevVd = prevCut.videoData;
            if(this.cut.videoData === prevVd) {
                // 現在再生中のビデオ内でシーク
                var seekend = async () => {
                    await this._fireSnapshotCues({cut:prevCut});
                    if(prevCut.seektime >= CUE_LATENCY) { // 動画の先頭の場合以外、ジャンプしたカット頭のキューはレイテンシの分は手動実行する必要がある。
                        this.fire_cues_by_manual({vd:prevVd, seektime:prevCut.seektime, latency:CUE_LATENCY});
                    }                                    
                    this._unregisterCutSeek({id:sid, name:"prevCut"}); // シーク処理完了を登録
                    this.seekends.delete(sid);
                };
                this.seekends.set(sid, {seekend:seekend, name:"prevCut"});
                this.video.seek({seektime:prevCut.seektime, seekend:seekend});
                this.cut = prevCut;
            }
            else {
                // 別ファイルの最終カットのカット頭へ移動
                loading.start();
                var seekend = async () => {
                    this.cut = prevCut;
                    this.scene = this.cut.scene;
                    this.switch_screen();
                    await this._fireSnapshotCues({cut:prevCut});
                    this.fire_cues_by_manual({vd:prevVd, seektime:prevCut.seektime, latency:CUE_LATENCY});
                    await this._play({isSameSrc:false});
                    loading.stop();
                };
                await this.video.setVideo({videoData:prevVd, seektime:prevCut.seektime, cam:this.cam, seekend:seekend});
                this._unregisterCutSeek({id:sid, name:"prevCut"}); // シーク処理完了を登録
            }

        };

        /**
         * 次のシーンへ遷移する
         */
        async nextScene() {

            var nextScene = this.cut.scene.nextScene;
            if(!nextScene) {
                return;
            }

            var sid = this._registerCutSeek({name:"nextScene"}); // シーク処理開始を登録

            await this._cut_finalizer();
            await this._scene_finalizer({nextScene:nextScene});

            loading.start(); // Loading表示

            var cut = nextScene.getFirstCut();
            var vd = cut.videoData;

            var isSameSrc = vd == this.video.videoData;
            await this.video.setVideo({videoData:vd, cam:this.cam});
            this.scene = nextScene;
            this.cut = cut;
            await this.switch_screen();
            await this._play({isSameSrc:isSameSrc});

            loading.stop(); // Loading停止
            this._unregisterCutSeek({id:sid, name:"nextScene"}); // シーク処理完了を登録

        };

        /**
         * 前のシーンへ遷移する
         */
        async prevScene() {

            var sid = this._registerCutSeek({name:"prevScene"}); // シーク処理開始を登録

            await this._cut_finalizer();
            var prevScene = this.cut.scene.prevScene;
            await this._scene_finalizer({nextScene:prevScene});

            var cut = null;
            var vd = null;
            if(!prevScene) {
                cut = this.cut.scene.getFirstCut();
                prevScene = this.scenario.getFirstScene();
                vd = cut.videoData;
            }
            else {
                cut = prevScene.getFirstCut();
                vd = cut.videoData;
            }

            loading.start(); // Loading表示

            var isSameSrc = vd == this.video.videoData;
            await this.video.setVideo({videoData:vd, cam:this.cam});
            this.scene = prevScene;
            this.cut = cut;
            await this.switch_screen();
            await this._play({isSameSrc:isSameSrc});

            loading.stop(); // Loading停止
            this._unregisterCutSeek({id:sid, name:"prevScene"}); // シーク処理完了を登録

        };

        /**
         * 指定したシークIDのカットにジャンプする。(正方向のみ @see backCut )
         * スナップショットキューは実行しないのでジャンプ先のキューに適切にキューを設定すること。
         * 
         * @param {String} id - シークID 
         */
        async jumpCut({id}) {

            // console.log("jump to " + id);

            let cut = this.cut.scene.cuts.get(id);
            if(!cut) {
                return;
            }

            await this._waitCutSeek(); // 他シーク処理の完了を待機
            var sid = this._registerCutSeek({name:"jumpCut"}); // シーク処理開始を登録

            await this._cut_finalizer_on_intaract({nextCut:cut});
            if(cut.scene != this.cut.scene) {
                await this._scene_finalizer({nextScene:cut.scene});
            }

            let nextVd = cut.videoData;
            if(this.cut.videoData === nextVd) { // シーク先のカット頭、シーク時間+レイテンシの間のキューが実行されない分は手動でキュー発火する。
                // 現在再生中のビデオ内でシーク
                var seekend = () => {
                    this.fire_cues_by_manual({vd:nextVd, seektime:cut.seektime, latency:CUE_LATENCY});
                    this._unregisterCutSeek({id:sid, name:"jumpCut"}); // シーク処理完了を登録
                    this.seekends.delete(sid);
                };
                this.seekends.set(sid, {seekend:seekend, name:"jumpCut"});
                this.video.seek({seektime:cut.seektime, seekend:seekend});
                this.cut = cut;
            }
            else {
                loading.start();
                await this.video.setVideo({videoData:nextVd, cam:this.cam});
                this.cut = cut;
                this.scene = this.cut.scene;
                await this.switch_screen();
                await this._play({isSameSrc:false});
                loading.stop();
                this._unregisterCutSeek({id:sid, name:"jumpCut"}); // シーク処理完了を登録
            }

        };

        handler_jumpCut = ({id}) => {

            this.jumpCut({id:id});

        };

         /**
         * 指定したシークIDのカットにジャンプする。(負方向のみ @see jumpCut )
         * スナップショットキューは実行しないのでジャンプ先のキューに適切にキューを設定すること。
         * 
         * @param {String} id - シークID 
         */
        async backCut({id}) {

            // console.log("back to " + id);

            var sid = this._registerCutSeek({name:"backCut"}); // シーク処理開始を登録

            let cut = this.cut.scene.cuts.get(id);
            await this._cut_finalizer_on_intaract({nextCut:cut});
            if(!cut) {
                this.video.seek({seektime:0});
                this._unregisterCutSeek({id:sid, name:"backCut"}); // シーク処理完了を登録
                return;
            }

            if(cut.scene != this.cut.scene) {
                await this._scene_finalizer({nextScene:cut.scene});
            }

            let backVd = cut.videoData;
            if(this.cut.videoData === backVd) {
                // 現在再生中のビデオ内でシーク
                var seekend = () => {
                    if(cut.seektime >= CUE_LATENCY) { // 動画の先頭の場合以外、ジャンプしたカット頭のキューはレイテンシの分は手動実行する必要がある。
                        this.fire_cues_by_manual({vd:backVd, seektime:cut.seektime, latency:CUE_LATENCY});
                    }            
                    this._unregisterCutSeek({id:sid, name:"backCut"}); // シーク処理完了を登録
                    this.seekends.delete(sid);
                };
                this.seekends.set(sid, {seekend:seekend, name:"backCut"});
                this.video.seek({seektime:cut.seektime, seekend:seekend});
                this.cut = cut;
            }
            else {
                loading.start();
                await this.video.setVideo({videoData:backVd, seektime:cut.seektime, cam:this.cam});
                this.cut = cut;
                this.scene = this.cut.scene;
                await this.switch_screen();
                await this._play({isSameSrc:false});
                loading.stop();
                this._unregisterCutSeek({id:sid, name:"backCut"}); // シーク処理完了を登録
            }

        };

        handler_backCut = ({id}) => {

            this.backCut({id:id});

        };

        /**
         * カットをループする
         * 
         * @param {String} id - ループするカットのシークID 
         */
        async loopCut({id}) {

            // console.log("looping " + id);

            if(this._isExistCutSeek()) {
                return;
            }
            var sid = this._registerCutSeek({name:"loopCut"}); // シーク処理開始を登録

            let cut = this.cut.scene.cuts.get(id);
            this._cut_finalizer_for_loop();
            if(!cut) {
                this.video.seek({seektime:0});
                this._unregisterCutSeek({id:sid, name:"loopCut"}); // シーク処理完了を登録
                return;
            }
            let backVd = cut.videoData;
            if(this.cut.videoData === backVd) {
                // 現在再生中のビデオ内でシーク
                var seekend = () => {
                    if(cut.seektime >= CUE_LATENCY) { // 動画の先頭の場合以外、ジャンプしたカット頭のキューはレイテンシの分は手動実行する必要がある。
                        this.fire_cues_by_manual({vd:backVd, seektime:cut.seektime, latency:CUE_LATENCY});
                    }            
                    this._unregisterCutSeek({id:sid, name:"loopCut"}); // シーク処理完了を登録
                    this.seekends.delete(sid);
                };
                this.seekends.set(sid, {seekend:seekend, name:"loopCut"});
                this.video.seek({seektime:cut.seektime, seekend:seekend});
                this.cut = cut;
            }
            else {
                loading.start();
                await this.video.setVideo({videoData:backVd, seektime:cut.seektime, cam:this.cam});
                this.cut = cut;
                this.scene = this.cut.scene;
                await this.switch_screen();
                await this._play({isSameSrc:false});
                loading.stop();
                this._unregisterCutSeek({id:sid, name:"loopCut"}); // シーク処理完了を登録
            }

        };
        
        /**
         * カメラ切り替え処理を行う(外部呼び出し)。
         * 
         */
        async switchCamera(cam) {

            // スクリーンからレティクル削除
            this.clear_reticles();

            // ローディングを表示
            loading.start();

            var isResume = false;
            if(this.play_state == 'play') {
                this.pause();
                isResume = true;
            }

            await this.video.setCamera({cam:cam, state:this.play_state});
            this.cam = cam;

            // スクリーン切り替え 2D <-> 3D
            await this.switch_screen();

            if(isResume) {
                this.resume();
            }

            // Loadingを解除
            loading.stop();

            this.reticle_maneger.isChange = true;
            let reticles = this.reticle_maneger.getReticles();
            this._show_reticles(reticles);

        };

        /**
         * カメラ切り替えイベントを送出する。(ビデオを再生していてカメラアングルの種類などが切り替わった場合など)
         */
        _dispatch_cam_angles() {

            $(this).trigger("dispatch_cam", [{
                cams:this.cut.videoData.cams,
                cam:this.cam
            }]);

        };

        /**
         * 照準ON/OFFイベントを送出する。
         * 
         * @param {Boolean} isActive ボタンの有効無効 true:有効 false:無効(デフォルト) 
         */
        _dispatch_reticle({isActive=false}) {

            $(this).trigger("dispatch_reticle", [{isActive:isActive}]);

        };

        /**
         * 照準、文字シナリオウィンドウなどの表示/非表示を設定する。
         * 非表示に設定した場合、表示キューが発火されても非表示の状態となる。
         * 
         * @param {Boolean} isVisible true 表示 false 非表示 
         */
        setUIvisible(isVisible) {

            this.is_ui_visible = isVisible;

            this.letters_manager.visible(); // 文字シナリオウィンドウ

            this.switchReticleDisp(isVisible); // 照準

        };

        switchReticleDisp(isVisible) {

            for(const reticle of this.reticles) {
                reticle.setVisible(isVisible);
            }

        };

        /**
         * @param {Boolean} to autoモードON/OFF true:ON 
         */
        toggleAuto(to) {

            this.isAuto = to;
            this.letters_manager.toggleAuto();

        };

        /**
         * @param {Boolean} to skipモードON/OFF true:ON 
         */
        toggleSkip(to) {

            this.isSkip = to;
            this.letters_manager.toggleSkip();
            if(to) {
                this.speed = SKIP_SPEED;
            }
            else {
                this.reset_speed();
            }

        };

        get speed() {

            return this._speed;

        };

        set speed(val) {

            this._speed = val;
            $(this).trigger("change_speed");

        };

        reset_speed() {

            this.speed = 1.0;

        };

    }

    class LoopManager {

        constructor({player}) {

            this.player = player // ContentPlayer
            this.state = "disable";
            this.id_loop_end = -1;
            this.end_funcs = new Map();
            this.looptime = -1;
            this.pause_state = null;

        }

        start_loop = ({looptime}) => {

            this.looptime = looptime;
            this._start_loop({state:'loop'});

        };

        _start_loop({state}) {

            this.stop(); // 実行中のループを削除

            let start = this.player.cut.seektime; // カット頭の時間
            let ctime = this.player.video.currentMSec; // 現在の時間
            let ltime = this.looptime; 
            let etime = (start + ltime - ctime) / this.player.speed; // ループの終端時間

            this.id_loop_end = setTimeout(this._handler_loopend, etime, {id:this.player.cut.id});
            $(this.player).on("change_speed", this._handler_changespeed); // ContentPlayerの再生速度変更イベントを監視

            // this.player.cue_tm_stack.set(this.id_loop_end, "loop end");

            this.state = state;

        };

        _handler_changespeed = () => {

            if(this.state == 'loop' || this.state == 'loop once') {
                this._start_loop({state:this.state});
            }

        };

        /**
         * ループを即座に終了する(カット移動ボタンなど)
         */
        stop() {

            clearTimeout(this.id_loop_end);
            $(this.player).off("change_speed", this._handler_changespeed);
            this.id_loop_end = -1;
            this.end_funcs.clear();
            this.state = "disable";

        };

        /**
         * ループカットを終端まで再生後ループを終了し、カット頭に戻らないように予約する。
         */
        stop_by_end() {

            if(this.state == 'pause') {
                this.pause_state = "loop once";
            }
            else {
                this.state = "loop once";
            }

        };

        pause() {

            clearTimeout(this.id_loop_end);
            this.pause_state = this.state;
            this.state = "pause";

        };

        resume() {

            this._start_loop({state:this.pause_state});

        };

        /**
         * @param {String} id ループカット頭のID
         */
        _handler_loopend = ({id}) => {

            if(this.state == "loop") {
                this.player.loopCut({id:id});
                this.exec_end_funcs();
            }
            else {
                this.exec_end_funcs();
                this.stop();
            }


        };

        exec_end_funcs() {

            for(const [func, data] of this.end_funcs) {

                func(data);

            }

        };

        add_loop_end({handler, data}) {

            this.end_funcs.set(handler, data);

        };
        
        /**
         * 現在ループ再生中かどうかを返却する。
         * @returns {Boolean} true(ループ中)
         */
        get is_active() {

            return this.state == "loop";

        };

    }


    /**
     * 照準クラス
     */
    class Reticle {

        /**
         * コンストラクタ
         * @param {String} id 照準ID
         * @param {String} type 照準タイプ '2d' or '3d'
         * @param {Number} num 照準番号(照準の中心に表示される数字) カット再生時、各処理のキーとしても使用
         * @param {Object} vector 照準の座標。2Dの場合はx,yプロパティを設定したオブジェクト、3Dの場合はTHREE.Vector3オブジェクトを内部で作成する。
         * @param {Number} scale 照準の表示サイズ。デフォルト：1 
         */
        constructor({id, type, num, vector, scale = 1.0}) {

            this.id = id;
            this.num = num;
            this.type = type;
            this.scale = scale;

            this.container = new createjs.Container();
            this.container.scale = this.scale;
            if (type == '2d') {
                this.vector = vector;
                this.container.x = vector.x;
                this.container.y = vector.y;    
            }
            else { // 3D
                this.vector = new THREE.Vector3( vector.x, vector.y, vector.z );
                this.container.x = -1000;
                this.container.y = -1000;    
            }
            this.sprite_sheet = new createjs.SpriteSheet({images: ["images/reticle_anim.png"], frames: [[0,0,140,140,0,70,70],[140,0,140,140,0,70,70],[280,0,140,140,0,70,70],[420,0,140,140,0,70,70],[560,0,140,140,0,70,70],[700,0,140,140,0,70,70],[840,0,140,140,0,70,70],[980,0,140,140,0,70,70],[1120,0,140,140,0,70,70],[1260,0,140,140,0,70,70],[1400,0,140,140,0,70,70],[1540,0,140,140,0,70,70],[1680,0,140,140,0,70,70],[1820,0,140,140,0,70,70],[0,140,140,140,0,70,70],[140,140,140,140,0,70,70],[280,140,140,140,0,70,70],[420,140,140,140,0,70,70],[560,140,140,140,0,70,70],[700,140,140,140,0,70,70],[840,140,140,140,0,70,70],[980,140,140,140,0,70,70],[1120,140,140,140,0,70,70],[1260,140,140,140,0,70,70],[1400,140,140,140,0,70,70],[1540,140,140,140,0,70,70],[1680,140,140,140,0,70,70],[1820,140,140,140,0,70,70],[0,280,140,140,0,70,70],[140,280,140,140,0,70,70],[280,280,140,140,0,70,70],[420,280,140,140,0,70,70],[560,280,140,140,0,70,70],[700,280,140,140,0,70,70],[840,280,140,140,0,70,70],[980,280,140,140,0,70,70],[1120,280,140,140,0,70,70],[1260,280,140,140,0,70,70],[1400,280,140,140,0,70,70],[1540,280,140,140,0,70,70],[1680,280,140,140,0,70,70],[1820,280,140,140,0,70,70],[0,420,140,140,0,70,70],[140,420,140,140,0,70,70],[280,420,140,140,0,70,70],[420,420,140,140,0,70,70],[560,420,140,140,0,70,70],[700,420,140,140,0,70,70],[840,420,140,140,0,70,70],[980,420,140,140,0,70,70],[1120,420,140,140,0,70,70],[1260,420,140,140,0,70,70],[1400,420,140,140,0,70,70],[1540,420,140,140,0,70,70],[1680,420,140,140,0,70,70],[1820,420,140,140,0,70,70],[0,560,140,140,0,70,70],[140,560,140,140,0,70,70],[280,560,140,140,0,70,70],[420,560,140,140,0,70,70],[560,560,140,140,0,70,70],[700,560,140,140,0,70,70],[840,560,140,140,0,70,70],[980,560,140,140,0,70,70],[1120,560,140,140,0,70,70],[1260,560,140,140,0,70,70],[1400,560,140,140,0,70,70],[1540,560,140,140,0,70,70],[1680,560,140,140,0,70,70],[1820,560,140,140,0,70,70],[0,700,140,140,0,70,70],[140,700,140,140,0,70,70],[280,700,140,140,0,70,70],[420,700,140,140,0,70,70],[560,700,140,140,0,70,70],[700,700,140,140,0,70,70],[840,700,140,140,0,70,70],[980,700,140,140,0,70,70],[1120,700,140,140,0,70,70],[1260,700,140,140,0,70,70],[1400,700,140,140,0,70,70],[1540,700,140,140,0,70,70],[1680,700,140,140,0,70,70],[1820,700,140,140,0,70,70],[0,840,140,140,0,70,70],[140,840,140,140,0,70,70],[280,840,140,140,0,70,70],[420,840,140,140,0,70,70],[560,840,140,140,0,70,70],[700,840,140,140,0,70,70],[840,840,140,140,0,70,70],[980,840,140,140,0,70,70],[1120,840,140,140,0,70,70],[1260,840,140,140,0,70,70],[1400,840,140,140,0,70,70],[1540,840,140,140,0,70,70],[1680,840,140,140,0,70,70],[1820,840,140,140,0,70,70],[0,980,140,140,0,70,70],[140,980,140,140,0,70,70],[280,980,140,140,0,70,70],[420,980,140,140,0,70,70],[560,980,140,140,0,70,70],[700,980,140,140,0,70,70],[840,980,140,140,0,70,70],[980,980,140,140,0,70,70],[1120,980,140,140,0,70,70],[1260,980,140,140,0,70,70],[1400,980,140,140,0,70,70],[1540,980,140,140,0,70,70],[1680,980,140,140,0,70,70],[1820,980,140,140,0,70,70],[0,1120,140,140,0,70,70],[140,1120,140,140,0,70,70],[280,1120,140,140,0,70,70],[420,1120,140,140,0,70,70],[560,1120,140,140,0,70,70],[700,1120,140,140,0,70,70],[840,1120,140,140,0,70,70],[980,1120,140,140,0,70,70],[1120,1120,140,140,0,70,70],[1260,1120,140,140,0,70,70],[1400,1120,140,140,0,70,70],[1540,1120,140,140,0,70,70],[1680,1120,140,140,0,70,70],[1820,1120,140,140,0,70,70],[0,1260,140,140,0,70,70],[140,1260,140,140,0,70,70],[280,1260,140,140,0,70,70],[420,1260,140,140,0,70,70],[560,1260,140,140,0,70,70],[700,1260,140,140,0,70,70],[840,1260,140,140,0,70,70],[980,1260,140,140,0,70,70],[1120,1260,140,140,0,70,70],[1260,1260,140,140,0,70,70],[1400,1260,140,140,0,70,70],[1540,1260,140,140,0,70,70],[1680,1260,140,140,0,70,70],[1820,1260,140,140,0,70,70],[0,1400,140,140,0,70,70],[140,1400,140,140,0,70,70],[280,1400,140,140,0,70,70],[420,1400,140,140,0,70,70],[560,1400,140,140,0,70,70],[700,1400,140,140,0,70,70],[840,1400,140,140,0,70,70],[980,1400,140,140,0,70,70],[1120,1400,140,140,0,70,70],[1260,1400,140,140,0,70,70],[1400,1400,140,140,0,70,70],[1540,1400,140,140,0,70,70],[1680,1400,140,140,0,70,70],[1820,1400,140,140,0,70,70],[0,1540,140,140,0,70,70],[140,1540,140,140,0,70,70],[280,1540,140,140,0,70,70],[420,1540,140,140,0,70,70],[560,1540,140,140,0,70,70],[700,1540,140,140,0,70,70],[840,1540,140,140,0,70,70],[980,1540,140,140,0,70,70],[1120,1540,140,140,0,70,70],[1260,1540,140,140,0,70,70],[1400,1540,140,140,0,70,70],[1540,1540,140,140,0,70,70],[1680,1540,140,140,0,70,70],[1820,1540,140,140,0,70,70],[0,1680,140,140,0,70,70],[140,1680,140,140,0,70,70],[280,1680,140,140,0,70,70],[420,1680,140,140,0,70,70],[560,1680,140,140,0,70,70],[700,1680,140,140,0,70,70],[840,1680,140,140,0,70,70],[980,1680,140,140,0,70,70],[1120,1680,140,140,0,70,70],[1260,1680,140,140,0,70,70],[1400,1680,140,140,0,70,70],[1540,1680,140,140,0,70,70],[1680,1680,140,140,0,70,70],[1820,1680,140,140,0,70,70],[0,1820,140,140,0,70,70],[140,1820,140,140,0,70,70],[280,1820,140,140,0,70,70],[420,1820,140,140,0,70,70],[560,1820,140,140,0,70,70],[700,1820,140,140,0,70,70],[840,1820,140,140,0,70,70],[980,1820,140,140,0,70,70],[1120,1820,140,140,0,70,70],[1260,1820,140,140,0,70,70]]});
            this.reticleAnim = new createjs.Sprite(this.sprite_sheet);
            this.reticleAnim.play();

            this.container.addChild(this.reticleAnim);

            this.reticleFrame = new createjs.Bitmap("images/reticle_cap.png");
            this.reticleFrame.x = -80;
            this.reticleFrame.y = -80;
            this.container.addChild(this.reticleFrame);

            this.reticleNum = this._genNumberBitmap(num);
            this.reticleNum.x = -80;
            this.reticleNum.y = -80;
            this.container.addChild(this.reticleNum);


        }

        _genNumberBitmap(num) {

            if(num == 1) {
                return new createjs.Bitmap("images/reticle_view_01.png");
            }
            else if(num == 2) {
                return new createjs.Bitmap("images/reticle_view_02.png");
            }
            else if(num == 3) {
                return new createjs.Bitmap("images/reticle_view_03.png");
            }
            else {
                return null;
            }

        };

        /** 照準のX座標(左上端を0,0として) */
        get x() {
            return this.container.x;
        };

        /**  
         * @param {Number} x 照準のX座標(左上端を0,0として)
         * */
        set x(x) {
            this.container.x = x;
        };

        /** 照準のY座標(左上端を0,0として) */
        get y() {
            return this.container.y;
        };

        /**  
         * @param {Number} y 照準のY座標(左上端を0,0として)
         * */
        set y(y) {
            this.container.y = y;
        };

        /**
         * 照準にイベントハンドラーを登録する。
         * @param {String} events e.g. 'click'
         * @param {Function} handler 
         */
        addEventListener(events, handler) {
            
            this.container.addEventListener(events, handler);

        };

        /**
         * 照準からイベントハンドラーを登録解除する。
         * @param {String} events e.g. 'click'
         * @param {Function} handler 
         */
        removeEventListener(events, handler) {

            this.container.removeEventListener(events, handler);

        };

        _DURATION_CLICK_ANIM = 280; // 定数：クリック時のアニメーション時間(ミリ秒)
        _ALPHA_CLICK_ANIM = 0;
        _SCALE_CLICK_ANIM = 1.4;
        _EASE_CLICK_ANIM = createjs.Ease.sineInOut;

        animateClick({callbacks=[]}) {

            const cn = this.container;
            callbacks.push(this.resetStyle);
            createjs.Tween.get(this.container).to({alpha:this._ALPHA_CLICK_ANIM, scale:cn.scale*this._SCALE_CLICK_ANIM}, this._DURATION_CLICK_ANIM, this._EASE_CLICK_ANIM).call(this._execAnimCall, [callbacks]);

        };

        animateNoClick() {

            createjs.Tween.get(this.container).to({alpha:this._ALPHA_CLICK_ANIM}, this._DURATION_CLICK_ANIM, this._EASE_CLICK_ANIM).call(this.resetStyle);

        }

        resetStyle = () => {

            this.container.alpha = 1;
            this.container.scale = this.scale;

        };

        setVisible(to) {

            this.container.visible = to;

        };

        _execAnimCall = (callbacks) => {

            for(const func of callbacks) {

                func();

            }

        };

    }

    class ReticleInfo {

        /**
         * コンストラクタ
         * 
         * @param {ReticleManager} manager 
         * @param {String} num 照準番号
         * @param {Integer} ptnIdx パターン番号
         * @param {String} sortType 照準のパターンの並び順 'Order' or 'Random'
         * @param {Array} confData 照準データパターンの配列
         */
        constructor({manager, num, ptnIdx=0, sortType, confData}) {

            this.manager = manager;
            this.player = manager.player;
            this.sortType = sortType;
            this.ptnNow = ptnIdx;
            this.num = num;
            this._data = confData;
            this.isChange = true;
            this.cam = -1;

        }

        get data() {

            return this._data[this.ptnNow];

        };

        _isCamChange(cam) {

            return this.cam != cam;

        };

        genInstance() {

            const ptnIdx = this.ptnNow;
            const cam = this.player.video.realCam;

            if(!(this.isChange || this._isCamChange(cam))) {
                return this.ins;
            }

            this.cam = cam;


            let vector = this._data[ptnIdx].cams[String(cam)];
            let scale = vector.scale;
            let seqId = this._data[ptnIdx].seqid;
            let ins = new Reticle({id:this.manager.retId, num:parseInt(this.num), type:Util.getScreenType(cam), vector:vector, scale:scale});
            ins.addEventListener('click', () => { this._handler_click({id:seqId}); });

            this.ins = ins;
            this.isChange = false;

            return ins;

        };

        /**
         * 照準がクリックされた場合のハンドラ
         * 
         * @param {String} id 照準クリック後に遷移するカットのシークID
         */
        _handler_click = ({id}) => {

            // LoopManagerにループ終了処理を通知
            let lm = this.player.loop_manager;
            lm.stop_by_end();
            lm.add_loop_end({handler:this.player.handler_jumpCut, data:{id:id}}); // ジャンプカット

            // 照準の処理とアニメーション
            this.ptn_next();
            this.manager.animateClick(this.num);

        };

        /**
         * 次の照準パターンを設定する。
         */
        ptn_next() {

            if(this.sortType == 'Random') {
                this._ptn_next_rnd();
            }
            else {
                this._ptn_next();
            }

            this.isChange = true;
            this.manager.isChange = true;

        };

        /**
         * sortType = 'Order'
         */
        _ptn_next() {

            const max = this._data.length - 1;
            let next = this.ptnNow + 1;

            if(next > max) {
                next = 0;
            }

            this.ptnNow = next;


        };

        /**
         * sortType = 'Random'
         */
        _ptn_next_rnd() {

            const max = this._data.length;

            this.ptnNow = Math.floor(Math.random() * Math.floor(max));

        };


    }

    class ReticleManager {

        constructor({player}) {

            this.player = player; // ContentPlayerインスタンス
            this.confData = null; // シーン設定ファイルから読み込んだ照準データ(JSON)
            this.retId = null; // 現在のレティクルID
            this.sortType = null; // 照準のPTN表示順
            this.infos = new Map(); // ReticleInfoのリスト(Map) キー:照準番号(String) 値:照準番号で有効な照準情報を格納したReticleInfo
            this.isChange = true;

        }

        clear() {

            this.confData = null;
            this.retId = null;
            this.sortType = null;
            this.infos.clear();
            this.isChange = true;

        };

        /**
         * 照準データをロードし、Reticleインスタンスのリストを返却する。
         * ロードした照準データ、インスタンスは保持し、変更のない場合は再ロードは行わない。
         * 
         * @param {String} retId 照準ID。シーン設定で定義済みの照準IDを指定する。
         * @param {Array} ranges 照準を表示するカットのシークIDを指定する。
         * @returns {Array<Reticle>}
         */
        loadReticle({retId, ranges}) {

            let reticles = [];

            if(!this.isChange) {
                return reticles;
            }

            this.retId = retId;
            this.ranges = ranges;
            this.confData = this.player.cut.scene.reticles.get(retId);
            this.sortType = this.confData.type;
            const retData = this.confData.data;

            for(const num in retData) {

                let info = this.infos.get(num);
                if(!info) {
                    info = new ReticleInfo({manager:this, num:num, sortType:this.sortType, confData:retData[num]});
                    this.infos.set(num, info);
                }
                let ins = info.genInstance();
                ins.setVisible(this.player.is_ui_visible);

                reticles.push(ins);

            }

            this.isChange = false;

            return reticles;

        };

        /**
         * Reticleインスタンスのリストを取得する。
         * カメラを変更する場合はContentPlayerのvideoのカメラ情報を更新後に実行すること。
         */
        getReticles() {

            let reticles = [];

            if(!this.ranges.includes(this.player.cut.id)) {
                return reticles;
            }

            for(const num of this.infos.keys()) {

                let info = this.infos.get(num);
                reticles.push(info.genInstance());

            }

            return reticles;

        };

        /**
         * 照準がクリックされたときのアニメーションを実行する。
         * クリックされた照準 => @see Reticle.animateClick
         * それ以外の照準 => @see Reticle.animateNoClick
         * 
         * @param {String} clickNum クリックされた照準の照準番号 
         */
        animateClick(clickNum) {

            for(const [num, info] of this.infos) {

                if(clickNum == num) {
                    info.ins.animateClick({callbacks:[()=>{this.player.clear_reticles();}]});
                }
                else {
                    info.ins.animateNoClick();
                }

            }

        };

    }

    /**
     * Screenクラス
     * 
     * @abstract
     */
    class Screen {

        constructor({canvas_id}) {

            this.is_init = false;
            this.canvas_id = canvas_id;
            this.canvasElem = document.getElementById(canvas_id);

        }

        /** 
         * 初期化処理。スクリーン初期化の本処理はコンストラクタで行うのではなく、active_screen()など、初期化が必要な処理でinit()を
         * 実行すること。init()内ではis_initフラグをtrueに変更し、以降の処理で初期化の重複を抑制する(active_screenの複数呼び出しなど)。
         * 
         */
        async init() { this.is_init = true };

        /** 
         * スクリーンを無効化する。init()が未実行でも実行できること。
         * @interface 
         * */
        async disable_screen() {};

        /**
         * スクリーンを有効化する。init()が未実行の場合、最初に実行すること。 
         * @interface 
         * */
        async active_screen() {};

        hide() {

            $(this.canvasElem).hide();

        };

        reveal() {

            $(this.canvasElem).show();

        };

        /** @interface */
        async render_start() {};

        /** @interface */
        async render_stop() {};

    }

    /**
     * Screen2Dクラス
     * 
     * 主にcanvas上での動画再生を管理する。
     */
    class Screen2D extends Screen {

        constructor({canvas_id, video}) {

            super({canvas_id:canvas_id});
            this.video = video;
            this.videoElem = video.videoElem;
            this.render_id = null;

        }

        /** @override */
        async init() {

            super.init();
            this.stage_movie = new createjs.Stage(this.canvas_id);

            this.vBuffer = new createjs.VideoBuffer(this.videoElem);
            this.vBitmap = new createjs.Bitmap(this.vBuffer);
            this.stage_movie.addChild(this.vBitmap);

            // console.log("init 2D screen.");

        };

        reset_video(video) {

            this.video = video;
            this.videoElem = video.videoElem;

            if(!this.is_init) {
                this.init();
                return;
            }

            this.stage_movie.removeChild(this.vBitmap);
            this.vBuffer = new createjs.VideoBuffer(this.videoElem);
            this.vBitmap = new createjs.Bitmap(this.vBuffer);
            this.stage_movie.addChild(this.vBitmap);
            
        };

        /**
         * @implements
         */
        async disable_screen() {

            super.hide();
            this.render_stop();

            var ctx = this.canvasElem.getContext('2d');
            ctx.clearRect(0, 0, this.canvasElem.width, this.canvasElem.height);

            // console.log("disable 2D Screen.");

        };

        /**
         * @implements
         */
        async active_screen() {

            if(!this.is_init) {
                this.init();
            }

            super.reveal();
            this.render_start();

            // console.log("activate 2D screen.");

        };

        /**
         * @implements
         */
        async render_start() {

            // createjs.Ticker.addEventListener("tick", this.play_handler);
            this.render();

        };

        /**
         * @implements
         */
        async render_stop() {

            // createjs.Ticker.removeEventListener("tick", this.play_handler);
            if(this.render_id) {
                cancelAnimationFrame(this.render_id);
            }

        };

        // フレーム更新処理(tick)
        // play_handler = (evt) => {

        //     this.refresh();

        // };

        // フレーム更新処理(requestAnimationFrame)
        render = () => {

            this.refresh();
            // this.refresh_with_info(); // Debug code(カット番号、再生時間などを表示)
            this.render_id = requestAnimationFrame(this.render);

        };

        refresh = () => {

            this.stage_movie.update();

        };

        refresh_with_info = () => { // Debug code

            var t = new createjs.Text(
                "scene : " + this.video.player.scene.id + "\n" +
                "cut : " + this.video.player.cut.id + "\n" +
                "currTime : " + new String(this.video.currentMSec).padEnd(24, '0'),
                "30px sans-serif",
                "#2020FF");
            this.stage_movie.addChild(t);
            this.refresh();
            this.stage_movie.removeChild(t);

        };

    }

    /**
     * Screen3Dクラス
     * 
     * 動画を全天球表示する。またUIへ座標の通知などを行う。
     */
    class Screen3D extends Screen {

        constructor({canvas_id, video}) {

            super({canvas_id:canvas_id});
            this.video = video;
            this.videoElem = video.videoElem;
            this.render_id = null;
            this.reticles = new Map();

        }

        /** @override */
        async init() {

            super.init();

            // シーンを作成
            this.canvas_3d = document.getElementById(this.canvas_id);
            this.scene_3d = new THREE.Scene();

            // カメラを作成
            this.width = this.canvasElem.width;
            this.height = this.canvasElem.height;
            this.camera_3d = new THREE.PerspectiveCamera(
                75,
                this.width / this.height,
                1,
                1000
            );
            this.camera_3d.position.set(0, 0, 0);
            this.scene_3d.add(this.camera_3d);

            // 球体の形状を作成 
            this.geometry = new THREE.SphereGeometry(5, 120, 80);
            this.geometry.scale(-1, 1, 1);

            // テクスチャーにvideoを設定
            this.texture = new THREE.VideoTexture(this.videoElem);
            this.texture.minFilter = THREE.LinearFilter;
            this.texture.magFilter = THREE.LinearFilter;
            this.texture.format = THREE.RGBFormat;

            // マテリアルの作成(動画)
            this.material = new THREE.MeshBasicMaterial({
                map: this.texture
            });

            // メッシュにマテリアル(質感)を貼り付けて物体を作成(スクリーン)
            this.sphere = new THREE.Mesh(this.geometry, this.material);

            //　シーンに追加
            this.scene_3d.add(this.sphere);

            // レンダラーを作成
            this.renderer_3d = new THREE.WebGLRenderer({
                canvas: this.canvasElem
            });
            this.renderer_3d.setSize(this.width, this.height);

            // デバイスの判別 & 視点コントロールの初期化
            const pov = this.video.videoData.caminfos[String(this.video.realCam)].pov;
            this.setOrbitControls({povX:pov.x, povY:pov.y, povZ:pov.z});

            // console.log("init 3D screen.");

        };

        reset_video(video) {

            this.video = video;
            this.videoElem = video.videoElem;

            if(!this.is_init) {
                this.init();
                return;
            }

            // カメラの再生成(視点操作中にレンダリング中止された場合の対応)
            this.camera_3d = new THREE.PerspectiveCamera(
                75,
                this.width / this.height,
                1,
                1000
            );
            this.camera_3d.position.set(0, 0, 0);
            this.scene_3d.add(this.camera_3d);
            const pov = this.video.videoData.caminfos[String(this.video.realCam)].pov;
            this.setOrbitControls({povX:pov.x, povY:pov.y, povZ:pov.z});

            this.texture.dispose();
            this.texture = new THREE.VideoTexture(this.videoElem);
            this.texture.minFilter = THREE.LinearFilter;
            this.texture.magFilter = THREE.LinearFilter;
            this.texture.format = THREE.RGBFormat;

            this.material.dispose();
            this.material = new THREE.MeshBasicMaterial({
                map: this.texture
            });

            this.sphere.material = this.material;

            // console.log("reset video(3d)");

        };

        /**
         * 視点操作初期化
         */
        setOrbitControls({povX, povY, povZ}) {

            // パソコン閲覧時マウスドラッグで視点操作する
            this.controls_3d = new THREE.OrbitControls(this.camera_3d, this.canvas_3d);
            this.controls_3d.target.set(
                this.camera_3d.position.x + povX,
                this.camera_3d.position.y + povY,
                this.camera_3d.position.z + povZ
            );
            // 視点操作のイージングをONにする
            this.controls_3d.enableDamping = true;
            // 視点操作のイージングの値
            this.controls_3d.dampingFactor = 0.2;
            // 視点変更の速さ
            this.controls_3d.rotateSpeed = 1.0;
            // ズーム禁止
            this.controls_3d.enableZoom = false;
            // パン操作禁止
            this.controls_3d.elablePan = false;

        }

        /**
         * @implements
         */
        async disable_screen() {

            super.hide();
            this.render_stop();

            // console.log("disable 3D Screen.");
            
        };

        /**
         * @implements
         */
        async active_screen() {

            if(!this.is_init) {
                await this.init();
            }

            super.reveal();
            this.render_start();

            // console.log("activate 3D screen.");

        };

        /**
         * @implements
         */
        async render_start() {

            this.render();
        
        };

        /**
         * @implements
         */
        render_stop() {

            if(this.render_id) {
                cancelAnimationFrame(this.render_id);
            }

        };

        /** フレーム更新処理 */
        render = () => {

            this.refresh();
            this.render_id = requestAnimationFrame(this.render);

        };

        refresh = () => {

            this.setReticleUIPosition();
            this.renderer_3d.render(this.scene_3d, this.camera_3d);
            this.controls_3d.update();

        };

        setReticleUIPosition() {

            for(const reticle of this.reticles.values()) {

                const vec = reticle.vector.clone();
                const project = vec.project(this.camera_3d);
                const sx = this.width / 2 * (+project.x + 1.0);
                const sy = this.height / 2 * (-project.y + 1.0);

                if(project.z < 1.0) {
                    reticle.x = sx;
                    reticle.y = sy;    
                }
                else {
                    reticle.x = -1000;
                    reticle.y = -1000;
                }

            }

        };

        addReticle(reticle) {

            this.reticles.set(reticle.num, reticle);

        };

        removeReticle(reticle) {

            this.reticles.delete(reticle.num);

        };

        removeReticleAll() {

            this.reticles.clear();

        };

    }

    class LettersElements {

        /**
         * コンストラクタ
         * 
         * @param {String} container_id 取得するコンテナ要素のid属性
         * @param {String} bg_id 取得する背景表示要素のid属性
         * @param {String} name_id 取得する名前欄要素のid属性
         * @param {String} text_id 取得するテキスト欄要素のid属性
         * @param {String} canvas_id 取得するcanvas要素のid属性
         * @param {Boolean} is_destory メッセージウィンドウが削除可能かどうか デフォルト：不可(false)
         */
        constructor({container_id, bg_id, name_id, text_id, canvas_id, is_destroy=false}) {

            this._cont_id = container_id;
            this._contelm = $("#" + this._cont_id);
            this._cont_cls_org = this._contelm.attr("class");
            this._cont_cls_base = this._cont_cls_org;
            this._bg_id = bg_id;
            this._bgelm = $("#" + this._bg_id);
            this._bg_cls_org = this._bgelm.attr("class");
            this._bg_cls_base = this._bg_cls_org;
            this._name_id = name_id;
            this._nameelm = $("#" + this._name_id);
            this._name_cls_org = this._nameelm.attr("class");
            this._name_cls_base = this._name_cls_org;
            this._text_id = text_id;
            this._textelm = $("#" + this._text_id);
            this._text_cls_org = this._textelm.attr("class");
            this._text_cls_base = this._text_cls_org;
            this._canvas_id = canvas_id;
            this._canvaselm = $("#" + this._canvas_id);
            this._canvas_cls_org = this._canvaselm.attr("class");
            this._canvas_cls_base = this._canvas_cls_org;
            this._is_destroy = is_destroy;
            this._is_show = false;

        }

        /**
         * HTMLに定義された文字ウィンドウ要素を読み込み、LettersElementsクラスのインスタンスに格納して返却する。
         */
        static genBasicInstance() {

            return new LettersElements({
                container_id:"textscn_container",
                bg_id:"textscn_bg",
                name_id:"textscn_name",
                text_id:"textscn_text",
                canvas_id:"canvas_textscn"
            });

        };

        /**
         * 破棄可能なカスタムLettersElementsインスタンスを取得する。
         * フキダシメッセージなどで使用。
         * 
         * @param {String} id 生成する要素のid属性に指定するプレフィックス
         * @param {String} cls_container コンテナ要素に指定するCSSクラス。未指定の場合はgetBasicInstanceと同様のもの。
         * @param {String} cls_bg 表示欄の背景に指定するCSSクラス。未指定の場合はgetBasicInstanceと同様のもの。
         * @param {String} cls_name 名前表示欄に指定するCSSクラス未指定の場合はgetBasicInstanceと同様のもの。
         * @param {String} cls_text テキスト表示欄に指定するCSSクラス未指定の場合はgetBasicInstanceと同様のもの。
         */
        static genCustomInstance({id, cls_container=CSS_LETTERS_CONTAINER, cls_bg=CSS_LETTERS_BG, cls_name=CSS_LETTERS_NAME, cls_text=CSS_LETTERS_TEXT}) {

            var id_cont = id + "_cont";
            var id_bg = id + "_bg";
            var id_namefld = id + "_namefield";
            var id_textfld = id + "_textfield";
            var id_canvas = id + "_canvastextscn";

            var game = $("#game-background-fix");
            var container = $("<div></div>", {id:id_cont, addClass:cls_container});
            var bg = $("<div></div>", {id:id_bg, addClass:cls_bg});
            var namefld = $("<div></div>", {id:id_namefld, addClass:cls_name});
            var textCont = $("<div></div>", {id:id_textfld, addClass:cls_text});

            container.append(bg);
            container.append(namefld);
            container.append(textCont);

            container.hide();
            game.append(container);

            var canvas = $("<canvas></canvas>", {id:id_canvas}).attr({width:container.width(), height:container.height()});
            container.append(canvas);

            return new LettersElements({
                container_id:id_cont,
                bg_id:id_bg,
                name_id:id_namefld,
                text_id:id_textfld,
                canvas_id:id_canvas,
                is_destory:true
            });

        };

        /** コンテナ要素(jQuery) */
        get container() {

            return this._contelm;

        };

        /** 背景要素(jQuery) */
        get bg() {

            return this._bgelm;

        };

        /** 名前欄要素(jQuery) */
        get name_field() {

            return this._nameelm;

        };

        /** テキスト欄要素(jQuery) */
        get text_field() {

            return this._textelm;

        };

        /** canvas要素ID */
        get canvas_id() {

            return this._canvas_id;

        };

        get isShow() {

            return this._is_show;

        };

        /** 文字ウィンドウを表示状態にする */
        show() {

            this._contelm.show();
            this._is_show = true;

        };

        /** 文字ウィンドウを非表示状態にする */
        hide() {

            this._contelm.hide();
            this._is_show = false;

        };

        /**
         * 文字ウィンドウに対してjQuery.oneを実行する
         * @param args jQuery.oneに同じ 
         */
        one(...args) {

            this._contelm.one(...args);

        };

        /**
         * 文字ウィンドウに対してjQuery.offを実行する
         * @param args jQuery.offに同じ 
         */
        off(...args) {

            this._contelm.off(...args);

        };

        /**
         * 要素のベースクラスを追加する。以降、reset_css()を実行した場合は追加した状態にリセットする。
         * @param {String} classes CSSクラス(複数の場合はスペース区切り) 
         */
        add_container_base(classes) {

            this._cont_cls_base = this._cont_cls_base + (classes ? ' ' + classes : '');
            this._contelm.addClass(classes);

        };

        /** 要素のベースクラスを取得する。 */
        get container_base() {

            return this._cont_cls_base;

        };

        /** 要素のベースクラスを設定する。但し、reset_css()を実行するまでCSSクラスは要素に反映されない。 */
        set container_base(classes) {

            this._cont_cls_base = classes;

        };

        /**
         * 要素のベースクラスを追加する。以降、reset_css()を実行した場合は追加した状態にリセットする。
         * @param {String} classes CSSクラス(複数の場合はスペース区切り) 
         */
        add_bg_base(classes) {

            this._bg_cls_base = this._bg_cls_base + (classes ? ' ' + classes : '');
            this._bgelm.addClass(classes);

        };

        /** 要素のベースクラスを取得する。 */
        get bg_base() {

            return this._bg_cls_base;

        };

        /** 要素のベースクラスを設定する。但し、reset_css()を実行するまでCSSクラスは要素に反映されない。 */
        set bg_base(classes) {

            this._bg_cls_base = classes;

        };

        /**
         * 要素のベースクラスを追加する。以降、reset_css()を実行した場合は追加した状態にリセットする。
         * @param {String} classes CSSクラス(複数の場合はスペース区切り) 
         */
        add_name_base(classes) {

            this._name_cls_base = this._name_cls_base + (classes ? ' ' + classes : '');
            this._nameelm.addClass(classes);

        };

        /** 要素のベースクラスを取得する。 */
        get name_base() {

            return this._name_cls_base;

        };

        /** 要素のベースクラスを設定する。但し、reset_css()を実行するまでCSSクラスは要素に反映されない。 */
        set name_base(classes) {

            this._name_cls_base = classes;

        };

        /**
         * 要素のベースクラスを追加する。以降、reset_css()を実行した場合は追加した状態にリセットする。
         * @param {String} classes CSSクラス(複数の場合はスペース区切り) 
         */
        add_text_base(classes) {

            this._text_cls_base = this._text_cls_base + (classes ? ' ' + classes : '');
            this._textelm.addClass(classes);

        };

        /** 要素のベースクラスを取得する。 */
        get text_base() {

            return this._text_cls_base;

        };

        /** 要素のベースクラスを設定する。但し、reset_css()を実行するまでCSSクラスは要素に反映されない。 */
        set text_base(classes) {

            this._text_cls_base = classes;

        };

        /**
         * 要素のベースクラスを追加する。以降、reset_css()を実行した場合は追加した状態にリセットする。
         * @param {String} classes CSSクラス(複数の場合はスペース区切り) 
         */
        add_canvas_base(classes) {

            this._canvas_cls_base = this._canvas_cls_base + (classes ? ' ' + classes : '');
            this._canvaselm.addClass(classes);

        };

        /** 要素のベースクラスを取得する。 */
        get canvas_base() {

            return this._canvas_cls_base;

        };

        /** 要素のベースクラスを設定する。但し、reset_css()を実行するまでCSSクラスは要素に反映されない。 */
        set canvas_base(classes) {

            this._canvas_cls_base = classes;

        };

        /**
         * CSSクラスをベースクラスの状態に戻す @see add_containter_base
         */
        reset_css() {

            this._contelm.attr("class", this._cont_cls_base);
            this._bgelm.attr("class", this._bg_cls_base);
            this._nameelm.attr("class", this._name_cls_base);
            this._textelm.attr("class", this._text_cls_base);
            this._canvaselm.attr("class", this._canvas_cls_base);

        };

        /**
         * CSSクラスをコンストラクタ呼び出し時の状態に戻す
         */
        restore_css_default() {

            this._cont_cls_base = this._cont_cls_org;
            this._bg_cls_base = this._bg_cls_org;
            this._name_cls_base = this._name_cls_org;
            this._text_cls_base = this._text_cls_org;
            this._canvas_cls_base = this._canvas_cls_org;
            this.reset_css();

        };

        /**
         * 文字ウィンドウを破棄する(生成した吹き出し要素の場合のみ)。
         */
        destroy() {

            if(this._is_destroy) {
                this._contelm.remove();
            }

        };

    }

    class LettersPlayer {

        /**
         * コンストラクタ
         * @param {String} id 文字シナリオID
         * @param {LettersElements} elements 文字ウィンドウHTML Elements
         * @param {LettersManager} manager 文字シナリオ管理クラス
         * @param {String} type 'default' or 'custom' 省略 -> 'default'
         */
        constructor({id, elements, manager, type='default'}) {

            this._init();
            this.manager = manager; // @see LettersManager
            this.id = id; // 文字シナリオID
            this.elements = elements; // 文字ウィンドウエレメント @see LettersElements
            this.type = type; // 'default' or 'custom' 
            this.anim_player = new LettersAnimPlayer({elements:elements});
            this._pids = new Set(); // 再帰呼出などプロセスでの管理が必要な処理の一意なIDのリスト(リストに存在する=有効)
            this._pid_fac = 0; // 一意なプロセスIDのカウンター(Number.MAX_SAFE_INTEGERが最大で0に戻る)

        }

        _gen_pid() {

            var pid = ++this._pid_fac;
            if(pid >= Number.MAX_SAFE_INTEGER) {
                pid = this._pid_fac = 1;
            }
            this._pids.add(pid);
            return pid;

        };

        _pid_is_active(pid) {

            return this._pids.has(pid);

        };

        _remove_pid(pid) {

            this._pids.delete(pid);

        };

        _clear_pids() {

            this._pids.clear();

        };

        get state() {

            return this._state;

        };

        set state(val) {

            this._state = val;

        };

        /**
         * プレイヤーの変数初期化
         */
        _init() {

            this.state = null; // プレイヤーの状態 null(初期化前) or 'ready'(初期化済準備完了) or 'play'(再生中) or 'pause'(一時停止中) or 'waituser'(ページ送り待ち) or 'pageend'(ページ表示終了) or 'pageclosing'(ページ終了中) or 'closing'(終了処理中) or 'end'(再生終了) or 'abort'(破棄済/カスタムウィンドウのみ)
            this._state_resume = null; // レジューム用復帰ステータス退避場所
            this.range = null; // シークIDの配列
            this.pages = null; // 文字シナリオページの配列
            this.page_num = null; // 現在のページ番号(0-origin)
            this.line_num = null; // ページ内のtext配列の配列番号
            this.lastpage_idx = -1; // 最後のtype='text'ページの要素番号。テキストページが一つもない場合は負値
            this._font_color = FONT_COLOR_DEFAULT;
            this._name_elm = null; // 名前表示欄のspanエレメント
            this._text_elm = null; // テキストを表示する最下部のspanエレメント
            this._text_speed = null; // 設定値を上書きする文字スピード
            this._is_text_nowait = null; // 設定値を上書きする文字ノーウェイト
            this._page_closegap = PAGE_CLOSE_GAP; // テキストを表示し終わってページを閉じるまでの時間(balloonのみ)
            this._page_interval = null;  // ページを閉じてから次のページを表示するまでの間隔
            this._line_interval = TEXTLINE_INTVL; // テキストに改行が含まれる場合の行間の待ち時間
            this._disp_text = null; // 表示処理中のテキスト
            this._disp_stack = []; // 表示処理中のテキストの配列
            this._tm_map = new Map(); // setTimeoutの情報を格納したMap key:clearid value: { func:callback関数, delay:delay, start:開始時間 }
            this._stop_requests = []; // 停止処理を解決するresolve関数のリスト
            this._pause_requests = []; // 一時停止要求を解決するresolve関数のリスト
            this._pause_resumes = []; // 一時停止解除を解決するresolve関数のリスト
            this._pause_caller = null; // ポーズ時に実行中だった関数名
            this._pause_callerargs = null; // ポーズ時に実行中の関数の引数

        };

        /**
         * 終了処理(_page_next()/abort())が待機中かどうかを取得する
         */
        get _is_pagestop() {

            return this._stop_requests.length > 0;

        };

        /**
         * 現在実行中の処理が停止を待機するためのPromiseを返却する。
         * @returns {Promise}
         */
        async _request_pagestop() {

            // 一時停止処理をキャンセル
            this._resolve_pause_req({caller_name:this._request_pagestop.name});
            this._resolve_pause();

            if(this.isEnd()) { // 終了処理中
                return "already end sequence.";
            }

            if(this.state == 'waituser') { // 終了OK(ユーザーページ送り待ち)
                return "waiting click window";
            }

            if(this.state == 'pageend') { // 終了OK(1ページ表示完了)
                return "end of page.";
            }

            if(this.state == 'pause') { // 終了OK(ポーズ中)
                return "pausing."
            };

            if(this.page_num >= this.lastpage_idx) { // 残り表示ページなし or actionページのみ
                return "end of textpage";
            }

            // 終了リクエストを登録して待機
            return new Promise((resolve) => {

                var clearid = setTimeout(() => {

                    console.error("Timeout letters aborting."); // Timeout(デッドロック防止)
                    this._resolve_pagestop();

                }, LETTERS_ABORT_TIMEOUT);

                this._stop_requests.push(() => {

                    clearTimeout(clearid);
                    resolve();

                });

            });

        };

        /**
         * 終了待機中のPromiseを全てresolveする。
         */
        _resolve_pagestop() {

            var resolve;
            while(resolve = this._stop_requests.shift()) {
                resolve();
            }

        };

        /**
         * 一時停止要求中かどうかを返却する。
         */
        get _is_req_pause() {

            return this._pause_requests.length > 0;

        };

        /**
         * 現在実行中の表示処理をポーズし、Promiseを返却する。_resolve_pause()でPromiseは解決される。
         * @returns {Promise}
         */
        async _request_pause() {

            if(this._is_pagestop || this.isEnd()) { // 終了要求～終了処理優先。一時停止せず即resolve
                return "[pause]now aborting.";
            }

            if(this.state == 'pause') { // 一時停止済
                return "already pause.";
            }

            var ret = new Promise((resolve) => { this._pause_requests.push(resolve); });
            if(this.state == 'waituser') {

                // ページ送り待ちなので即時一時停止処理
                // this._resolve_pause_req({caller_name:this._textpage_end_handler.name}); // 画面遷移再開は_textpage_endから
                this._resolve_pause_req();

            }
            else {

                // 一時停止リクエストを登録して待機(await)
                return ret;

            }

        };

        /**
         * 一時停止中の処理があるかどうか返却する。resumeメソッドによりPromiseを解決する。@see this._pause_resumes
         */
        get _is_pause() {

            return this._pause_resumes.length > 0; // (== this.state='pause')

        };

        /**
         * 実行中の本処理から呼び出し、一時停止リクエストを解決する。また、this.stateをpauseに変更し、Promiseを返却する。
         * 戻り値のPromiseはresumeメソッドによる解決を待機する(実質的な一時停止処理)。
         * @param {String} 呼び出し元メソッドの名前
         * @param {Array} 呼び出し元メソッドの引数の配列
         * @returns {Promise}
         */
        async _resolve_pause_req({caller_name, caller_args=[]}={}) {

            if(!this._is_req_pause) { // 一時停止要求なし
                return "request is none.";
            }

            if(this._is_pagestop || this.isEnd()) { // 終了要求～終了処理優先。一時停止せず即resolve
                return "[pause]now aborting.";
            }

            if(this.state == 'pause') { // 一時停止済
                return "already pause.";
            }

            this._state_resume = this.state;
            this.state = 'pause';

            this._pauseTimeout(); // setTimeoutを一時停止

            this._remove_window_forward(); // イベントリスナーを解除

            this.anim_player.pause(); // アニメーションを一時停止

            for(const resolve of this._pause_requests) {
                resolve();
            }
            this._pause_requests = [];

            this._pause_caller = caller_name; // ポーズ時実行中メソッドを記録
            this._pause_callerargs = caller_args;
            return new Promise((resolve) => { this._pause_resumes.push(resolve); });

        };

        _resolve_pause_req_force() {

            for(const resolve of this._pause_requests) {
                resolve();
            }
            this._pause_requests = [];

        };

        /**
         * 一時停止している処理(await)のPromiseを解決し、一時停止を解除(resume)する。
         */
        async _resolve_pause() {

            if(!this._is_pause) {
                return;// ポーズしていない                
            }

            if(this.page.type == 'text') { // 一時解除したイベントリスナーを復帰
                this._register_window_forward();
            }

            this._resumeTimeout(); // 一時停止中のsetTimeoutを再開

            this.anim_player.resume(); // アニメーションを再開

            for(const resolve of this._pause_resumes) {
                resolve();
            }
            this._pause_resumes = [];

            this.state = this._state_resume; // 一時停止前のステータスに差し戻し
            this._state_resume = null;
            this._pause_caller = null;
            this._pause_callerargs = null; 

        };

        _error_handler = (err) => {

            if(this.isEnd()) {
                // noop
            }
            else {
                throw err;
            }

        };

        /**
         * 名前欄の最下部のspanエレメントを取得する(存在しない場合は生成)。
         */
        get name_elm() {

            if(!this._name_elm) {
                this._name_elm = $('<span></span>');
                this._name_elm.css('color', this._font_color);
                    this.elements.name_field.append(this._name_elm);
            }

            return this._name_elm;

        };

        /** 名前欄のspanエレメントを設定する。 */
        set name_elm(elm) {

            this._name_elm = elm;

        };

        /**
         * テキストを表示する最下部のspanエレメントを取得する(存在しない場合は生成)。
         */
        get text_elm() {

            if(!this._text_elm) {
                this._text_elm = $('<span></span>');
                this._text_elm.css('color', this._font_color)
                this.elements.text_field.append(this._text_elm);
            }

            return this._text_elm;

        };

        /**
         * テキストを表示する最下部のspanエレメントを設定する。
         */
        set text_elm(elm) {

            this._text_elm = elm;

        };

        /**
         * 文字速度を返却する(0～100)。通常はコンフィグの値を返却し、ページ毎の上書き指定がある場合はそちらを返却する。
         * 上書き指定はページ更新のたびにnullにクリアされる。
         */
        get text_speed() {

            return this._text_speed ? this._text_speed : config.text_speed;

        };

        /**
         * 文字表示の間隔をミリ秒で返却する。最速1文字10ms間隔。最低1文字200ms。
         */
        get text_speed_msec() {

            return TEXTSPEED_HIGH_BIAS * this.text_speed + TEXTSPEED_LOW;

        };

        /**
         * 文字表示の行間の待ち時間をミリ秒で返却する。
         * 文字速度50%で設定値通りの間隔(ミリ秒)、文字速度100%で間隔が0になるような１次関数に従って行間の待ち時間を計算する。
         */
        get textline_interval() {

            var a = -TEXTLINE_INTVL / 50;
            var b = -100 * a;

            return a * this.text_speed + b;

        };

        /**
         * 文字ノーウェイトを返却する(true/false)。通常はコンフィグの値を返却し、ページ毎の上書き指定がある場合はそちらを返却する。
         * type='text'かつSkipモードの時は設定によらずノーウェイト。
         */
        get is_text_nowait() {

            if(this.isSkip && this.page.type == 'text') {
                return true;
            }

            if(this._is_text_nowait == null) {
                return config.is_text_nowait;
            }
            else {
                return this._is_text_nowait;
            }

        };

        /**
         * 現在テキスト表示アニメーション中かを取得する。(true:アニメーション中)
         */
        get is_textanim_now() {

            return this._disp_stack.length > 0;

        };

        /**
         * 現在表示処理中のページを返却する
         * @returns {Object} page
         */
        get page() {

            return this.pages[this.page_num];

        };

        /**
         * HTMLに定義済みの文字ウィンドウを使用したプレイヤーを生成し返却する。
         * idはnullに設定されるので呼び出し側で設定すること。
         * ※シングルトンなどの排他処理は呼び出し側で行うこと。
         */
        static genBasicPlayer({manager}) {

            return new LettersPlayer({id:null, elements:LettersElements.genBasicInstance(), manager:manager});

        };

        /**
         * 文字ウィンドウのHTMLエレメント表示領域に追加し、プレイヤーを生成して返却する。
         */
        static genCustomPlayer({id, manager}) {

            return new LettersPlayer({
                id:id,
                elements:LettersElements.genCustomInstance({id:id, type:'custom'}),
                manager:manager
            });

        };

        /**
         * 指定されたDataに基づいて文字シナリオプレイヤーを初期化する。
         * @param {Object} data 文字シナリオIDに紐づくシナリオ設定データ
         * @param {Array} range 表示範囲を示すカットIDの配列
         * @param {Number} page_num (レジューム用) 画面遷移を伴うポーズ/レジューム時に再開するpagesの要素番号
         * @param {Number} line_num (レジューム用) 画面遷移を伴うポーズ/レジューム時に再開するtextlinesの要素番号
         * @param {Object} conf (レジューム用) 画面遷移時に退避された時点のconfig
         * @param {Object} windowstyle (レジューム用) 画面遷移時に退避された時点のwindowstyle
         * @param {Object} animation (レジューム用) 画面遷移時に退避された時点のアニメーション設定
         */
        loadInit({data, range, page_num=0, line_num=0, conf=null, windowstyle=null, animation=null}) {

            this.range = range ? range : [this.manager.player.cut.id];
            if(!this.range.includes(this.manager.player.cut.id)) {
                this.range.push(this.manager.player.cut.id);
            } 

            this.pages = data.pages;
            this.page_num = page_num;
            this.line_num = line_num;

            this._set_config(conf ? conf : data.config);
            this._set_windowstyle(windowstyle ? windowstyle : data.windowstyle);
            this._init_pageinfos({type:data.type});

            this.anim_player.load(animation ? animation : data.animation);

            this.speed = this.manager.speed;
            this.state = 'ready';

        };

        _init_pageinfos({type}) {

            for(var i=0; i < this.pages.length; i++) { // type='text'の最終ページを検査
                var page = this.pages[i];
                page.type = page.type ? page.type : 'text'; // 未指定の場合はtype='text'に設定
                if(page.type == 'text' || page.type == 'balloon') {
                    page.type = type ? type : page.type; // 各ページのタイプを上書き
                    this.lastpage_idx = i;
                }
            };

        };

        /**
         * 画面遷移を伴うポーズ/レジューム用のデータをプレイヤー毎に生成し、取得する。ポーズが完了した状態で呼び出すこと。
         * @see LettersManager.storeResumeData()
         */
        genResumeData() {

            var ret = {};

            ret.state = this._state_resume; // 画面遷移時点(ポーズ完了時)のプレイヤーステータス
            ret.range = this.range; // 表示範囲
            ret.page_num = this.page_num; // 表示頁数(page_num)
            ret.line_num = this.line_num; // 表示行数(line_num)
            ret.timeout = {}; // setTimeoutのレジュームデータ
            for(const [id, info] of this._tm_map) {

                if(info.type == 'auto') {
                    continue; // autoモードのタイムアウトはレジューム対象外
                }

                ret.timeout[id] = {};
                ret.timeout[id].func_name = info.func.name;
                ret.timeout[id].delay = info.delay;
                ret.timeout[id].elapseTime = info.sw.elapseTime; 

            }
            ret.disp_name = this.elements.name_field.html(); // 名前表示欄(HTML)
            ret.disp_text = this.elements.text_field.html(); // ページ内の表示完了したテキスト(HTML): (例 <span style="color:red">ああああいいいうう</span>)
            ret.remain_text = this._disp_stack.join(""); // 表示処理中の残りのテキスト(string)
            ret.config = this._get_config(); // コンフィグ
            ret.windowstyle = this._get_windowstyle(); // ウィンドウスタイル
            ret.animdata = this.anim_player.animdata; // 現在のアニメーションデータ
            ret.animresume = this.anim_player.resume_data; // 現在再生途中のアニメーションの情報
            if(this._pause_caller) {
                ret.caller_name = this._pause_caller; // ポーズ時実行中メソッド
            }
            ret.caller_args = this._pause_callerargs; // ポーズ時実行中メソッドの引数

            return ret;

        };

        /**
         * 文字シナリオを再生する。一時停止中やレジューム時は途中から再生する(再開する)。
         */
        play() {

            this.state = 'play';
            this._start_pages();

        };

        async pause() {

            await this._request_pause();

        };

        resume() {

            this._resolve_pause();

        };

        /**
         * 画面遷移を伴うレジュームでsessionStorageからロードしたデータを使用して処理を再開する。
         * @param {Object} data レジューム用データ @gee genResumeData() 
         * @param {Object} confData 文字シナリオIDに紐づく設定データ 
         * @param {Boolean} isPause レジューム時に一時停止状態で表示するか true - 一時停止 デフォルト false
         */
        async resume_for_pagemove(data, confData, isPause=false) {

            // プレイヤーを初期化
            this.loadInit({
                data:confData,
                range:data.range,
                page_num:data.page_num,
                line_num:data.line_num,
                conf:data.config,
                windowstyle:data.windowstyle,
                animation:data.animation
            });

            // 名前欄を復帰
            this.elements.name_field.append($(data.disp_name));
            this.name_elm = this.elements.name_field.children("span").last();

            // テキスト表示欄を復帰;
            this.elements.text_field.append($(data.disp_text));
            this.text_elm = this.elements.text_field.children("span").last();
            this._disp_stack = data.remain_text.split("");

            // ステータスと一時停止状態を設定
            this._state_resume = data.state
            this.state = data.state;
            if(isPause) {
                this._pause_requests.push(() => { 
                    //console.log("画面遷移時ポーズ");
                 });
            }

            // 一時解除したイベントリスナーを復帰
            if(this.page.type == 'text') {
                this._register_textpage_end();
                this._register_window_forward();
            }
            else if(this.page.type == 'balloon') {
                this._register_balloonpage_end();
            }

            // ウィンドウ表示
            this.visible();

            // 再生中のアニメーションを復帰
            this.anim_player.resume_for_pagemove(data, confData, isPause);

            // setTimeoutのレジューム
            var tm_info, tm_info_new;
            for(const id in data.timeout) {

                tm_info = data.timeout[id];
                tm_info_new = {
                    func:this[tm_info.func_name],
                    delay:tm_info.delay,
                    sw:new g2e.common.StopWatch({elapseTime:tm_info.elapseTime, speed:this.speed})
                };
                if(isPause) {

                    tm_info_new.sw.pause();
                    this._tm_map.set(setTimeout(()=>{}, 0), tm_info_new);

                }
                else {

                    this._tm_map.set(setTimeout(this[tm_info.func_name], tm_info.delay - tm_info_new.sw.elapseTime), tm_info_new);
    
                }

            }

            // console.log("[再開します]", this.state, data.caller_name, ...data.caller_args);

            // 画面遷移前に実行していたメソッドを呼び出し
            if(data.caller_name == '_disp_textArray') {
                var pid = this._gen_pid(); // プロセスIDを生成
                var toNext = await this[data.caller_name]({...data.caller_args[0], pid:pid});
                this._remove_pid(pid);
                if(toNext) { // レジューム後に即終了リクエストされるケース
                    this._textline_next(this.page.textlines); // テキスト表示後に呼び出し必要 @see _play_textline()
                }
            }
            else if(!data.caller_name) {
                await this._resolve_pause_req();
                this._resolve_pagestop();
            }
            else {
                this[data.caller_name](...data.caller_args);
            }

        };

        show() {

            this.elements.show();

        };

        hide() {

            this.elements.hide();

        };

        /**
         * ContentPlayerのUI表示状態を参照して文字ウィンドウの表示状態を切り替える。
         */
        visible() {

            if(this.manager.player.is_ui_visible) {
                this.show();
            }
            else {
                this.hide();
            }

        };

        /**
         * autoモードを切り替える
         */
        toggleAuto = () => {

            if(this.isAuto && !this.isSkip) {

                if(!this.page) { // 既に表示終了
                    return;
                }

                if(!this.page.disptime && this.state != 'pause' && this.state == 'waituser') {

                    this._register_auto();

                }
                else if(!this.page.disptime && this.state == 'pause' && this._state_resume == 'waituser') {

                    var autoInfo = this._get_autoInfo();
                    autoInfo.sw.pause();
                    this._tm_map.set(setTimeout(()=>{}, 0), autoInfo);

                }

            }
            else {

                this._unregister_auto();

            }

        };

        _autoFunc = () => {

            this.state = 'pageend';
            this._page_next();

        };

        _register_auto() {

            if(this.isAuto && !this.page.disptime && !this.isSkip) {

                this._tm_map.set(this._setTimeout(this._autoFunc, PAGE_INTVL_AUTO / this.speed), this._get_autoInfo());

            }

        };

        _unregister_auto() {

            for(const [id, info] of this._tm_map) { // autoのsetTimeoutを登録解除

                if(info.type == 'auto') {
                    clearTimeout(id);
                    this._tm_map.delete(id);
                }

            }

        };

        _get_autoInfo() {

            return {
                func:this._autoFunc,
                delay:PAGE_INTVL_AUTO,
                type:"auto",
                sw:new g2e.common.StopWatch({speed:this.speed})
            };

        };

        get isAuto() {

            return this.manager.player.isAuto;

        };

        toggleSkip = () => {

            if(this.isSkip) {

                this._unregister_auto(); // autoモードの処理を無効化
                if(!this.page) { // 既に表示終了
                    return;
                }
                if(this.page.type == 'text') {

                    this.anim_player.disabled = true; // アニメーションスキップ

                    if(this.state != 'pause' && this.state == 'waituser') {

                        this._finish_textpage();

                    }
                    else if(this.state == 'pause' && this._state_resume == 'waituser') {
    
                        var skipInfo = this._get_skipInfo(); 
                        skipInfo.sw.pause();
                        this._tm_map.set(setTimeout(()=>{}, 0), skipInfo);
    
                    }
    

                }

            }
            else {

                this.anim_player.disabled = false;
                this.toggleAuto(); // Autoボタンが有効な場合

            }

        };

        _get_skipInfo() {

            return {
                func:this._finish_textpage,
                delay:0,
                sw:new g2e.common.StopWatch({speed:this.speed})
            };

        };

        get isSkip() {

            return this.manager.player.isSkip;

        };

        /**
         * プレイヤーを強制終了する。(固定ウィンドウの場合、再利用可能)
         */
        async abort() {

            if(this.isFinalize()) {
                return "already finalized.";
            }

            await this._request_pagestop();

            try {
                this.finalize(); // 同期的
            } catch (error) {
                // noop
            }

            return "aborted";

        };

        _reStore_default() {

            if(this.type != 'default') {
                return;
            }

            // アニメーションデータの初期化
            this.anim_player.restore_default();

            // フォントカラー
            this._clear_font_colors();

            // 座標
            this._clear_windowcoord();

            // ウィンドウのCSSを初期化
            this.elements.restore_css_default();

            // 変数を初期化
            this._init();

        };

        /**
         * カットがウィンドウ表示範囲内かを返却する。引数が未指定の場合は現在再生中のカットと比較する。
         * @param {String} cid - カットID
         */
        isRange(cid = this.manager.player.cut.id) {

            return this.range.includes(cid);

        };

        _removeAllHandler() { // 全てのイベントハンドラを解除する

            this._clearAllTimeout();

            $(this).off("textlines_end");
            this._remove_window_forward();

        };

        _clearAllTimeout() { // 全てのタイムアウトをキャンセルする

            for(const id of this._tm_map.keys()) {

                clearTimeout(id);

            }
            this._tm_map.clear();
            
        };

        _pauseTimeout() { // 全てのタイムアウトを一旦キャンセルし、delayに残り時間を設定する

            for(const [id, info] of this._tm_map) {

                clearTimeout(id);
                info.sw.pause();

            }

        }

        _resumeTimeout() { // ポーズ中のタイムアウトを再開する

            var tmp = new Map();
            for(const [id, info] of this._tm_map) {

                tmp.set(
                    this._setTimeout(info.func, (info.delay - info.sw.elapseTime) / this.speed),
                    {
                            func:info.func,
                            delay:info.delay,
                            sw:info.sw
                    }
                );
                info.sw.resume();
                this._tm_map.delete(id);

            }

            for(const [id, info] of tmp) {

                this._tm_map.set(id, info);

            }

        };

        /**
         * 現在の再生スピードを計算したsetTimeoutを登録する。
         * @param  {...any} args setTimeoutに指定する引数 
         */
        _setTimeout(...args) {

            args[1] = args[1] / this.speed;
            return setTimeout(...args);

        };

        _changeTimeoutSpeed() {

            var tmp = new Map();
            for(const [id, info] of this._tm_map) {

                clearTimeout(id);
                tmp.set(
                    this._setTimeout(info.func, (info.delay - info.sw.elapseTime) / this.speed),
                    {
                            func:info.func,
                            delay:info.delay,
                            sw:info.sw
                    }
                );
                info.sw.speed = this.speed;
                this._tm_map.delete(id);

            }

            for(const [id, info] of tmp) {

                this._tm_map.set(id, info);

            }

        };

        /**
         * 現在、プレイヤーが終了処理中～終了の間の場合、trueを返却する。※ページ終了処理中で残りページがある場合もtrueとなる。
         */
        isEnd() {

            return this.state == 'end' || this.state == 'pageclosing' || this.state == 'abort' || this.state == 'closing' || this.state == null;

        };

        /**
         * 表示するものが残っておらず、終了処理中～終了の間の場合、trueを返却する。
         */
        isFinalize() {

            return this.state == 'end' || this.state == 'abort' || this.state == 'closing';

        };

        /**
         * プレイヤーの再生を開始可能かどうか返却する。(同時に同じプレイヤーを再生しようとした場合はエラー)
         */
        isPlayable() {

            return this.state == null || this.state == 'abort' || this.state == 'end';

        };

        /**
         * ウィンドウの表示を停止して初期化、またはカスタムウィンドウの場合はを破棄する。
         */
        finalize() {

            this.state = 'closing';

            // 非同期プロセスの停止
            this._clear_pids();

            // 文字ウィンドウ非表示
            this.hide();

            // イベントハンドラなどの登録解除
            this._removeAllHandler();

            // マネージャーから登録解除
            this.manager.unregister(this.id);

            // ページ終了処理
            this._finalize_page();

            // abortが多重に呼び出された場合
            this._resolve_pagestop();

            // pauseの要求の残りを解除
            // this._resolve_pause_req({caller_name:this.finalize.name});
            this._resolve_pause_req_force();
            this._resolve_pause();

            // 終了処理
            this._finalize();
            
        };

        _finalize() {

            this.anim_player.destroy(); // アニメーション停止、スクリーン停止 CSS初期化 etc...

            if(this.type == 'custom') { // カスタムウィンドウは破棄

                this.elements.destroy();
                this.state = 'abort';
    
            }
            else { // 固定ウィンドウ

                // 固定ウィンドウの場合初期化処理
                this._reStore_default();            
                this.state = 'end';

            }

        };

        /**
         * ページの再生を始める。一時停止中やレジューム時は途中から再生する(再開する)。
         */
        _start_pages() {

            var page = this.pages[this.page_num];
            this._play_page(page, true).catch(this._error_handler);

        };

        _set_config(conf) {

            if(!conf) {
                return;
            }

            // テキストスピード
            if('textspeed' in conf) {
                this._text_speed = conf.textspeed;
            }

            // テキストノーウェイト
            if('nowait' in conf) {
                this._is_text_nowait = conf.nowait;
            }

            // 行間待ち時間
            if('lineinterval' in conf) {
                this._line_interval = conf.lineinterval;
            }

            // ページ間待ち時間
            if('pageinterval' in conf) {
                this._page_interval = conf.pageinterval;
            }

            // 閉じるまでの時間
            if('pageclosegap' in conf) {
                this._page_closegap = conf.pageclosegap;
            }

        };

        _get_config() { // 画面遷移レジューム用のconfigオブジェクトを取得する

            var ret = {};

            if(this._text_speed) {
                ret.textspeed = this._text_speed;
            }

            if(this._is_text_nowait) {
                ret.nowait = this._is_text_nowait;
            }

            ret.lineinterval = this._line_interval;

            ret.pageinterval = this._page_interval;

            ret.pageclosegap = this._page_closegap;

            return ret;

        };

        _set_windowstyle(style) {

            if(!style) {
                return;
            }

            // 初期化
            this._reset_windowstyle(style.reset);

            // 座標
            this._set_windowcoord(style.x, style.y);

            // 名前表示欄とテキスト欄の文字カラー
            this._set_window_textColor(style.color);

            // 上書きCSS追加
            this._add_windowstyle_css({container:style.css_container, bg:style.css_bg, name:style.css_name, text:style.css_text});

        };

        _reset_windowstyle(reset) {

            if(!reset) {
                return;
            }

            if(reset.includes("coordinate")) {

                this._clear_windowcoord(); // ウィンドウ座標

            }

            if(reset.includes("color")) {

                this._clear_font_colors(); // フォントカラー

            }

            if(reset.includes("css")) {

                this.elements.restore_css_default();// 上書きCSS

            }

        };

        _get_windowstyle() { // 画面遷移レジューム用のwindowstyleオブジェクトを取得する

            var ret = {};

            // coordinate
            var x = this.elements.container.css('left');
            if(x) {
                ret.x = x;
            }
            var y = this.elements.container.css('top');
            if(y) {
                ret.y = y;
            }

            // fontcolor
            var color = this.name_elm.css('color');
            if(color) {
                ret.color = color;
            }

            // css classes
            ret.css_container = this.elements.container_base;
            ret.css_bg = this.elements.bg_base;
            ret.css_name = this.elements.name_base;
            ret.css_text = this.elements.text_base;

            return ret;

        };

        _set_windowcoord(left, top) {

            if(left) {
                this.elements.container.css('left', left);
            }

            if(top) {
                this.elements.container.css('top', top);
            }


        };

        _clear_windowcoord() {

            this.elements.container.css('left', '');
            this.elements.container.css('top', '');

        };

        _set_window_textColor(color) {

            if(!color) {
                return;
            }

            this._font_color = color; // デフォルトフォントカラー変更
            this._set_font_colors(this._font_color, this._font_color);

        };

        _set_font_colors(cname, ctext) {

            this.name_elm.css('color', cname);
            this.text_elm.css('color', ctext)

        };

        _clear_font_colors() {

            this._font_color = FONT_COLOR_DEFAULT;
            this.name_elm.css('color', this._font_color);
            this.text_elm.css('color', this._font_color)

        };

        _add_windowstyle_css({container, bg, name, text}) {

            this.elements.add_container_base(container);
            this.elements.add_bg_base(bg);
            this.elements.add_name_base(name);
            this.elements.add_text_base(text);

        };

        /**
         * 1ページ分の初期設定処理を行う。
         * @param {Object} page 1ページ分の設定オブジェクト(JSON) 
         */
        _init_page_setting(page) {

            // コンフィグ設定
            this._set_config(page.config);

            // スタイル設定
            this._set_windowstyle(page.windowstyle);

        };

        /**
         * 1ページ分の終了処理を行う。
         */
        _finalize_page() {

            // 文字表示速度初期化
            // this._text_speed = null;
            // this._is_text_nowait = null;

            // ページ内のtext配列の配列番号
            this.line_num = 0;

            // 名前表示欄のクリア
            this.elements.name_field.empty();
            this.name_elm = null;

            // テキスト表示欄のクリア
            this.elements.text_field.empty();
            this.text_elm = null;

        };

        _disp_windowname(name="") {

            this.name_elm.text(name);

        };

        /**
         * ページ設定オブジェクトを指定し、1ページ分の表示処理を行う。
         * @param {Object} page 1ページ分の設定オブジェクト(JSON)
         * @param {Boolean} is1st 最初の1ページ目かどうか
         */
        async _play_page(page, is1st=false) {

            // ページスタイルを初期化
            this._init_page_setting(page);

            // 文字シナリオ開始時のアニメーションを実行
            this.anim_player.type = page.type; // アニメーションのウィンドウタイプを切り替え
            this.anim_player.load(page.animation); // ページアニメーション設定がある場合は読み込み

            // ウィンドウの非表示を解除
            this.visible();

            if(is1st) { // type='action'が非同期で完了する前提で先頭アニメーションを配列第1要素で実行する ex) 要素1:action 要素2:page1
                await this.anim_player.play({timing:'start'});
            }
            else {
                await this.anim_player.play({timing:'pagestart'});
            }

            // 一時停止要求をチェック＆一時停止
            await this._resolve_pause_req({caller_name:this._play_page.name, caller_args:[page, is1st]});

            // 強制終了をチェック
            if(this._is_pagestop || this.isEnd()) {
                this._resolve_pagestop();
                return;
            }

            // 時間経過でページ送りを登録(表示時間が指定されている場合)
            this._setPageTimeout(page);

            if(page.type == 'text') {

                this._play_textpage(page);

            }
            else if(page.type == 'balloon') {

                this._play_balloonpage(page);

            }
            else if(page.type == 'action') {

                this._play_actionpage(page);

            }


        };

        /**
         * type='text'のページ表示処理を行う。
         * 
         * @param {Object} page 1ページ分の設定オブジェクト(JSON)
         */
        _play_textpage(page) {

            this._refresh_textpage_end();
            this._refresh_window_forward();

            this._disp_windowname(page.name);
            this._start_textlines(page.textlines);

        };

        _play_balloonpage(page) {

            this._refresh_balloonpage_end();

            this._disp_windowname(page.name);
            this._start_textlines(page.textlines);

        };

        _play_actionpage(page) {

            // キューの実行
            this._exec_cue(page.action);

            // 次のページへ
            this._page_next();

        };

        /**
         * ウィンドウスタイルなどは次ページへの引き継ぎを行う。
         */
        _restyle_page() {

            // CSS -> this.elements.restore_css_default()を呼び出さない限り引継ぎ
            // 座標 -> 上書きしない限り引継ぎ
            this._set_font_colors(this._font_color, this._font_color); // 文字カラーを再設定

        };

        /**
         * ページ設定に表示時間が設定されている場合、
         * @param {Object} page  1ページ分の設定オブジェクト(JSON)
         */
        _setPageTimeout(page) {

            if(this.isSkip && page.type == 'text') { // Skipモード有効の場合テキストページは表示時間を無視する
                return;
            }

            if(page.disptime) {

                this._tm_map.set(
                    this._setTimeout(this._page_next, page.disptime / this.speed), // clearid
                    { // info
                        func:this._page_next,
                        delay:page.disptime,
                        sw:new g2e.common.StopWatch({speed:this.speed})
                    }
                );

            }

        };

        /**
         * 次ページ表示処理を行う。前ページのクリア処理やページ終端処理など
         */
        _page_next = async () => {

            // 一時停止要求をチェック＆一時停止
            await this._resolve_pause_req({caller_name:this._page_next.name});

            if(this._is_pagestop) { // 既に終了待機中
                this._resolve_pagestop();
                return;
            }

            if(this.isEnd()) { // 終了処理中(終了処理の多重起動防止)
                return;
            }

            await this._request_pagestop(); // 処理の終了を待機
            this._stop_requests = [];
            this.state = "pageclosing"; // ページ終了中
            var nowp = this.page;
            if(++this.page_num >= this.pages.length) { // ページすべて終了

                await this.anim_player.play({timing:'close'}); // Closeアニメーション
                this.finalize();

            }
            else { // ページ終了 -> 次ページ表示処理

                if(this.page_num > this.lastpage_idx) { // Textページの表示は終了している
                    await this.anim_player.play({timing:'close'}); // Closeアニメーション
                    this.hide();
                }
                else {
                    await this.anim_player.play({timing:'pageclose'}); // Closeアニメーション
                }

                if(nowp.type == 'balloon') {
                    this.hide();
                }

                this._removeAllHandler(); // ハンドラを解除(表示途中で強制的に次ページに送る対応)

                await new Promise((resolve) => {
                    setTimeout(
                        resolve,
                        this.isSkip && nowp.type == 'text' ? PAGE_INTVL_SKIP : this._get_page_interval(nowp) / this.speed
                    );
                });

                if(this.isFinalize()) { // ページ送り中に終了処理実行
                    return;
                }

                this.anim_player.clear_animation(); // アニメーション解除

                this._finalize_page();

                // this.elements.reset_css(); // CSS初期化はclear_animation()内で実行しているため不要
                this._restyle_page(); // ウィンドウスタイルに引継ぎ

                this.state = "play";

                this._play_page(this.pages[this.page_num]).catch(this._error_handler);

            }

        };

        _get_page_interval(page) {

            if(page.pageinterval) {
                this._page_interval = page.pageinterval;
                return this._page_interval;
            }

            if(!this._page_interval) {

                if(page.type == 'text') {
                    this._page_interval = PAGE_INTVL_TEXT;
                }
                else if(page.type == 'balloon') {
                    this._page_interval = PAGE_INTVL_BALLOON;
                }
                else {
                    this._page_interval = 0;
                }

            }

            return this._page_interval;

        };

        /**
         * 1ページ分の文字シナリオの表示処理を開始する。
         * @param {Array} textlines 1ページ分の表示テキストやアクションの配列 
         */
        async _start_textlines(textlines) {

            // 一時停止要求をチェック＆一時停止
            await this._resolve_pause_req({caller_name:this._start_textlines.name, caller_args:[textlines]});

            if(this._is_pagestop || this.isEnd()) { // 強制終了をチェック
                this._resolve_pagestop();
                return;
            }

            var textline = textlines[this.line_num];
            this._play_textline(textline, textlines).catch(this._error_handler); // async

        };

        /**
         * 1ページ内の配列の1要素(textline)を実行する。
         * @param {Object} textline 表示処理を行う配列要素
         * @param {Array} textlines textlineを取り出した元の配列
         */
        async _play_textline(textline, textlines) {

            if('animation' in textline) {

                this.anim_player.load(textline.animation);
                await this.anim_player.play({timing:'realtime'});

            }

            if('action' in textline) {

                this._exec_textlineAction(textline.action);

            }

            if('color' in textline) {

                this._exec_textlineColor(textline.color)

            }

            if('text' in textline) {

                var toNext = await this._exec_textlineText(textline.text, textlines).catch(this._error_handler);
                if(!toNext) {
                    return;
                }

            }

            this._textline_next(textlines);

        };

        _exec_textlineAction(action) {

            this._exec_cue(action)

        };

        _exec_textlineColor(color) {

            var elm = $('<span></span>').css('color', color);
            this.elements.text_field.append(elm);
            this.text_elm = elm;

        };

        async _exec_textlineText(text, textlines) {

            text = text.replace(/\r\n/mig, "\n"); // CRLFをLFに統一

            if(this.is_text_nowait) { // ノーウェイト

                this.text_elm.text(text);
                this.anim_player.cancelNonLoop(); // 実行中のアニメーションをキャンセル
                return true;

            }
            else { // アニメーション表示(文字送り)

                return await this._start_textAnimation(text, textlines).catch(this._error_handler);

            }

        };

        async _start_textAnimation(text, textlines) {

            this._disp_text = text;
            this._disp_stack = Array.from(text).reverse();
            var pid = this._gen_pid(); // プロセスIDを生成
            var ret = await this._disp_textArray({pid:pid, text:text, textlines:textlines});
            this._remove_pid(pid);
            return ret;

        };

        async _disp_textArray({pid, text, textlines}) { // 一文字ずつ表示(再帰呼出し)

            await this._resolve_pause_req({caller_name:this._disp_textArray.name, caller_args:[arguments[0]]}); // 一時停止要求をチェック＆一時停止

            if(!this._pid_is_active(pid)) { // 再帰呼出プロセスが既に無効化されている
                return false;
            }

            if(this.isEnd()) { // 終了処理が開始していたら即resolve
                return false;
            }

            if(this._is_pagestop) { // ストップリクエスト発行中
                this._resolve_pagestop();
                return false;
            }

            if(this.isSkip && this.page.type == 'text') { // Skipモードが有効になったらテキストページは即完了
                this._finish_textpage();
                return false;
            }

            if(!this.is_textanim_now) { // 表示文字列終了(インターセプト)
                return true;
            }

            var chr;
            var newText = "";
            for(let i=0; i<Math.ceil(this.speed); i++) {

                chr = this._disp_stack.pop();
                if(!chr) {
                    chr = "";
                }
                newText = newText + chr;
                if(chr == "\n") {
                    break;
                }

            }

            this.text_elm.text(this.text_elm.text() + newText);

            if(!this.is_textanim_now) { // テキストの表示が終わったので終了
                return true;
            }

            if(chr == "\n") { // 行間の待ち時間
                await new Promise((resolve) => { setTimeout(resolve, this.textline_interval / this.speed); });  // このsetTimeoutはcancelしない(デッドロック防止)
            }
            else { // 文字間の待ち時間
                await new Promise((resolve) => { setTimeout(resolve, this.text_speed_msec / this.speed); }); // このsetTimeoutはcancelしない(デッドロック防止)
            }


            return await this._disp_textArray({pid:pid, text:text, textlines:textlines});

        };

        _disp_text_all() { // テキスト表示途中に強制的に最後まで表示する 

            this._disp_stack = [];
            var textlines = this.page.textlines;
            this.line_num = textlines.length;
            this.elements.text_field.empty();
            this.text_elm = null;
            for(const textline of textlines) {

                if('color' in textline) {

                    this._exec_textlineColor(textline.color)
    
                }
    
                if('text' in textline) {
    
                    this.text_elm.text(this.text_elm.text() + textline.text);
    
                }
    
            }

        };

        /**
         * textlinesの次の要素の表示処理を行う。
         * @param {Array} textlines
         */
        _textline_next = async (textlines) => {

            await this._resolve_pause_req({caller_name:this._textline_next.name, caller_args:[textlines]}); // 一時停止要求をチェック＆一時停止
            
            if(this._is_pagestop || this.isEnd()) { // 強制終了をチェック
                this._resolve_pagestop();
                return;
            }

            if(++this.line_num >= textlines.length) {

                // テキストが終端まで達したことをイベントでDispatch
                $(this).trigger("textlines_end", [{}]);
    
            }
            else {

                this._play_textline(textlines[this.line_num], textlines);

            }

        };

        // type='text'のページの終了処理登録(textlinesの終端=ページ終了なのでページ終了処理を登録)
        _register_textpage_end() {

            $(this).one("textlines_end", this._textpage_end_handler);

        };

        _remove_textpage_end() {

            $(this).off("textlines_end", this._textpage_end_handler);

        };

        _refresh_textpage_end() {

            this._remove_textpage_end();
            this._register_textpage_end();            

        };

        /**
         * type='text'のページの終了処理
         */
        _textpage_end_handler = async () => {

            await this._play_end_animation();
            this.state = 'waituser';
            this._register_auto();

            await this._resolve_pause_req({caller_name:this._textpage_end_handler.name}); // 一時停止要求をチェック＆一時停止
            this._resolve_pagestop();

            if(this.isSkip) { // Skipモード時は自動でページ送り
                this._finish_textpage();
            }

        };

        _register_balloonpage_end() {

            $(this).one("textlines_end", this._balloonpage_end_handler);

        };

        _remove_balloonpage_end() {

            $(this).off("textlines_end", this._balloonpage_end_handler);

        };

        _refresh_balloonpage_end() {

            this._remove_balloonpage_end();
            this._register_balloonpage_end();

        };

        _balloonpage_end_handler = async () => {

            await this._play_end_animation();
            this.state = 'pageend';
            await this._resolve_pause_req({caller_name:this._balloonpage_end_handler.name}); // 一時停止要求をチェック＆一時停止
            this._resolve_pagestop();
            await new Promise((resolve) => { setTimeout(resolve, this._get_page_closegap(this.page) / this.speed); }); // closeアニメーション実行までの間隙
            this._page_next(); // balloonの場合はユーザーの操作を待たずに自動でnextpageへ

        };

        _get_page_closegap(page) {

            if(page.pageclosegap) {
                this._page_closegap = page.pageclosegap;
            }

            return this._page_closegap;

        };

        _play_end_animation = async () => {

            if(this.page_num == this.lastpage_idx) {

                await this.anim_player.play({timing:'end'});

            }
            else {

                await this.anim_player.play({timing:'pageend'});

            }

            return 'end animation is done';

        };

        _register_window_forward() {

            $(document).one('click', this._handler_window_click);
            $(document).one('keydown', this._handler_keyenter);

        };

        _remove_window_forward() {

            $(document).off('click', this._handler_window_click);
            $(document).off('keydown', this._handler_keyenter);

        };

        _refresh_window_forward() {

            this._remove_window_forward();
            this._register_window_forward();

        };

        _handler_window_click = (evt) => {

            if(Util.isOnController(evt.originalEvent.clientX, evt.originalEvent.clientY)) { // コントローラー上では無効
                this._refresh_window_forward();
                return;
            }

            this._finish_textpage();

        };

        _finish_textpage = () => {

            if(this.is_textanim_now) { // テキスト表示中

                this._disp_text_all(); // テキスト即時表示
                this.anim_player.cancelNonLoop(); // 実行中のアニメーションをキャンセル
                // $(this).trigger("textlines_end", [{}]); // テキスト終端イベント発火(_textline_next()内で発火されるため不要)

                if(this.isSkip && this.page.type == 'text') { // Skipモード時はテキストページを即終了
                    this.state = 'pageend';
                    this._page_next();
                }
                else {
                    this._refresh_window_forward(); // もう一度クリックで次ページ表示
                }

            }
            else { // テキスト表示終了時

                // 次ページ表示(ページ終端の場合は表示終了)
                this.state = 'pageend';
                this._page_next();

            }

        };

        _handler_keyenter = (evt) => {

            if(evt.which == 13) {
                this._handler_window_click(evt);
            }
            else { // Enterキー以外なのでリスナーを再登録
                this._refresh_window_forward();
            }

        };

        _exec_cue(cd){

            var player = this.manager.player;
            var cue = new Cue({
                cue_time:0,
                events:cd,
                cut:player.cut,
                videoData:player.cut.videoData
            })

            player.fire_cues({cue_data:cue});

        };

        get speed() {

            return this._speed;

        };

        set speed(val) {

            this._speed = val;
            this.anim_player.speed = val;
            this._changeTimeoutSpeed();

        };

        reset_speed() {

            this.speed = 1.0;

        };

    }

    class LettersManager {

        /**
         * コンストラクタ
         * 
         * @param {ContentPlayer} player 
         */
        constructor({player}) {

            this.player = player; // @see ContentPlayer
            this._defPlayerIns = null; // 一度だけ生成される固定HTML用の文字プレイヤーインスタンス
            this.ltPlayers = new Map(); // key:文字シナリオID value:LettersPlayer
            $(this.player).on('cut_start', this._chk_range);
            $(this.player).on('change_speed', this._handler_changespeed);

        }

        /**
         * 文字シナリオの表示を開始する。同じ文字シナリオIDを指定した場合に既に表示中の場合は無視する。
         * @param {String} id 文字シナリオID
         * @param {Array} range 表示範囲を示すカットIDの配列
         */
        async start({id, range}) {

            if(this.ltPlayers.has(id)) { // 同じ文字シナリオIDのプレイヤーを指定した場合は無視

                // let toAbort = this.ltPlayers.get(id);
                // await toAbort.abort();
                return "already running.";

            }
            
            var confData = this.player.cut.scene.letters.get(id);
            if(!confData) {
                throw "Letters data is not exist.(" + id + ")";
            }
            var ltplayer = this._getPlayer({id:id, data:confData});
            if(!ltplayer.isPlayable()) { // 異なるIDのプレイヤーが終了していない場合は強制終了
                await ltplayer.abort();
            }
            ltplayer.id = id;
            ltplayer.loadInit({data:confData, range:range});
            this.ltPlayers.set(id, ltplayer);
            ltplayer.play();

        };

        /**
         * 画面遷移後にsessionStorageからレジューム用文字シナリオデータを取得し、再現する。
         */
        async resume_for_pagemove({isPause=false}={}) {

            var resume_data = this.loadResumeData();
            if(!resume_data) {
                return; // レジューム対象なし
            }
            
            var confData;
            var ltplayer;
            var ltData;
            for(const id in resume_data) {

                ltData = resume_data[id];
                confData = this.player.cut.scene.letters.get(id);
                ltplayer = this._getPlayer({id:id, data:confData});
                this.ltPlayers.set(id, ltplayer);
                ltplayer.resume_for_pagemove(ltData, confData, isPause);        

            }

        };

        /**
         * 再生中の文字シナリオを全て一時停止する。
         * @param {Boolean} isWait 各ポーズが完了したことを保証するPromiseを返却するかどうか true(Promise) デフォルト false
         */
        async pause(isWait=false) {

            var promises = [];
            for(const lplayer of this.ltPlayers.values()) {

                promises.push(lplayer.pause());

            }

            if(isWait) {
                return Promise.all(promises);
            }
            else {
                return "sended pause requests.";
            }

        };

        /**
         * 一時停止中の文字シナリオを全て再開する。(コントローラーでの一時停止/レジュームでの仕様を想定。
         * 画面遷移を伴うレジュームについてはresume_for_pagemove()を使用。)
         */
        resume() {

            for(const lplayer of this.ltPlayers.values()) {

                lplayer.resume();

            }

        };

        /**
         * 指定したIDの文字シナリオプレイヤーをマネジャーから登録解除する。
         * @param {String} id - 文字シナリオID 
         */
        unregister(id) {

            this.ltPlayers.delete(id);

        };

        /**
         * 各LettersPlayerのautoモードを切り替える。
         */
        toggleAuto() {

            for(const lplayer of this.ltPlayers.values()) {

                lplayer.toggleAuto();

            }

        };

        /**
         * 各LettersPlayerのskipモードを切り替える。
         */
        toggleSkip() {

            for(const lplayer of this.ltPlayers.values()) {

                lplayer.toggleSkip();

            }

        };

        /**
         * 現在表示中の文字シナリオウィンドウを全て強制終了する。
         */
        async abort_all() {

            var resolves = [];
            for(const lplayer of this.ltPlayers.values()) {

                resolves.push(lplayer.abort());

            }

            return Promise.all(resolves);

        };

        /**
         * プレイヤーが表示範囲内かどうかチェックし、範囲外の場合にプレイヤーの強制終了処理を行う。
         * @param {String} id カットID
         */
        async abort_outrange(id) {

            for(const lplayer of this.ltPlayers.values()) {

                if(lplayer.isFinalize()) {
                    continue;
                }

                if(!lplayer.isRange(id)) {
                    await lplayer.abort();
                }

            }

        };

        _chk_range = (data) => {

            this.abort_outrange(data.id);

        };

        /**
         * シナリオウィンドウが標準かカスタムかを判定し、LettersPlayerのインスタンスを生成し返却する。
         * 
         * @param {String} id 文字シナリオID
         * @param {Object} data 文字シナリオIDに紐づくシナリオ設定データ(JSON)
         */
        _getPlayer({id, data}) {

            var ret = null;
            if(data.custom) {
                ret = LettersPlayer.genCustomPlayer({id:id, manager:this});
            }
            else {
                ret = this._defaultPlayer;
                if(!ret.id) {
                    ret.id = id;                    
                }
            }

            return ret;

        };

        /**
         * 固定の標準プレイヤーを返却する。未生成の場合のみ生成し、Managerにインスタンスを保持する。
         */
        get _defaultPlayer() {

            if(!this._defPlayerIns) {

                this._defPlayerIns = LettersPlayer.genBasicPlayer({manager:this});

            }

            return this._defPlayerIns;

        };

        /**
         * 表示中の文字シナリオウィンドウ全ての表示非表示を設定する
         */
        visible() {

            for(const lplayer of this.ltPlayers.values()) {

                if(this.player.is_ui_visible) {
                    lplayer.show();
                }
                else {
                    lplayer.hide();                    
                }

            }

        };

        /**
         * 文字シナリオのレジューム情報をsessionStorageに保存する。文字シナリオを全て「ポーズ」済みの状態で実行すること。
         */
        storeResumeData () {

            var resumeData = {};
            for(const [id, lplayer] of this.ltPlayers) {

                if(!lplayer.isFinalize()) {
                    resumeData[id] = lplayer.genResumeData();
                }

            }

            g2e.session.SessionManager.setPlayingLetters(resumeData);

        };

        /**
         * 文字シナリオのレジューム情報をsessionStorageから取得する
         */
        loadResumeData () {

            var data = g2e.session.SessionManager.getPlayingLetters();
            return data;

        };

        _handler_changespeed = () => {

            for(const lplayer of this.ltPlayers.values()) {

                lplayer.speed = this.player.speed;

            }

        };

        get speed() {

            return this.player.speed;

        };

    }

    class LettersAnimPlayer {

        /**
         * 指定のタイミングで文字シナリオウィンドウのアニメーションを行う。
         * アニメーションを行うタイミングのパターンは以下の通り。
         * 
         * |start---pageend|pagestart---pageend|pagestart---end|close
         * |start---pageend|pagestart---end|close
         * |start---end|close
         * …
         * |start---pageend|pagestart-realtime--pageend|pagestart--realtime-end|close
         * 
         * @param {*} param0 
         */
        constructor({elements}){

            this.elements = elements;

            this.screen = new LettersAnimScreen({canvas_id:elements.canvas_id, player:this}); // canvasアニメーション表示用スクリーン 
            this.screen.active_screen();
            this._init();
            this._disabled = false;

        };

        get disabled() {

            return this._disabled;

        };

        set disabled(val) {

            this._disabled = val;

        };

        _init() {

            this._type = 'text';
            this.animdata = {

                text : $.extend(true, {}, LETTERS_ANIM_ALIAS.text_default), // ページ全体のアニメーション設定(text)
                balloon : $.extend(true, {}, LETTERS_ANIM_ALIAS.balloon_default) // ページ全体のアニメーション設定(balloon)

                // ToDo
                //      素材が重複してstoryに配置されるのは面倒なので基本はApp下にデプロイすることを基本に考えつつも
                //      CSS、image、jsonをstory下に配置する機能も未来実装としては予定しておく。
                //      エイリアスは別ファイルというよりはscene.json内で定義すればいい気がするので検討。
                //      ↓↓↓
                //      候補：
                //      1. バージョン判定機能の追加＆シーン設定にrecommend/requireの設定
                //      2. エイリアスのシステム値(JSコード)を定義(Done)
                //      3. エイリアスの設定値(シーン設定)機能を追加
                //      4. story配下のCSSやimage読み込み機能。
                //         (CSSの読み込みはElectron側で行うのがもしかしたら良いかも)

            };

            this._cssanim_runnings = new Map(); // key:StopWatchインスタンス value:_play_cssanimの引数 @see g2e.common.StopWatch
            this._spritesheet_runnings = new Map() // key:StopWatchインスタンス value:_play_spritesheetの引数 @see g2e.common.StopWatch
            this.spritesheet_ids = [];

        };

        /**
         * プレイヤーを初期状態に戻す。
         */
        restore_default() {

            this._init();

        };

        get type() {

            return this._type;

        };

        set type(type) {

            this._type = type;

        };

        /**
         * アニメーション設定を読み込み、有効化する。初期値はtype='text'は"text_default"、type='balloon'は"balloon_default"
         * 引数に含まれるパラメータのみ上書きし、それ以外は初期値を維持する(一部上書き)。無効にする場合は、該当パラメータに
         * 空オブジェクトなどを指定するか、active=falseを指定する。
         * 
         * @see LETTERS_ANIM_ALIAS
         * @param {Object} anim 各タイミングのアニメーション設定を格納したオブジェクト
         */
        load(anim = {}) {

            if(anim.text) {

                this._loadAlias(anim.text, this.animdata.text);
                this.animdata.text = $.extend(this.animdata.text, anim.text);

            }

            if(anim.balloon) {

                this._loadAlias(anim.balloon, this.animdata.balloon);
                this.animdata.balloon = $.extend(this.animdata.balloon, anim.balloon);

            }

        };

        /**
         * エイリアス設定ロード
         * @param {Object} data 読み込みデータ anim.text or anim.balloon
         * @param {Object} tdata 出力先データ this.animdata.text or this.animdata.balloon 
         */
        _loadAlias(data, tdata) {

            this._extendAliasData(data.alias, data); // データ全体にエイリアスをロード

            // 以下、個別ロード
            if(data.start){

                var alias = data.start.alias;
                var target = tdata.start;
                this._extendAliasData(alias, target, 'start');

            }

            if(data.end){
                
                var alias = data.end.alias;
                var target = tdata.end;
                this._extendAliasData(alias, target, 'end');

            }

            if(data.close){
                
                var alias = data.close.alias;
                var target = tdata.close;
                this._extendAliasData(alias, target, 'close');

            }

            if(data.pagestart){
                
                var alias = data.pagestart.alias;
                var target = tdata.pagestart;
                this._extendAliasData(alias, target, 'pagestart');

            }

            if(data.pageend){
                
                var alias = data.pageend.alias;
                var target = tdata.pageend;
                this._extendAliasData(alias, target, 'pageend');

            }

            if(data.pageclose){
                
                var alias = data.pageclose.alias;
                var target = tdata.pageclose;
                this._extendAliasData(alias, target, 'pageclose');

            }

            if(data.realtime){
                
                var alias = data.realtime.alias;
                var target = tdata.realtime;
                this._extendAliasData(alias, target, 'realtime');

            }

        };

        /**
         * 指定ターゲットにデータを適用(jQuery.extend)
         * @param {String} alias エイリアス名 
         * @param {Object} target 適用先オブジェクト(this.animdata.*) 
         * @param {String} timing (オプション) エイリアス内の各タイミング start, end, pageclose, ...etc
         */
        _extendAliasData(alias, target, timing) {

            if(alias) {

                var adata = timing ? LETTERS_ANIM_ALIAS[alias][timing] : LETTERS_ANIM_ALIAS[alias];
                target = $.extend(target, adata);

            }

        };

        _addAlias() {

            // ToDo 将来実装？

        };

        /**
         * 現在のタイプ('text' or 'balloon')のアニメーション設定に基づき、アニメーションを非同期で実行する。
         * 同期的に実行する場合は呼び出し側でawaitすること。但し、各アニメーションパラメータにisWaitが指定されていない場合、
         * 各アニメーション関数のPromiseは即時resolveされる。
         * アニメーションの内容を変更する場合はplay呼び出し前にloadを実行すること。
         * 
         * @param {String} timing 実行タイミング 'start' / 'end' / 'close' / 'pagestart' / 'pageend' / 'pageclose' / 'realtime'
         */
        async play({timing}) {

            if(!(this._type == "text" || this._type == "balloon")) {
                return "type is action.";
            }

            if(this._disabled) {
                return "anim player is disabled.";
            }

            this.screen.active_screen();
            var animdata = this.animdata[this._type][timing];
            if(!animdata) {
                return 'animdata(' + this._type + '/' + timing + ') is undefined.' ;
            }

            if(!animdata.active) {
                return timing + ' is disable';
            }

            animdata.canvas = animdata.canvas || {};
            animdata.js = animdata.js || {};
            animdata.js.css = animdata.js.css || {};

            return Promise.all([

                // SpriteSheetアニメーション(canvas)
                this._play_spritesheet(animdata.canvas.spritesheet),

                // CSSアニメーション
                this._play_cssanim(animdata.js.css)

            ]);

        };

        /** 
         * 現在再生中のアニメーションを一時停止する
         * (※ContentPlayer内でpause()を実行してからSessionStorageの保存処理を実行している)
         * */
        pause() {

            // SpriteSheetアニメーション(canvas)
            this._pause_spritesheet();

            // CSSアニメーション
            this._pause_cssanim();

        };

        /** 一時停止中のアニメーションを再開する */
        resume() {

            // SpriteSheetアニメーション(canvas)
            this._resume_spritesheet();

            // CSSアニメーション
            this._resume_cssanim();

        };

        /**
         * ループ再生以外のアニメーションをキャンセルして停止する。
         */
        cancelNonLoop() {

            this._cancel_spritesheet();

            this._cancel_cssanim();

        };

        /**
         * 画面遷移を伴うレジュームでsessionStorageからロードしたデータを使用して処理を再開する。
         * @param {Object} data レジューム用データ @gee genResumeData() 
         * @param {Object} confData 文字シナリオIDに紐づく設定データ 
         * @param {Boolean} isPause レジューム時に一時停止状態で表示するか true - 一時停止 デフォルト false
         */
        resume_for_pagemove(data, confData, isPause=false) {

            if(data.animresume.cssanim) { // CSSアニメーション

                for(const rData of data.animresume.cssanim) {

                    this._play_cssanim({...rData.args, elapseTime:rData.elapseTime});

                }

            }

            if(data.animresume.spritesheet) { // Spritesheetアニメーション

                for(const rData of data.animresume.spritesheet) {

                    this._play_spritesheet(rData.args, rData.elapseTime);

                }                

            }

            if(isPause) {

                this.pause();

            }

        };

        /**
         * 現在再生中アニメーションのレジューム用データ
         */
        get resume_data() {

            return this._gen_redume_data();

        };

        _gen_redume_data() {

            var resume_data = {};

            if(this._cssanim_runnings.size > 0) { // CSSアニメーション

                resume_data.cssanim = [];
                for(const [sw, args] of this._cssanim_runnings) {

                    resume_data.cssanim.push(
                        {
                            elapseTime : sw.elapseTime,
                            args : args
                        }
                    );
    
                };
    
            }

            if(this._spritesheet_runnings.size > 0) { // Spritesheetアニメーション

                resume_data.spritesheet = [];
                for(const [sw, args] of this._spritesheet_runnings) {

                    resume_data.spritesheet.push(
                        {
                            elapseTime : sw.elapseTime,
                            args : args
                        }
                    );

                }

            }

            return resume_data;

        };

        /**
         * アニメーションを削除し、初期化する。(再利用可)
         */
        destroy() {

            this.clear_animation();
            this.screen.disable_screen();
            this._init();

        };

        /**
         * アニメーションを停止し、ウィンドウスタイルを初期状態にもどす。
         */
        clear_animation() {

            this._clear_cssanim(); // CSSアニメーション
            this._clear_spritesheet(); // スプライトアニメーション

        };

        _clear_cssanim() {

            this.elements.reset_css();
            this._cssanim_runnings.clear();

        };

        _clear_spritesheet() {

            this.screen.removeAll();
            this.spritesheet_ids = [];
            this._spritesheet_runnings.clear();

        };

        deleteRunningSpritesheet(stopWatch) {

            this._spritesheet_runnings.delete(stopWatch);

        };

        _pause_spritesheet() {

            this.screen.pauseAll();

            for(const sw of this._spritesheet_runnings.keys()) {
                sw.pause();
            }

        };

        _resume_spritesheet() {

            this.screen.resumeAll();

            for(const sw of this._spritesheet_runnings.keys()) {
                sw.resume();
            }

        };

        async _play_spritesheet(spritesheet, elapseTime=0) {

            if(!spritesheet) {

                return 'spritesheet is undefined.';

            }

            var stopWatch = new g2e.common.StopWatch({elapseTime:elapseTime});
            this._spritesheet_runnings.set(stopWatch, spritesheet);
            this.spritesheet_ids.push(await this.screen.addSpritesheet({...spritesheet, speed:this.speed, elapseTime:elapseTime, stopWatch:stopWatch}));

            return 'spritesheet is added.';

        };

        _cancel_spritesheet() {

            for(const id of this.spritesheet_ids) {

                var spritesheet = this.screen.getSpritesheet(id).args;
                if(!spritesheet.endname) {
                    continue; // Loop Animation
                }
                this.screen.forceFinish(id, spritesheet.isEndDel);
            }

        };

        _set_spritesheet_speed() {

            for(const id of this.spritesheet_ids) {

                this.screen.changeSpriteSpeed(id, this.speed);

            }

            for(const [sw, args] of this._spritesheet_runnings) {

                sw.speed = this.speed;

            }

        };

        _pause_cssanim() {

            this.elements.container.css("animation-play-state", "paused");

            for(const sw of this._cssanim_runnings.keys()) {
                sw.pause();
            }

        };

        _resume_cssanim() {

            this.elements.container.css("animation-play-state", "");

            for(const sw of this._cssanim_runnings.keys()) {
                sw.resume();
            }

        };

        /**
         * CSSクラス追加によるCSSアニメーションを再生する。
         * 
         * @param {Array} classes アニメーションを定義したCSSクラス名の配列
         * @param {String} endname (オプション)指定した場合、その名前のアニメーションの完了でアニメーションを終了する
         * @param {Boolean} isWait (オプション)非同期的にアニメーションを実行するPromiseを返却する
         * @param {Number} timeout (オプション)isWaitがtrueの場合、CSSアニメーションの完了を待機する最大時間(ミリ秒)
         * @param {Number} elapseTime (オプション)アニメーション経過時間(ミリ秒)。指定した時間分アニメーションが経過したものとして開始する(CSSのanimation-delayプロパティ)。
         */
        async _play_cssanim({classes = [], endname=null, isWait=false, timeout=LETTERS_CSSANIM_TIMEOUT, elapseTime=0}) {

            if(!classes.length) {
                return;
            }

            // アニメーション開始時刻を記録
            var stopWatch = new g2e.common.StopWatch({elapseTime:elapseTime});
            this._cssanim_runnings.set(stopWatch, arguments[0]);

            const addCSS = async () => { // CSSを追加してアニメーションを開始するメソッド

                for(const cls of classes) {

                    this._set_cssanim_speed(); // 再生速度を設定

                    if(elapseTime) { // アニメーション経過時間を計算(レジューム用)
                        var anim_delay = g2e.common.CSSUtil.getCSSRule("." + cls).style.animationDelay;
                        if(anim_delay.length) {
                            this.elements.container.css("animation-delay", "calc(" + anim_delay + " - " + elapseTime +"ms)");
                        }
                        else {
                            this.elements.container.css("animation-delay", "calc(-" + elapseTime +"ms)");
                        }
                    }

                    this.elements.container.addClass(cls);
                    await new Promise((resolve) => { setTimeout(resolve, CSS_ADD_INTERVAL); });
        
                }
    
            };

            const finalize = (resolve=null) => {

                this.elements.container.off('transitionend');
                this.elements.container.off('animationend');
                this.elements.container.removeClass(classes);
                this.elements.container.css("animation-delay", "");
                this.elements.container.css("animation-duration", "");
                this._cssanim_runnings.delete(stopWatch);
                if(resolve) {
                    resolve();
                }

            };

            const isEnd = (evt) => {

                // console.log(endname, " / animation name? -> ", evt.originalEvent.animationName);
                return endname ? evt.originalEvent.animationName == endname : true;

            };

            if(isWait) { // CSSアニメーションの終了を待機する場合

                return new Promise(async (resolve) => {

                    let cid = setTimeout(() => { finalize(() => { resolve("CSS Animation is Timeout"); }); }, timeout);

                    this.elements.container.one(
                        'transitionend',
                        () => { 
                            finalize(() => { 
                                clearTimeout(cid);
                                resolve("anim css transitionend.");
                            });
                        }
                    );

                    this.elements.container.on(
                        'animationend',
                        (evt) => {

                            if(isEnd(evt)) {

                                finalize(() => {
                                    clearTimeout(cid);
                                    resolve("anim css animationend.");
                                });                                

                            }

                        }
                    );

                    addCSS();
    
                });

            }
            else { // 待機せず即resolveする場合

                this.elements.container.one('transitionend', finalize);
                this.elements.container.on(
                    'animationend',
                    (evt) => {

                        if(isEnd(evt)) {

                            finalize();                                

                        }

                    }
                );

                addCSS();   
                return "anim css added.";

            }

        };

        _cancel_cssanim() {

            for(const args of this._cssanim_runnings.values()) {

                for(const cls of args.classes) {

                    var rule = g2e.common.CSSUtil.getCSSRule("." + cls);
                    var count = rule.style.animationIterationCount;
                    if(count == "infinite") {
                        continue; // Loop Animation
                    }
                    this.elements.container.removeClass(cls);

                }

            }

        };

        _set_cssanim_speed() {

            this.elements.container.css("animation-duration", ""); // 通常スピード

            for(const [sw, args] of this._cssanim_runnings) {

                sw.speed = this.speed;
                if(this.speed == 1.0) {
                    continue;
                }

                for(const cls of args.classes) { // 通常以外の速度設定

                    var duration = g2e.common.CSSUtil.getCSSRule("." + cls).style.animationDuration;
                    if(duration.length) {

                        this.elements.container.css("animation-duration", "calc(" + duration + " / " + this.speed +")");

                    }

                }

            }

        };

        get speed() {

            return this._speed;

        };

        set speed(val) {

            this._speed = val;

            // CSSアニメーションの設定
            this._set_cssanim_speed();

            // SpriteSheetアニメーションの設定
            this._set_spritesheet_speed();

        };

        reset_speed() {

            this.speed = 1.0;

        };

    };

    /**
     * 文字シナリオのcanvasアニメーションを表示するスクリーン。
     * 
     * 各種のアニメーションを登録した際に一意なIDを返却するが、排他制御は行っていないため非同期で実行すると
     * IDが重複する可能性があるため注意すること。別々のスクリーンインスタンスでIDは共有しないため、
     * 同時に登録処理を実行する場合はインスタンスをわければ可。
     */
    class LettersAnimScreen extends Screen {

        /**
         * コンストラクタ
         * 
         * @param {String} canvas_id アニメーションを表示するcanvas要素のid属性
         * @param {LettersAnimPlayer} player アニメーションプレイヤーインスタンス  
         */
        constructor({canvas_id, player}) {

            super({canvas_id:canvas_id});
            this.player = player;
            this.render_id = null;
            this._id_sprite = 0; // spritesheetインスタンスを特定する一意なID 0 - Number.MAX_SAFE_INTEGER 上限に達した場合は 0 に戻る。排他制御は行わないので同期的に実行すること。
            this._spriteMap = new Map();  // key:this.id_spriteから排出されたUID value:登録中のSpritesheetコンテナ(CreateJS)

        }

        /** @override */
        async init() { 

            super.init();
            this.stage = new createjs.Stage(this.canvas_id);
            // createjs.Touch.enable(this.stage);

        };

        /** 再生中のアニメーションを全て一時停止する */
        pauseAll() {

            for(const data of this._spriteMap.values()) {

                clearInterval(data.tickid);
                var anim = data.container.getChildByName("anim");
                anim.stop();

            };

        };

        /** 一時停止中のアニメーションを再開する */
        resumeAll() {

            for(const data of this._spriteMap.values()) {

                data.tickid = setInterval(data.tickFunc, 1000 / data.framerate);
                var anim = data.container.getChildByName("anim");
                anim.play();

            };

        };

        /**
         * スプライトシートアニメーションをスクリーンに登録して表示する。(※再生開始メソッド)
         * 
         * @param {Array} images @see createjs.SpriteSheet
         * @param {Array} frames @see createjs.SpriteSheet
         * @param {Object} animations @see createjs.SpriteSheet
         * @param {Number} coordx SpriteSheetの表示座標 左上を0,0として デフォルト0
         * @param {Number} coordy SpriteSheetの表示座標 左上を0,0として デフォルト0
         * @param {Number} scale SpriteSheetの表示スケール デフォルト1.0
         * @param {Number} framerate SpriteSheetのフレームレート デフォルト24
         * @param {Number} speed SpriteSheetを再生するスピード 通常1.0 2倍速2.0 デフォルト1.0
         * @param {String} startname SpriteSheet上に定義された名前から開始する @see createjs.SpriteSheet
         * @param {String} endname SpriteSheet上に定義された名前のアニメーションが完了したらアニメーションを完了する @see createjs.SpriteSheet
         * @param {Boolean} isWait trueの場合、アニメーションが完了後にPromiseがresolveされる。
         * @param {Boolean} isEndDel trueの場合、アニメーション完了後にCanvasからSpritesheetを削除する。デフォルト:true
         * @param {Number} elapseTime 経過時間(ミリ秒)。指定した場合、指定した時間経過した状態でアニメーションを開始する。デフォルト:0
         * @param {StopWatch} stopWatch レジューム処理を行う場合のストップウォッチ。未指定の場合はelapseTimeを使用してnewする。@see g2e.common.StopWatch
         * @returns {Promise} 一意なID 0 ～
         */
        async addSpritesheet({images, frames, animations, coordx=0, coordy=0, scale=1.0, framerate=SPRITESHEET_FPS_DEFAULT, speed=1.0, startname, endname, isWait=false, isEndDel=true, elapseTime=0, stopWatch=new g2e.common.StopWatch({elapseTime:elapseTime})}) {

            var container = new createjs.Container();
            container.scale = scale;
            container.x = coordx;
            container.y = coordy;
            var sprite_sheet = new createjs.SpriteSheet({images:images, frames:frames, animations:animations});
            var anim = new createjs.Sprite(sprite_sheet, startname);
            anim.name = "anim";
            anim.tickEnabled = false; // 各スプライトシートが独自のフレームレートで更新
            var fInterval = 1000 / (framerate * speed);
            if(startname && elapseTime==0) {
                anim.play();
            }
            else {
                // anim.gotoAndPlay(elapseTime / createjs.Ticker.interval);
                anim.gotoAndPlay(elapseTime / fInterval);
            }
            var tickFunc = () => { this._sprite_play_handler(anim); };
            var tickid = setInterval(tickFunc, fInterval);
    
            container.addChild(anim);
            this.stage.addChild(container);
            var spr_id = ++this._id_sprite;
            if(spr_id >= Number.MAX_SAFE_INTEGER) {
                spr_id = this._id_sprite = 1;
            }
            this._spriteMap.set(spr_id, {container:container, anim:anim, stopWatch:stopWatch, args:arguments[0], framerate:framerate, tickid:tickid, tickFunc:tickFunc});

            if(isWait) {

                return new Promise(async (resolve) => {

                    var end_handler = (evt) => {

                        if(endname ? endname == evt.name : true) {
                            anim.stop();
                            if(isEndDel) {
                                this.removeSpritesheet(spr_id);
                            }
                            resolve(spr_id);
                            anim.removeEventListener("animationend", end_handler);
                            this.player.deleteRunningSpritesheet(stopWatch);
                        }

                    };
                    anim.addEventListener("animationend", end_handler);

                });

            }
            else {

                var end_handler = (evt) => {

                    var currFrame = evt.currentTarget.currentFrame;
                    if(endname == evt.name || (endname && evt.currentTarget.currentFrame == sprite_sheet.getNumFrames() - 1)) {
                        // anim.stop();
                        anim.gotoAndStop(currFrame);
                        if(isEndDel) {
                            this.removeSpritesheet(spr_id);
                        }
                        anim.removeEventListener("animationend", end_handler);
                        this.player.deleteRunningSpritesheet(stopWatch);
                    }

                };

                if(endname) { // endnameが未指定の場合ループアニメーション
                    anim.addEventListener("animationend", end_handler);
                }

                return spr_id;

            }

        };

        /**
         * すべてのスプライトシートアニメーションをスクリーンから削除する。
         */
        removeAll() {

            for(const id of this._spriteMap.keys()) {
                this.removeSpritesheet(id);
            }

        };

        /**
         * スプライトシートアニメーションをスクリーンから削除する。
         * 
         * @param {Number} id - 登録時に排出されたスクリーンインスタンス内で一意なID 
         */
        removeSpritesheet(id) {

            var data = this.getSpritesheet(id);
            var container = data.container;
            var anim = container.getChildByName("anim");
            container.removeChild(anim);
            this.stage.removeChild(container);
            clearInterval(data.tickid);
            this._spriteMap.delete(id);

        };

        /**
         * 一意なIDを指定してスプライトシートデータを取得する。
         * 
         * @param {Number} id - 登録時に排出されたスクリーンインスタンス内で一意なID 
         * @returns {Object} {container:createjs.Container, stopWatch:g2e.commmon.StopWatch, args:(addSpritesheet呼出時引数)}
         */
        getSpritesheet(id) {

            return this._spriteMap.get(id);

        };

        /**
         * 再生中のスプライトシートの再生速度を変更する。
         * @param {Number} id - 登録時に排出されたスクリーンインスタンス内で一意なID 
         * @param {Number} speed 速度 通常：1.0 2倍速:2.0
         */
        changeSpriteSpeed(id, speed) {

            var sprite = this.getSpritesheet(id);
            if(sprite) {
                var anim = sprite.anim;
                var tickid = sprite.tickid;
                clearInterval(tickid);
                var tickFunc = () => { this._sprite_play_handler(anim); };
                var fInterval = 1000 / (sprite.framerate * speed);
                var tickid = setInterval(tickFunc, fInterval);
                sprite.tickFunc = tickFunc;
                sprite.tickid = tickid;    
            }

        };

        /**
         * 再生フレームを強制的に最終フレームまでスキップして停止する。isEndDelがtrueの場合、停止後にスプライトシートを削除する。
         * @param {Number} id addSpritesheetの戻り値(一意)
         * @param {Boolean} isEndDel 
         */
        forceFinish(id, isEndDel=true) {

            var container = this.getSpritesheet(id).container;
            var anim = container.getChildByName("anim");
            var spritesheet = anim.spriteSheet;
            anim.gotoAndStop(spritesheet.getNumFrames()-1);
            if(isEndDel) {
                this.removeSpritesheet(id);
            }

        };

        /**
         * @implements
         */
        async disable_screen() {
            super.hide();
            this.render_stop();
        };

        /**
         * @implements
         */
        async active_screen() {

            if(!this.is_init) {
                this.init();
            }

            super.reveal();
            this.render_start();

        };

        /**
         * @implements
         */
        async render_start() {

            // createjs.Ticker.addEventListener("tick", this.play_handler);
            this.render();

        };

        /**
         * @implements
         */
        async render_stop() {

            // createjs.Ticker.removeEventListener("tick", this.play_handler);
            if(this.render_id) {
                cancelAnimationFrame(this.render_id);
            }
            this.render_id = null;

        };

        // フレーム更新処理(tick)
        // play_handler = (evt) => {

        //     this.refresh();

        // };

        // フレーム更新処理(requestAnimationFrame)
        render = () => {

            this.refresh();
            this.render_id = requestAnimationFrame(this.render);

        };

        refresh = () => {

            this.stage.update();

            // this._retouchStopWatch();

        };

        _sprite_play_handler = (anim) => {

            if(this.render_id) {
                cancelAnimationFrame(this.render_id);
            }
            else {
                return;
            }

            anim.tickEnabled = true;
            this.render();
            anim.tickEnabled = false;

        }

        _retouchStopWatch() { // createJSのTickerのframerateの誤差が大きいためストップウォッチに時間を補正する

            for(const [id, data] of this._spriteMap) {

                var stopWatch = data.stopWatch;
                var container = data.container;
                var frame  = container.getChildByName("anim").currentFrame;

                stopWatch.realElapseTime = Math.round(createjs.Ticker.interval * frame);

            }

        };

    }

    /**
     * ScreenUIクラス
     * 
     * 照準などのcanvas上に表示するUIを管理する。
     */
    class ScreenUI extends Screen {

        constructor({canvas_id}) {

            super({canvas_id:canvas_id});
            this.reticles = new Map();
            this.render_id = null;

        }

        /** @override */
        async init() { 

            super.init();
            this.stage = new createjs.Stage(this.canvas_id);
            // createjs.Touch.enable(this.stage);
            this._clearid = -1; // setIntervalのclearid
            
        };

        addReticle(reticle) {

            const old = this.reticles.get(reticle.num);
            if(old) {
                this.stage.removeChild(old.container);
            }
            reticle.reticleAnim.tickEnabled = false; // 指定のフレームレートで更新するためtickをオフ            
            this.stage.addChild(reticle.container);
            this.reticles.set(reticle.num, reticle);

        };

        removeReticle(reticle) {

            this.stage.removeChild(reticle.container);
            this.reticles.delete(reticle.num);

        };

        removeReticleAll() {

            for (const reticle of this.reticles.values()) {
                this.stage.removeChild(reticle.container);
            }
            this.reticles.clear();

        };

        /**
         * ※ 基本的にUIScreenは常時Active
         * @implements
         */
        async disable_screen() {
            super.hide();
            this.render_stop();
        };

        /**
         * @implements
         */
        async active_screen() {

            if(!this.is_init) {
                this.init();
            }

            super.reveal();
            this.render_start();

            // console.log("activate 2D screen.");

        };

        /**
         * @implements
         */
        async render_start() {

            // createjs.Ticker.addEventListener("tick", this.play_handler);

            this.render();
            if(this._clearid < 0) {
                this._clearid = setInterval(this.reticle_play_handler, (1000/RETICLE_FRAMERATE)); // スプライトシートアニメーションだけ独自のフレームレート
            }

        };

        /**
         * @implements
         */
        async render_stop() {

            // createjs.Ticker.removeEventListener("tick", this.play_handler);

            if(this.render_id) {
                cancelAnimationFrame(this.render_id);
            }
            clearInterval(this._clearid);
            this._clearid = -1;

        };

        // フレーム更新処理(tick)
        // play_handler = (evt) => {

        //     this.refresh();

        // };

        reticle_play_handler = (evt) => {


            if(this.render_id) {
                cancelAnimationFrame(this.render_id);
            }

            for(const [num, reticle] of this.reticles) {

                reticle.reticleAnim.tickEnabled = true;

            }

            this.render();

            for(const [num, reticle] of this.reticles) {

                reticle.reticleAnim.tickEnabled = false;

            }

        };

        // フレーム更新処理(requestAnimationFrame)
        render = () => {

            this.refresh();
            this.render_id = requestAnimationFrame(this.render);

        };

        refresh = () => {

            this.stage.update();

        };


        /**
         * UIスクリーンのイベントをターゲットのHTMLElementに透過して伝搬する。
         * 
         * @param {HTMLElement} targetElem HTMLElement。jQueryでラップしていないこと。
         */
        register_event_propagation({targetElem}) {

            var getNewMouseEvent = this._getNewMouseEvent;

            this.stage.on("stagemousedown", function(evt) {

                // if(this.getObjectUnderPoint(evt.stageX, evt.stageY, 0)) {
                //     // DisplayObjectの上ではイベントを伝搬しない
                //     return;
                // }
        
                targetElem.dispatchEvent(getNewMouseEvent(evt.nativeEvent));
        
            });
            this.stage.on("stagemousemove", function(evt){
        
                targetElem.dispatchEvent(getNewMouseEvent(evt.nativeEvent));

                // console.log("[Stage]", evt.stageX, evt.stageY); // 照準座標調査用

            });
            this.stage.on("stagemouseup", function(evt) {
        
                targetElem.dispatchEvent(getNewMouseEvent(evt.nativeEvent));
                
            });
            $(this.canvasElem).on("touchstart", {targetElem:targetElem}, this._touchstart_handler);
            $(this.canvasElem).on("touchend", {targetElem:targetElem}, this._touchend_handler);
            $(this.canvasElem).on("touchmove", {targetElem:targetElem}, this._touchmove_handler);
            $(this.canvasElem).on("touchcancel", {targetElem:targetElem}, this._touchcancel_handler);

        };

        _touchstart_handler = (evt) => {

            var touchEvt = evt.originalEvent;
            // if(this.stage.getObjectUnderPoint(touchEvt.offsetX, touchEvt.offsetY, 0)) {
            //     // DisplayObjectの上ではイベントを伝搬しない
            //     return;
            // }
            evt.data.targetElem.dispatchEvent(this._getNewTouchEvent(touchEvt));

        };

        _touchend_handler = (evt) => {

            var touchEvt = evt.originalEvent;
            evt.data.targetElem.dispatchEvent(this._getNewTouchEvent(touchEvt));

        };

        _touchmove_handler = (evt) => {

            var touchEvt = evt.originalEvent;
            evt.data.targetElem.dispatchEvent(this._getNewTouchEvent(touchEvt));

        };

        _touchcancel_handler = (evt) => {

            var touchEvt = evt.originalEvent;
            evt.data.targetElem.dispatchEvent(this._getNewTouchEvent(touchEvt));

        };

        /**
         * Dispatch用にMouseEventのコピーを生成して返却する。
         * @param {MouseEvent} evt 
         */
        _getNewMouseEvent(evt) {

            return new MouseEvent(evt.type, {
                screenX: evt.screenX,
                screenY: evt.screenY,
                clientX: evt.clientX,
                clientY: evt.clientY,
                ctrlKey: evt.ctrlKey,
                altKey:  evt.altKey,
                shiftKey:evt.shiftKey,
                metaKey: evt.metaKey,
                button:  evt.button,
                buttons: evt.buttons,
                relatedTarget: evt.relatedTarget,
                view:    evt.view,
                detail:  evt.detail,
                bubbles: false,
                movementX: evt.movementX,
                movementY: evt.movementY,
                offsetX: evt.offsetX,
                offsetY: evt.offsetY,
                pageX: evt.pageX,
                pageY: evt.pageY,
                region: evt.region,
                x: evt.x,
                y: evt.y      
            });
                
        }

        /**
         * Dispatch用にMouseEventのコピーを生成して返却する。
         * @param {TouchEvent} evt 
         */
        _getNewTouchEvent(evt) {

            return new TouchEvent(evt.type, {
                altKey: evt.altKey,
                bubbles: true,
                cancelBubble: evt.cancelBubble,
                cancelable: true,
                changedTouches: evt.changedTouches,
                composed: evt.composed,
                ctrlKey: evt.ctrlKey,
                // currentTarget: evt.currentTarget,
                defaultPrevented: evt.defaultPrevented,
                detail: evt.detail,
                eventPhase: evt.eventPhase,
                isTrusted: evt.isTrusted,
                metaKey: evt.metaKey,
                returnValue: evt.returnValue,
                shiftKey: evt.shiftKey,
                sourceCapabilities: evt.sourceCapabilities,
                // srcElement: evt.srcElement,
                // target: evt.target,
                targetTouches: evt.targetTouches,
                timeStamp: evt.timeStamp,
                touches: evt.touches,
                view: evt.view,
                which: evt.which
            });


        };
        
    }

	// モジュール公開
    g2e.contents.Video = Video;
    g2e.contents.ScenarioManager = ScenarioManager;
    g2e.contents.ContentPlayer = ContentPlayer;

} // global汚染対策