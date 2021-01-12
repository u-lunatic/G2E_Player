// //////////////////////////////////////////////////////
// Copyright (c) 2021 Luna's Torture Room / るなてぃっく
// Released under the MIT license
// http://opensource.org/licenses/mit-license.php
//
// //////////////////////////////////////////////////////

/**
 * g2e.title_view モジュール
 */
var g2e = g2e || {};

/**
 * g2e.title_view モジュール定義
 */
g2e.title_view = (function () {

	var config = g2e.config.getConfigValues();

    var initTitleView = function () {

		// 最終表示ページをsession storageに保存
		referrer = g2e.session.SessionManager.getReferrer();
		g2e.session.SessionManager.setReferrer("title");
        
		// Electron初期リサイズ
		var size = g2e.viewsize.getViewSizeByConfig(config);
		g2e.viewsize.dispatchResize2MainOnlyFirst(size);
        
        if(referrer == "scenario") {
            $("#game-fade-curtain").hide();
            _showTitle();
        }
        else {
            $("#game-fade-curtain").fadeOut({
                duration: 1000,
                complete:_showTitleByAnim
            });    
        }

        _registerHandler();
        
    };

    var _startButton;
    var _configButton;
    var _creditButton;
    var _galleryButton;
    var _quitButton;
    var _licenseButton;
    var _registerHandler = function() {

        // STARTボタン
        _startButton = new g2e.widget.Button({id:"button_start", click:_startButton_handler}).activateButton();
        // CONFIGボタン
        _configButton = new g2e.widget.Button({id:"button_config", click:_configButton_handler}).activateButton();
        // GALLERYボタン
        _galleryButton = new g2e.widget.Button({id:"button_gallery", click:_galleryButton_handler}).activateButton();
        // CREDITボタン
        // _creditButton = new g2e.widget.Button({id:"button_credit", click:_creditButton_handler}).activateButton();
        _creditButton = new g2e.widget.Button({id:"credit-container", click:_creditButton_handler}).activateButton();
        // QUITボタン
        _quitButton = new g2e.widget.Button({id:"button_quit", click:_quitButton_handler}).activateButton();

        // LICENSEボタン
        _licenseButton = new g2e.widget.Button({id:"license-container", click:_licenseButton_handler}).activateButton();

    }

    var _startButton_handler = function() {

        _fade_nextPage();
        location.href = "./scenario.html";

    }

    var _configButton_handler = function() {

        _fade_nextPage();
        location.href = "./config.html";

    }

    var _galleryButton_handler = function() {

        $("#message-container").one('animationend', ()=>{ $("#message-container").removeClass("message-anim") }).addClass("message-anim");
        // location.href = "./gallery.html";

    }

    var _creditButton_handler = function() {

        _fade_nextPage();
        location.href = "./credit.html";

    }

    var _quitButton_handler = function() {

        _fade_nextPage();
        var _ipcRenderer = g2e.ipc.ipcRenderer;
		if (_ipcRenderer) {
			_ipcRenderer.send('REQUEST_QUIT');
        }
        else {
            location.href = "./index.html";
        }


    }

    var _licenseButton_handler = function() {

        _fade_nextPage();
        location.href = "./license.html";

    };

    var _fade_nextPage = function() {

		$("#game-fade-curtain").fadeIn({duration: 500});

    };

    var _showTitle = function () {

        $("#bg-header").css({
            "-webkit-mask-image": "linear-gradient(to right, rgba(0,0,0,1) 0%,rgba(0,0,0,1) 100%,rgba(0,0,0,0) 100%,rgba(0,0,0,0) 100%)"
        });
        $("#bg-footer").css({
            "-webkit-mask-image": "linear-gradient(to left, rgba(0,0,0,1) 0%,rgba(0,0,0,1) 100%,rgba(0,0,0,0) 100%,rgba(0,0,0,0) 100%)"
        });
        $(".footer-reveal").css({ opacity: 1.0 });
    };

    var _showTitleByAnim = function () {

        _startHeaderAnim();

    };

    var _hInterval;
    var _hLeftGrad = 0;
    var _hRightGrad = 10;
    var _bgHeader;
    var _fInterval;
    var _fLeftGrad = 0;
    var _fRightGrad = 10;
    var _bgFooter;
    const _ANIM_INTERVAL = 4;
    const _ANIM_STEP = 2;
    const _ANIM_DISP_TIME = 600;
    const _ANIM_DELAY_TIME = 200;
    var _startHeaderAnim = function () {

        _hInterval = setInterval(_continueHeaderAnim, _ANIM_INTERVAL);
        _bgHeader = $("#bg-header");

    };

    var _continueHeaderAnim = function () {

        _bgHeader.css({
            "-webkit-mask-image": "linear-gradient(to right, rgba(0,0,0,1) 0%,rgba(0,0,0,1) " + _hLeftGrad + "%,rgba(0,0,0,0) " + _hRightGrad + "%,rgba(0,0,0,0) 100%)"
        });

        if (_hLeftGrad < 100) {
            _hLeftGrad = _hLeftGrad + _ANIM_STEP;
        }
        else {
            clearInterval(_hInterval);
            _startFooterAnim();
        }
        if (_hRightGrad < 100) {
            _hRightGrad = _hRightGrad + _ANIM_STEP;
        }

    };

    var _startFooterAnim = function () {

        _fInterval = setInterval(_continueFooterAnim, _ANIM_INTERVAL);
        _bgFooter = $("#bg-footer");

    };

    var _continueFooterAnim = function () {

        _bgFooter.css({
            "-webkit-mask-image": "linear-gradient(to left, rgba(0,0,0,1) 0%,rgba(0,0,0,1) " + _fLeftGrad + "%,rgba(0,0,0,0) " + _fRightGrad + "%,rgba(0,0,0,0) 100%)"
        });

        if (_fLeftGrad < 100) {
            _fLeftGrad = _fLeftGrad + _ANIM_STEP;
        }
        else {
            clearInterval(_fInterval);
            $(".footer-reveal").delay(_ANIM_DELAY_TIME).animate(
                { opacity: 1.0 }, // CSS Property
                { // Options
                    duration: _ANIM_DISP_TIME
                });
        }
        if (_fRightGrad < 100) {
            _fRightGrad = _fRightGrad + _ANIM_STEP;
        }

    };

    /** 公開モジュール */
    return {
        initTitleView: initTitleView
    };

}());

// 画面リサイズを有効化(viewsize内transform-scale初期化)
g2e.viewsize.activeFixViewResize();
$(document).ready(g2e.title_view.initTitleView);