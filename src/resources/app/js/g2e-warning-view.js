// //////////////////////////////////////////////////////
// Copyright (c) 2021 Luna's Torture Room / るなてぃっく
// Released under the MIT license
// http://opensource.org/licenses/mit-license.php
//
// //////////////////////////////////////////////////////

/**
 * g2e.warning_view モジュール
 */
var g2e = g2e || {};

/**
 * g2e.warning_view モジュール定義
 */
g2e.warning_view = (function () {

    var config = g2e.config.getConfigValues();
    var clearid = null;

    var initWarningView = function () {

		// 最終表示ページをsession storageに保存
		referrer = g2e.session.SessionManager.getReferrer();
		g2e.session.SessionManager.setReferrer("warning");
        
		// Electron初期リサイズ
		var size = g2e.viewsize.getViewSizeByConfig(config);
        g2e.viewsize.dispatchResize2MainOnlyFirst(size);
        
        g2e.common.Transition.fadeOut();
        
        clearid = setTimeout(_page_next, 4500);

        _registerHandler();
        
    };

    var _registerHandler = function() {

        $(document).on('keydown', _keydownHandler);
        $(document).click(_page_next);
        $(document).on('contextmenu', _cancel_intro);

    };

    var _keydownHandler = function(evt) {

        if(evt.which == 13 || evt.which == 32) { // Enter or Spaceで次の画面へ
            _page_next();
        }

        if(evt.which == 27) { // Escで即タイトル画面へ
            _cancel_intro();
        }

    };

    var _page_next = function() {

        clearTimeout(clearid);
        g2e.common.Transition.fadeIn({complete:() => {location.href = "./intro.html";}});

    };

    var _cancel_intro = function() {

        clearTimeout(clearid);
        g2e.common.Transition.fadeIn({complete:() => {location.href = "./title.html";}});

    };

    /** 公開モジュール */
    return {
        initWarningView: initWarningView
    };

}());

// 画面リサイズを有効化(viewsize内transform-scale初期化)
g2e.viewsize.activeFixViewResize();
$(document).ready(g2e.warning_view.initWarningView);