// //////////////////////////////////////////////////////
// Copyright (c) 2021 Luna's Torture Room / るなてぃっく
// Released under the MIT license
// http://opensource.org/licenses/mit-license.php
//
// //////////////////////////////////////////////////////

/**
 * g2e.end_credit_view モジュール
 */
var g2e = g2e || {};

/**
 * g2e.end_credit_view モジュール定義
 */
g2e.end_credit_view = (function () {

	var config = g2e.config.getConfigValues();

    var initView = async function () {

		// 最終表示ページをsession storageに保存
		referrer = g2e.session.SessionManager.getReferrer();
		g2e.session.SessionManager.setReferrer("end-credit");
        
		// Electron初期リサイズ
		var size = g2e.viewsize.getViewSizeByConfig(config);
		g2e.viewsize.dispatchResize2MainOnlyFirst(size);
        
        // イベントハンドラー
        $(document).on('keydown', _keydownHandler);
        $("#init-button").click(moveTo_scenario);
        $("#title-button").click(moveTo_title);

        g2e.common.Transition.fadeOut({duration:1000});

        var remain = 4;
        var intId = setInterval(() => {
            $("#title-button").text("タイトルへ(T) - " + remain-- + "s");
            if(remain < 0) {
                clearInterval(intId);
                g2e.common.Transition.fadeIn({complete:moveTo_title});
            }
        }, 1000);

    };

    var _keydownHandler = function(evt) {

        if(evt.which == 13 || evt.which == 32 || evt.which == 27) { // Enter or Space or Escでタイトルへ
            moveTo_title();
        }

        if(evt.which == 83) { // Sキーでシナリオの最初へ
            moveTo_scenario();
        }

        if(evt.which == 84) { // Tキーでタイトルへ
            moveTo_title();
        }

    };

    var moveTo_title = function() {

        location.href = "./title.html";

    };

    var moveTo_scenario = function() {

        location.href = "./scenario.html";

    };

    /** 公開モジュール */
    return {
        initView: initView
    };

}());

// 画面リサイズを有効化(viewsize内transform-scale初期化)
g2e.viewsize.activeFixViewResize();
$(document).ready(g2e.end_credit_view.initView);