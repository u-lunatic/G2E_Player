// //////////////////////////////////////////////////////
// Copyright (c) 2021 Luna's Torture Room / るなてぃっく
// Released under the MIT license
// http://opensource.org/licenses/mit-license.php
//
// //////////////////////////////////////////////////////

/**
 * g2e.session モジュール
 */
var g2e = g2e || {};
g2e.session = g2e.session || {};

{

    class SessionManager {

        /**
         * リファラをセッションに保存する。
         * タイトル画面 "title"
         * コンフィグ画面 "config"
         * シナリオ画面 "scenario"
         * 
         * @param {String} referrer 画面遷移時のリファラ
         */
        static setReferrer(referrer) {

            sessionStorage.setItem("referrer", referrer);

        };

        /**
         * 前画面のリファラーを取得する。
         */
        static getReferrer() {

            return sessionStorage.getItem("referrer");

        };

        /**
         * sessionStorageからリファラ情報を消去する。
         */
        static removeReferrer() {

            sessionStorage.removeItem("referrer");

        };
    
        /**
         * カメラ番号をセッションに保存する。
         * 
         * @param {any} cam カメラ番号 1/2/3/360 
         */
        static setCamera(cam) {

            sessionStorage.setItem("camera", cam);

        };

        /**
         * カメラ番号をセッションから取得する。
         * 
         * @returns {Number}
         */
        static getCamera() {

            return parseInt(sessionStorage.getItem("camera"));

        };

        /**
         * カメラ番号をセッションから消去する。
         */
        static removeCamera() {

            sessionStorage.removeItem("camera");

        };

        static setSceneID(id) {

            sessionStorage.setItem("scene_id", id);

        };

        static getSceneID() {

            return sessionStorage.getItem("scene_id");

        };

        static removeSceneID() {

            sessionStorage.removeItem("scene_id");

        };

        /**
         * 再生中のカット番号をセッションに保存する。
         * 
         * @param {String} id 
         */
        static setCutID(id) {

            sessionStorage.setItem("cut_id", id);

        };

        /**
         * 再生中のカット番号をセッションから取得する。
         */
        static getCutID() {

            return sessionStorage.getItem("cut_id");

        };

        /**
         * カット番号をセッションから消去する。
         */
        static removeCutID() {

            sessionStorage.removeItem("cut_id");

        };

        /**
         * 再生中のビデオの現在時間(sec)をセッションに保存する。
         * 
         * @param {Float} time[sec]
         */
        static setCurrentTime(time) {

            sessionStorage.setItem("currTime", time);

        };

        /**
         * 再生していたビデオのシーク時間(sec)をセッションから取得する。
         */
        static getCurrentTime() {

            return parseFloat(sessionStorage.getItem("currTime"));

        };

        /**
         * シーク時間をセッションから消去する。
         */
        static removeCurrentTime() {

            sessionStorage.removeItem("currTime");

        };

        /**
         * コンテンツの再生状態をセッションに保存する。
         * @see g2e.contents.ContentPlayer.play_state
         * 
         * @param {String} state 
         */
        static setPlayState(state) {

            sessionStorage.setItem("play_state", state);

        };

        /**
         * コンテンツの再生状態をセッションから取得する。
         * @see g2e.contents.ContentPlayer.play_state
         */
        static getPlayState() {

            return sessionStorage.getItem("play_state");

        };

        /**
         * コンテンツの再生状態をセッションから消去する。
         */
        static removePlayState() {

            sessionStorage.removeItem("play_state");

        };

        /**
         * 現在再生中の音声のレジューム用のキューデータを保存する。
         * 
         * @param {Object} cue_data 音声関連のキューデータ snd_bgm/snd_se/snd_voc/snd_lvoc 
         */
        static setPlayingSounds(cue_data) {

            sessionStorage.setItem("sound_playing", JSON.stringify(cue_data));

        };

        /**
         * 音声レジューム用のキューデータをセッションから取得する。
         * 
         * @returns {Object} 音声関連のキューデータ
         */
        static getPlayingSounds() {

            var str = sessionStorage.getItem("sound_playing");
            return str ? JSON.parse(str) : {};

        };

        /**
         * 音声キューデータをセッションから消去する。
         */
        static removePlayingSounds() {

            sessionStorage.removeItem("sound_playing");

        };

        /**
         * 再生中の文字シナリオデータをレジューム用に保存する。
         */
        static setPlayingLetters(data) {

            sessionStorage.setItem("letters_playing", JSON.stringify(data));

        };

        /**
         * 文字シナリオのレジューム用データを取得する。
         * 
         * @returns {Object} 文字シナリオのレジュームデータ。レジューム不要の場合null
         */
        static getPlayingLetters() {

            var str = sessionStorage.getItem("letters_playing");
            return str ? JSON.parse(str) : null;

        };

        /**
         * 文字シナリオのレジュームデータを消去する。
         */
        static removePlayingLetters() {

            sessionStorage.removeItem("letters_playing");

        };

    }

	// モジュール公開
    g2e.session.SessionManager = SessionManager;

} // global汚染対策