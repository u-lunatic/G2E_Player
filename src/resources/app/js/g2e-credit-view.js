// //////////////////////////////////////////////////////
// Copyright (c) 2021 Luna's Torture Room / るなてぃっく
// Released under the MIT license
// http://opensource.org/licenses/mit-license.php
//
// //////////////////////////////////////////////////////

/**
 * g2e.credit_view モジュール
 */
var g2e = g2e || {};

/**
 * g2e.credit_view モジュール定義
 */
g2e.credit_view = (function () {

	var config = g2e.config.getConfigValues();
    const PATH_ROOT_APP = g2e.common.PATH_ROOT_APP;
    const PATH_ROOT_CONT = g2e.common.PATH_ROOT_CONT;

    var initCreditView = function () {

		// 最終表示ページをsession storageに保存
		referrer = g2e.session.SessionManager.getReferrer();
		g2e.session.SessionManager.setReferrer("credit");
        
		// Electron初期リサイズ
		var size = g2e.viewsize.getViewSizeByConfig(config);
        g2e.viewsize.dispatchResize2MainOnlyFirst(size);

        // 各シーンのクレジットを読み込んで表示
        if (g2e.ipc.isElectron()) {

            _load_scene_credit();

        }
        
        g2e.common.Transition.fadeOut();
        
        _registerHandler();

    };

    var _registerHandler = function() {

        $(document).on('keydown', _keydownHandler);
        $(document).click(_back_to);
        $(document).on('contextmenu', _back_to);

    };

    var _keydownHandler = function(evt) {

        if(evt.which == 13 || evt.which == 32 || evt.which == 27) { // Enter or Space or Escで次の画面へ
            _back_to();
        }

    };

    var _back_to = function() {

        g2e.common.Transition.fadeIn();
        location.href = "./title.html";

    };

    var _load_scene_credit = function() {

        const fs = nodeRequire('fs');
        const dirStory = fs.readdirSync(PATH_ROOT_APP, {withFileTypes:true});

        for(const v of dirStory) {

            if(!v.isDirectory) {
                continue;
            }

            let path_sf = PATH_ROOT_APP + v.name + "/scenario/scene.json";
            if(!fs.existsSync(path_sf)) {
                continue;
            }

            // シーン設定ファイル読み込み
            let sf = fs.readFileSync(path_sf, 'utf8');
            let obj_sf = JSON.parse(sf);

            var creditElm = $("#credit-container");
            creditElm.append($("<div></div>", {addClass:"credit-chapter"}).text("■クレジット(" + obj_sf.title + ")"));
            creditElm.append($("<div></div>", {addClass:"credit-text"}).append($("<pre></pre>").text(obj_sf.credit)));

        }

    };

    /** 公開モジュール */
    return {
        initCreditView: initCreditView
    };

}());

// 画面リサイズを有効化(viewsize内transform-scale初期化)
g2e.viewsize.activeScrollViewResize();
$(document).ready(g2e.credit_view.initCreditView);