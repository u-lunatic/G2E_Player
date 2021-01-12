// //////////////////////////////////////////////////////
// Copyright (c) 2021 Luna's Torture Room / るなてぃっく
// Released under the MIT license
// http://opensource.org/licenses/mit-license.php
//
// //////////////////////////////////////////////////////

/**
 * g2e.viewsize モジュール
 */
var g2e = g2e || {};


/**
 * g2e.viewsize モジュール定義
 */
g2e.viewsize = (function () {

	const _SCALE_BASE_WIDTH = 1920; // スケールする前のコンテンツの幅
	const _SCALE_BASE_HEIGHT = 1080; // スケールする前のコンテンツの高さ
	var _transform_scale = 1.0; // スケール比率(CSSのtransform:scale(...))と対応)

	var _ipcRenderer = g2e.ipc.ipcRenderer;

	/**
	 * リサイズ処理のイベントハンドラを登録する。(固定画面用：表示領域のidがgame-background-fixのもの)
	 * リサイズ後のスケールが必要な場合は呼び出しモジュール側でgetScale()を使用して取得すること。
	 * $(document).ready()でリサイズイベントを強制的に発火する。
	 */
	var activeFixViewResize = function() {

		$(window).resize(_resizeFixViewHandler);
		$(document).ready(function(){$(window).trigger("resize");});		

	};

	/**
	 * スクロール画面用のリサイズイベントハンドラ登録処理。
	 */
	var activeScrollViewResize = function() {

		$(window).resize(_resizeScrollViewHandler);
		$(document).ready(function(){$(window).trigger("resize");});		

	};

	/**
	 * HTMLのリサイズ処理を行う。(固定画面用) 
	 */
	var _resizeFixViewHandler = function (evt, isScroll=false) {

		var tgtWidth = evt.target.innerWidth;
		var tgtHeight = evt.target.innerHeight;
		var id = isScroll ? '#game-background-scroll' : '#game-background-fix';

		var ret = getScaleBySize(tgtWidth, tgtHeight);
		_transform_scale = ret.scale;
		setGameBackgroundFixScale({...ret, id:id});

		sessionStorage.setItem("app_height", tgtHeight);
		sessionStorage.setItem("app_width", tgtWidth);

	};

	/**
	 * HTMLのリサイズ処理を行う。(スクロール画面用) 
	 */
	var _resizeScrollViewHandler = function (evt) {

		_resizeFixViewHandler(evt, true);

	};

	/**
	 * ゲーム描画領域(FIX用 id:game-background-fix)にスケールを設定する。
	 */
	var setGameBackgroundFixScale = function({id, scale=1.0, margin_left=0, margin_right=0, margin_top=0, margin_bottom=0}) {

		$(id).css({
			"transform" : "scale(" + scale + ", " + scale + ")",
			"margin-left" : margin_left,
			"margin-right" : margin_right,
			"margin-top" : margin_top,
			"margin-bottom" : margin_bottom
		});

	};

	/**
	 * 幅と高さからリサイズのスケールと余白のサイズ(px)を取得する。
	 * 
	 * @param {*} width :innerWidth
	 * @param {*} height  :innerHeight
	 */
	var getScaleBySize = function(width=_SCALE_BASE_WIDTH, height=_SCALE_BASE_HEIGHT) {

		var segWidth = width / 16;
		var segHeight = height / 9;
		var scale = 1.0;
		var margin_left = 0;
		var margin_right = 0;
		var margin_top = 0;
		var margin_bottom = 0;
		var margin_all = 0;
		if (segWidth == segHeight || segWidth > segHeight) {
			// 縦の高さ=innnerHeightとして拡縮、左右に余白。
			scale = height / _SCALE_BASE_HEIGHT;
			margin_all = width - _SCALE_BASE_WIDTH * scale;
			margin_left = margin_right = parseInt(margin_all / 2);
		} else {
			// 横の長さ=innerWidthとして拡縮し、上下に余白。
			scale = width / _SCALE_BASE_WIDTH;
			margin_all = height - _SCALE_BASE_HEIGHT * scale;
			margin_top = margin_bottom = parseInt(margin_all / 2);
		}

		return {scale, margin_left, margin_right, margin_top, margin_bottom};

	};

	/**
	 * リサイズ処理が1回も行われていない場合は初期値の1.0が返却される。
	 * 適切な値が必要な場合は、グローバルスコープなどでg2e.viewsize.activeFixViewResize()などを呼び出してリサイズ処理が行われるようにすること。
	 */
	var getScale = function() {

		var height = sessionStorage.getItem("app_height");
		height = height ? height : window.innerHeight;
		var width = sessionStorage.getItem("app_width");
		width = width ? width : window.innerWidth;
		_transform_scale = getScaleBySize(width, height).scale;

		return _transform_scale;

	}

	/**
	 * サイズを指定してメインプロセスにビューポートのリサイズを送信する。
	 */
	var dispatchResize2Main = function ({ width, height, fullscreen = false }) {

		if (_ipcRenderer) {
			_ipcRenderer.send('REQUEST_RESIZE', arguments[0]);
		}

	};

	/**
	 * アプリ起動から一度だけメインプロセスにビューポートのリサイズを送信する。(sessionStorage)
	 */
	var dispatchResize2MainOnlyFirst = function({ width, height, fullscreen = false }) {

		var key = "init_app_windowsize";
		var val = "done";
		var init = sessionStorage.getItem(key);
		if(init != val) {
			dispatchResize2Main({width:width, height:height, fullscreen:fullscreen});
		}
		sessionStorage.setItem(key, val);

	}

	/**
	 * コンフィグオブジェクトからリサイズ処理用のオブジェクトを返却する。
	 * 
	 * @param config g2e.config.getConfigValues()から取得したコンフィグオブジェクト 
	 */
	var getViewSizeByConfig = function(config) {

		var id = config.window_size;
		var fullscreen = config.fullscreen;
		if(id=="ws-1280-720") {
			return {width:1280, height : 720, fullscreen: fullscreen};
		}
		else {
			return {width:1920, height : 1080, fullscreen: fullscreen};			
		}

	};


	/** 公開モジュール */
	return {
		activeFixViewResize: activeFixViewResize,
		activeScrollViewResize: activeScrollViewResize,
		dispatchResize2Main: dispatchResize2Main,
		getScale: getScale,
		getScaleBySize: getScaleBySize,
		setGameBackgroundFixScale: setGameBackgroundFixScale,
		dispatchResize2MainOnlyFirst:dispatchResize2MainOnlyFirst,
		getViewSizeByConfig: getViewSizeByConfig
	};

}());
