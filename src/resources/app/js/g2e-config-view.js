// //////////////////////////////////////////////////////
// Copyright (c) 2021 Luna's Torture Room / るなてぃっく
// Released under the MIT license
// http://opensource.org/licenses/mit-license.php
//
// //////////////////////////////////////////////////////

/**
 * g2e.config_view モジュール
 */
var g2e = g2e || {};

/**
 * g2e.config_view モジュール定義
 */
g2e.config_view = (function(){

	var transform_scale = g2e.viewsize.getScale();
	var config = g2e.config.getConfigValues();
	const _SAMPLE_TEXT = "サンプルの文字を表示しています。";
	var _sample_text_idx = 1;
	var button_back;
	var referrer;

	/**
	 * 1. $(id).slider(...);を実行する。※idはCSSセレクタ'#'を含む。ex) #bgmSlider
	 * 2. idにLowまたはUpをSuffixを付加してLowボタン、Upボタンのidとして要素を取得し、クリックイベントを登録する。
	 *    要素は$(".confSliderButton").button();で事前にボタン化されていること。
	 * 
	 */
	var createSlider = function({id, range="min", value=50, min=0, max=100}) {

		$(id).slider({range:range, value:value, min:min, max:max});

		$(id +"Low").on("click", function() {
	
			var newVal = $(id).slider("option", "value") - 1;
			if (newVal < 0) newVal = 0;
			$(id).slider("option", "value", newVal);
	
		});	
	
		$(id +"Up").on("click", function() {
	
			var newVal = $(id).slider("option", "value") + 1;
			if (newVal > max) newVal = max;
			$(id).slider("option", "value", newVal);
	
		});

	};

	// コンフィグ画面の遷移経路によりBackボタンの遷移先を変更
	var _button_back_handler = function() {

		// フェード
		$("#game-fade-curtain").fadeIn({duration: 500});

		if(referrer == "scenario") {
			location.href = "./scenario.html";
		}
		else {
			location.href = "./title.html";
		}

	};

	/**
	 * コンフィグ画面を表示する。
	 * $(document).ready(_initConfigView);
	 * 
	 */
	var initConfigView = function(evt) {

		// 最終表示ページをsession storageに保存
		referrer = g2e.session.SessionManager.getReferrer();
		g2e.session.SessionManager.setReferrer("config");

		/**
		 * バックボタン
		 */
		button_back = new g2e.widget.Button({id:"button_back", click:_button_back_handler});
		button_back.activateButton();

		/** 
		 * スライダー表示処理
		 */
		{

			// transform-scale設定時にスライダーハンドルがずれる対応
			var orgOuterWidth = $.fn.outerWidth;
			$.fn.outerWidth = function () { 
		
				var result = orgOuterWidth.apply(this, arguments);
		
				return result * transform_scale;
		
			}
		
			$(".confSliderButton").button();
			createSlider({id:"#bgmSlider", value:0});
			createSlider({id:"#seSlider", value:0});
			createSlider({id:"#voiceSlider", value:0});
			createSlider({id:"#lvoiceSlider", value:0});
			createSlider({id:"#textSpdSlider", value:0});

		}

		/** 初期値設定 */
		_setValues2View(); // Viewに値を設定

		/**
		 * イベント登録など
		 */
		{
			// ウィンドウサイズ
			$("input[name='game-window-size']").change(function() {
				_dispatchResize2Main();
			});
			$("#ws-fllscreen").change(function() {
				_dispatchResize2Main();
			});

			$(window).resize(function() {
				// リサイズが行われたらtransform-scaleをセットし直す。
				transform_scale = g2e.viewsize.getScale();
			});

			// Electron初期リサイズ
			var size = g2e.viewsize.getViewSizeByConfig(config);
			g2e.viewsize.dispatchResize2MainOnlyFirst(size);

			// 設定保存：値が変更されたら設定全体を保存する
			_registerChangeHandlers();

			// テキスト設定にマウスオーバーで文字速度アニメーション起動
			$("#text-setting-container").on("mouseenter", _textAnimationStart);

			// 文字速度変更で文字速度アニメーションを最初から起動＆速度変更
			$("#textSpdSlider").on("slidechange", _textAnimationStart);

			// ノーウェイト変更で文字速度アニメーションをノーウェイトに
			$("#text-nowait-on").change(_textAnimationStart);

			// テキスト設定からマウスが離れた時にアニメーション停止
			$("#text-setting-container").on("mouseleave", _textAnimationEnd);

		}

		// フェード
		$("#game-fade-curtain").fadeOut({duration: 1000});

		
	};

	var _textInterval;
	var _textDelay;
	// サンプルテキストのアニメーションをスタート
	var _textAnimationStart = function() {

		// setInterValを削除
		_clearDrawSampleText();

		if(config.is_text_nowait) {
			// ノーウェイトの場合
			_textDelay = setTimeout(_drawSampleTextNowait, 1500);
		}
		else{
			// 文字速度使用
			_textInterval = setInterval(_drawSampleText, _getTextDisplaySpeed());
		} 

	};

	// テキスト表示(ノーウェイト版)
	var _drawSampleTextNowait = function() {

		$(".text-speed-sample-common").text("");
		_textDelay = setTimeout(_textAnimationStart, 500);

	};

	// テキスト表示(文字速度版)
	var _drawSampleText = function() {

		$(".text-speed-sample-common").text(_SAMPLE_TEXT.substring(0, _sample_text_idx));
		_sample_text_idx++;
		if(_sample_text_idx > 16) {
			_clearDrawSampleText();
			// アニメーションのディレイを入れる
			_textDelay = setTimeout(_textAnimationStart, 500);
		}

	};

	// テキストのアニメーション表示を停止する。
	var _textAnimationEnd = function() {

		// setInterValを削除
		_clearDrawSampleText();
		$(".text-speed-sample-common").text(_SAMPLE_TEXT);

	};

	// テキストのアニメーション表示処理をクリアする。
	var _clearDrawSampleText = function() {

		clearInterval(_textInterval);
		clearTimeout(_textDelay);
		$(".text-speed-sample-common").text(_SAMPLE_TEXT);
		_sample_text_idx = 1;

	};

	// スライダーから文字速度を取得する。最速1文字10ms 最低1文字200ms
	var _getTextDisplaySpeed = function() {

		var x = $("#textSpdSlider").slider("option", "value");

		return -1.9 * x + 200;

	};

	/**
	 * ウィンドウサイズ・フルスクリーン選択時にメインプロセスにリサイズを送信する。
	 */
	var _dispatchResize2Main = function() {

		var size = _getSelectedViewSize();

		g2e.viewsize.dispatchResize2Main(size);

	};

	// リサイズ後の幅・高さ・フルスクリーン(Boolean)を取得する。
	var _getSelectedViewSize = function() {

		var sizeLabel = $("input[name='game-window-size']:checked").attr("id");
		var fullscreen = $("#ws-fllscreen").prop("checked");

		var ret = _getViewSizeById(sizeLabel);
		ret.fullscreen = fullscreen;

		return ret;

	};

	// ウィンドウサイズ(radio)からリサイズ後の幅と高さを取得する。
	var _getViewSizeById = function(id) {

		if(id=="ws-1280-720") {
			return {width:1280, height : 720};
		}
		else {
			return {width:1920, height : 1080};			
		}

	};

	// Viewの各項目に設定ファイル(localStorage)から読み込んだ値を反映させる。
	var _setValues2View = function() {

		$("#" + config.window_size).prop("checked", true); // ウィンドウサイズ
		$("#ws-fllscreen").prop("checked", config.fullscreen); // フルスクリーン
		$("#bgmSlider").slider({value : config.volume_bgm}); // BGM
		$("#seSlider").slider({value : config.volume_se}); // SE
		$("#voiceSlider").slider({value : config.volume_voice}); // VOICE
		$("#lvoiceSlider").slider({value : config.volume_lvoice}); // L.VOICE
		$("#" + config.is_outline).prop("checked", true); // 輪郭線
		$("#mv-framerate-60fps").prop("checked", config.is_60fps); // 60fps動画
		$("#text-nowait-on").prop("checked", config.is_text_nowait); // ノーウェイト
		$("#textSpdSlider").slider({value : config.text_speed}); // 文字速度

	};

	// 値変更時の処理を登録
	var _registerChangeHandlers = function() {

		$("input[name='game-window-size']").change(_saveValuesFromView); // ウィンドウサイズ
		$("#ws-fllscreen").change(_saveValuesFromView); // フルスクリーン
		$("#bgmSlider").slider({change : _saveValuesFromView}); // BGM
		$("#seSlider").slider({change : _saveValuesFromView}); // SE
		$("#voiceSlider").slider({change : _saveValuesFromView}); // VOICE
		$("#lvoiceSlider").slider({change : _saveValuesFromView}); // L.VOICE
		$("input[name='game-outline-onoff']").change(_saveValuesFromView); // 輪郭線
		$("#mv-framerate-60fps").change(_saveValuesFromView); // 60fps動画
		$("#text-nowait-on").change(_saveValuesFromView); // ノーウェイト
		$("#textSpdSlider").slider({change : _saveValuesFromView}); // 文字速度

	};

	// Viewの全項目の現在の値を取得し、configプロパティと設定ファイル(localStorage)を更新する。
	var _saveValuesFromView = function() {

		_setValuesFromView();
		g2e.config.saveConfigValues(config);

	};

	// Viewの全項目の現在の値を取得し、configプロパティを更新する。
	var _setValuesFromView = function () {

		config.window_size = $("input[name='game-window-size']:checked").attr("id"); // ウィンドウサイズ
		config.fullscreen = $("#ws-fllscreen").prop("checked"); // フルスクリーン
		config.volume_bgm = $("#bgmSlider").slider("option", "value"); // BGM
		config.volume_se = $("#seSlider").slider("option", "value"); // SE
		config.volume_voice = $("#voiceSlider").slider("option", "value"); // VOICE
		config.volume_lvoice = $("#lvoiceSlider").slider("option", "value"); // L.VOICE
		config.is_outline = $("input[name='game-outline-onoff']:checked").attr("id"); // 輪郭線
		config.is_60fps = $("#mv-framerate-60fps").prop("checked"); // 60fps動画
		config.is_text_nowait = $("#text-nowait-on").prop("checked"); // ノーウェイト
		config.text_speed = $("#textSpdSlider").slider("option", "value"); // 文字速度

	};

	/** 公開モジュール */
	return {
		createSlider : createSlider,
		initConfigView : initConfigView
	};

}());

// 画面リサイズを有効化(viewsize内transform-scale初期化)
g2e.viewsize.activeFixViewResize();

// コンフィグ画面表示初期化
$(document).ready(g2e.config_view.initConfigView);

