// //////////////////////////////////////////////////////
// Copyright (c) 2021 Luna's Torture Room / るなてぃっく
// Released under the MIT license
// http://opensource.org/licenses/mit-license.php
//
// //////////////////////////////////////////////////////

/**
 * g2e.license_view モジュール
 */
var g2e = g2e || {};

/**
 * g2e.license_view モジュール定義
 */
g2e.license_view = (function () {

	var config = g2e.config.getConfigValues();

    var initLicenseView = function () {

		// 最終表示ページをsession storageに保存
		referrer = g2e.session.SessionManager.getReferrer();
		g2e.session.SessionManager.setReferrer("license");
        
		// Electron初期リサイズ
		var size = g2e.viewsize.getViewSizeByConfig(config);
        g2e.viewsize.dispatchResize2MainOnlyFirst(size);
        
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

    /** 公開モジュール */
    return {
        initLicenseView: initLicenseView
    };

}());

// 画面リサイズを有効化(viewsize内transform-scale初期化)
g2e.viewsize.activeFixViewResize();
$(document).ready(g2e.license_view.initLicenseView);