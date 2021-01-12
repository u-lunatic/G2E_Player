// //////////////////////////////////////////////////////
// Copyright (c) 2021 Luna's Torture Room / るなてぃっく
// Released under the MIT license
// http://opensource.org/licenses/mit-license.php
//
// //////////////////////////////////////////////////////

/**
 * g2e.intro_view モジュール
 */
var g2e = g2e || {};

/**
 * g2e.intro_view モジュール定義
 */
g2e.intro_view = (function () {

	var config = g2e.config.getConfigValues();

    var initIntroView = function () {

		// 最終表示ページをsession storageに保存
		referrer = g2e.session.SessionManager.getReferrer();
		g2e.session.SessionManager.setReferrer("intro");
        
		// Electron初期リサイズ
		var size = g2e.viewsize.getViewSizeByConfig(config);
        g2e.viewsize.dispatchResize2MainOnlyFirst(size);

        $("#intro-movie").on("ended", _cancel_intro);
        
        g2e.common.Transition.fadeOut();
        
        _registerHandler();
        
    };

    var _registerHandler = function() {

        $(document).on('keydown', _keydownHandler);
        $(document).click(_cancel_intro);
        $(document).on('contextmenu', _cancel_intro);

    };

    var _keydownHandler = function(evt) {

        if(evt.which == 13 || evt.which == 32 || evt.which == 27) { // Enter or Space or Escで次の画面へ
            _cancel_intro();
        }

    };

    var _cancel_intro = function() {

        g2e.common.Transition.fadeIn({complete:() => {location.href = "./title.html";}});

    };

    /** 公開モジュール */
    return {
        initIntroView: initIntroView
    };

}());

// 画面リサイズを有効化(viewsize内transform-scale初期化)
g2e.viewsize.activeFixViewResize();
$(document).ready(g2e.intro_view.initIntroView);