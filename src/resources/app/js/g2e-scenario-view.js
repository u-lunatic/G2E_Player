// //////////////////////////////////////////////////////
// Copyright (c) 2021 Luna's Torture Room / るなてぃっく
// Released under the MIT license
// http://opensource.org/licenses/mit-license.php
//
// //////////////////////////////////////////////////////

/**
 * g2e.scenario_view モジュール
 */
var g2e = g2e || {};

/**
 * g2e.scenario_view モジュール定義
 */
g2e.scenario_view = (function () {

    var transform_scale = g2e.viewsize.getScale();
    var config = g2e.config.getConfigValues();
    var _ipcRenderer = g2e.ipc.ipcRenderer;
    var referrer;

    var initView = function () {

        // 最終表示ページをsession storageに保存
		referrer = g2e.session.SessionManager.getReferrer();
        g2e.session.SessionManager.setReferrer("scenario");
        
        // ローディングを表示
        g2e.common.Loading.getInstance().start();

        g2e.common.Transition.fadeOut();

        // 操作コントローラー初期化
        _initController();

        // テキスト表示欄初期化
        _initTextScnField();

        $(window).resize(function () {
            // リサイズが行われたらtransform-scaleをセットし直す。
            transform_scale = g2e.viewsize.getScale();
        });

        // Electron初期リサイズ
        var size = g2e.viewsize.getViewSizeByConfig(config);
        g2e.viewsize.dispatchResize2MainOnlyFirst(size);

        // シナリオ再生処理
        if (!g2e.ipc.isElectron()) {
            // Electronでない場合は処理を終了。
            g2e.common.Loading.getInstance().stop();
            return;
        }

        // フォーカス禁止
        $(document).click(function(evt){ document.activeElement.blur(); });

        // Movie And Reticle Canvas
        _initScenario();

    };

    var player;
    var _initScenario = async function() {

        player = new g2e.contents.ContentPlayer();

        _registerButtons2Player(player); // ContentPlayerにコントローラーのボタンを登録

        _playButton.switchTo({id:"button_pause"}); // playボタン再生状態

        $(player).on("dispatch_cam", _dispatch_cam_handler); // プレイヤーからのカメラアングル通知

        $(player).on("dispatch_reticle", _dispatch_reticle_handler); // プレイヤーからのレティクル有効通知

        $(document).on('keydown', _handler_spacekey); // スペースキー押下時の動作

        _ipcRenderer.on('WINDOW_MINIMIZE', _forcePause); // ウィンドウ最小化時に強制的にポーズする
        _ipcRenderer.on('WINDOW_RESTORE', _repairPause); // 最大化時にHtmlVideoElement.paused=trueとなり続けることの対応

        await player.start({resume:(referrer == "config")});

        // Loadingを解除
        g2e.common.Loading.getInstance().stop();

    };

    var _initTextScnField = function() {

        $('#textscn_container').draggable({
            start: function (evt, ui) {
            },
            drag: function (evt, ui) {
                ui.position.left = ui.position.left / transform_scale;
                ui.position.top = ui.position.top / transform_scale;
            }
        });

    };

    var is_ui_visible = true;
    var _handler_spacekey = function (evt) {

        if(evt.which == 32) {
            _toggle_ui_visible();
        }

    };

    var _toggle_ui_visible = function() {

        is_ui_visible = is_ui_visible ? false : true;

        // プレイヤー管理のオブジェクトを非表示(文字ウィンドウ、照準など)
        player.setUIvisible(is_ui_visible);

        // コントローラーを非表示
        _controller_visible();

    };

    var _controller_visible = function() {

        if(is_ui_visible) {
            $("#game-controller-container").show();
        }
        else {
            $("#game-controller-container").hide();
        }

    };

    var _registerButtons2Player = function(player) {

        player.gc_buttons.set(_playButton.button_id, _playButton);
        player.gc_buttons.set(_nextButton.button_id, _nextButton);
        player.gc_buttons.set(_prevButton.button_id, _prevButton);
        player.gc_buttons.set(_nextScnButton.button_id, _nextScnButton);
        player.gc_buttons.set(_prevScnButton.button_id, _prevScnButton);
        player.gc_buttons.set(_skipButton.button_id, _skipButton);
        player.gc_buttons.set(_autoButton.button_id, _autoButton);
        player.gc_buttons.set(_configButton.button_id, _configButton);
        player.gc_buttons.set(_titleButton.button_id, _titleButton);
        player.gc_buttons.set(_quitButton.button_id, _quitButton);
        player.gc_buttons.set(_reticleButton.button_id, _reticleButton);
        player.gc_buttons.set(_camera_num.button_id, _camera_num);

    };

    var _initController = function () {

        _initImageMapButton();

        _initShortcutKey();

        $('#game-controller-container').draggable({
            start: function (evt, ui) {
            },
            drag: function (evt, ui) {
                ui.position.left = ui.position.left / transform_scale;
                ui.position.top = ui.position.top / transform_scale;
            },
            cancel: ".gc_button"
        });

    };

    var _playButton;
    var _nextButton;
    var _prevButton;
    var _nextScnButton;
    var _prevScnButton;
    var _autoButton;
    var _skipButton;
    var _titleButton;
    var _configButton;
    var _quitButton;
    var _reticleButton;
    var _camera_num;
    var _closeButton;
    var _initImageMapButton = function () {

        // rwdImageMaps jQuery plugin初期化
        $('img[usemap]').rwdImageMaps();

        // コントローラーボタン初期化
        var msg_disp_id = "controller_message";

        // Playボタン
        _playButton = new g2e.widget.ToggleButton({
            id1: "button_play",
            id2: "button_pause",
            click1: _playButton_handler,
            click2: _pauseButton_handler,
            disp_id: "button_play",
            message: new g2e.widget.MessageDisplay({ disp_id: msg_disp_id, msg_class: "message_playAndpause" })
        }).activateButton();

        // Nextボタン
        _nextButton = new g2e.widget.Button({
            id: "button_next",
            click: _nextButton_handler,
            message: new g2e.widget.MessageDisplay({ disp_id: msg_disp_id, msg_class: "message_next" })
        }).activateButton();

        // Prevボタン
        _prevButton = new g2e.widget.Button({
            id: "button_prev",
            click: _prevButton_handler,
            message: new g2e.widget.MessageDisplay({ disp_id: msg_disp_id, msg_class: "message_prev" })
        }).activateButton();

        // Prev Sceneボタン
        _prevScnButton = new g2e.widget.Button({
            id: "button_prev_scene",
            click: _prevSceneButton_handler,
            message: new g2e.widget.MessageDisplay({ disp_id: msg_disp_id, msg_class: "message_prev_scene" })
        }).activateButton();

        // Next Sceneボタン
        _nextScnButton = new g2e.widget.Button({
            id: "button_next_scene",
            click: _nextSceneButton_handler,
            message: new g2e.widget.MessageDisplay({ disp_id: msg_disp_id, msg_class: "message_next_scene" })
        }).activateButton();

        // Autoボタン
        _autoButton = new g2e.widget.ToggleButton({
            id1: "button_auto",
            id2: "button_auto_on",
            click1: () => { _autoButton_handler(true); },
            click2: () => { _autoButton_handler(false); },
            message: new g2e.widget.MessageDisplay({ disp_id: msg_disp_id, msg_class: "message_auto" })
        }).activateButton();

        // Skipボタン
        _skipButton = new g2e.widget.ToggleButton({
            id1: "button_skip",
            id2: "button_skip_on",
            click1: () => { _skipButton_handler(true); },
            click2: () => { _skipButton_handler(false); },
            message: new g2e.widget.MessageDisplay({ disp_id: msg_disp_id, msg_class: "message_skip" })
        }).activateButton();

        // Titleボタン
        _titleButton = new g2e.widget.Button({
            id: "button_title",
            message: new g2e.widget.MessageDisplay({ disp_id: msg_disp_id, msg_class: "message_title" }),
            click: _titleButton_handler
        }).activateButton();

        // Configボタン
        _configButton = new g2e.widget.Button({
            id: "button_config",
            message: new g2e.widget.MessageDisplay({ disp_id: msg_disp_id, msg_class: "message_config" }),
            click: _configButton_handler
        }).activateButton();

        // Quitボタン
        _quitButton = new g2e.widget.Button({
            id: "button_quit",
            message: new g2e.widget.MessageDisplay({ disp_id: msg_disp_id, msg_class: "message_quit" }),
            click: _quitButton_handler
        }).activateButton();

        // Reticleボタン
        _reticleButton = new g2e.widget.ToggleButton({
            id1: "button_reticle",
            id2: "button_reticle_on",
            message: new g2e.widget.MessageDisplay({ disp_id: msg_disp_id, msg_class: "message_show_reticle" }),
            click1: function() { _reticle_button_handler(true) },
            click2: function() { _reticle_button_handler(false) }
        }).disableButton();

        // Cameraボタン
        _cameraButton = new g2e.widget.ToggleButton({
            id1: "button_camera",
            id2: "button_camera_on",
            disp_id: "button_camera_on"
        }).activateButton();

        // 視点ボタン
        _camera_num = new g2e.widget.ToggleGroup({ id: "camera_num" });
        _camera_num.add({
            off_id: "button_camera1",
            on_id: "button_camera1_on",
            on_func: function () { _angle_button_handler(1); },
            onoff_id: "button_camera1_on",
            message: new g2e.widget.MessageDisplay({ disp_id: msg_disp_id, msg_class: "message_reticle1" })
        }).add({
            off_id: "button_camera2",
            on_id: "button_camera2_on",
            on_func: function () { _angle_button_handler(2); },
            onoff_id: "button_camera2",
            message: new g2e.widget.MessageDisplay({ disp_id: msg_disp_id, msg_class: "message_reticle2" })
        }).add({
            off_id: "button_camera3",
            on_id: "button_camera3_on",
            on_func: function () { _angle_button_handler(3); },
            onoff_id: "button_camera3",
            message: new g2e.widget.MessageDisplay({ disp_id: msg_disp_id, msg_class: "message_reticle3" })
        }).add({
            off_id: "button_camera360",
            on_id: "button_camera360_on",
            on_func: function () { _angle_button_handler(360); },
            onoff_id: "button_camera360",
            message: new g2e.widget.MessageDisplay({ disp_id: msg_disp_id, msg_class: "message_reticle360" }),
            state: "disabled"
        }).initialize();

        // Closeボタン
        _closeButton = new g2e.widget.Button({ id: "button_close" }).activateButton();

    };

    var _playButton_handler = function() {

        player.resume();

    };

    var _pauseButton_handler = function() {

        player.pause();

    };

    var _forcePause = function(evt, args) {

        if(player.play_state == 'play') {

            _playButton.switchTo({id:'button_play'});
            player.pause();
    
        }

    };

    var _togglePlayPause = function() {

        if(player.play_state == 'play') {

            _playButton.switchTo({id:'button_play'});
            player.pause();
    
        }
        else {

            _playButton.switchTo({id:'button_pause'});
            player.resume();

        }

    };

    var _repairPause = function(evt, args) {

        player.repairVideoState();

    };

    var _nextButton_handler = function() {

        player.nextCut();

    };

    var _prevButton_handler = function() {

        player.prevCut();

    };

    var _nextSceneButton_handler = function() {

        player.nextScene();

    };

    var _prevSceneButton_handler = function() {

        player.prevScene();

    };

    /**
     * @param {Boolean} to autoモードON/OFF true:ON 
     */
    var _autoButton_handler = function (to) {

        player.toggleAuto(to);

    };

    var _skipButton_handler = function (to) {

        player.toggleSkip(to);

    };

    var _titleButton_handler = function () {

        _fade_nextPage();
        location.href = "./title.html";

    };

    var _configButton_handler = async function () {

        await player.pause_for_pagemove();

        _fade_nextPage();
        location.href = "./config.html";

    };

    var _quitButton_handler = function () {

        if (_ipcRenderer) {
            _ipcRenderer.send('REQUEST_QUIT');
        }
        else {
            // 非Electron時はindex.htmlに遷移する
            location.href = "./index.html";
        }

    };

    var _reticle_button_handler = function(dispTo) {

        player.switchReticleDisp(dispTo);

    };

    var _angle_button_handler = function(cam) {

        player.switchCamera(cam);

    };

    var _dispatch_cam_handler = function(evt, state) {

        var cams = state.cams;
        var cam = state.cam;

        if(cams.length == 0) {

            // アングルがひとつしかない場合
            _cameraButton.disableButton();
            _camera_num.switchTo({on_id:null, actives:[]});

        }
        else {

            if($.inArray(cam, cams) < 0) {
                // カメラのリストに選択状態のものがない場合には1番目のカメラを設定
                cam = cams[0];
            }

            _cameraButton.activateButton();
            _camera_num.switchTo({on_id:_camnum_2_onid(cam), actives:_camnums_2_onid2(cams)});

        }

    };

    var _camnum_2_onid = function(num) {

        return "button_camera" + num + "_on";

    };

    var _camnums_2_onid2 = function(cams) {

        var ret = [];

        for(const cam of cams) {
            ret.push(_camnum_2_onid(cam));
        }

        return ret;

    };

    var _onid_2_camnum = function(onid) {

        var match = onid.match(/(?<=button_camera)\d+/ig);
        if(match) {
            return Number.parseInt(match[0]);
        }
        else {
            return -1;
        }

    };

    var _onids_2_camnums = function(dic) { // Set

        var ret = new Set();
        for(const val of dic) {

            ret.add(_onid_2_camnum(val));

        }
        return ret;

    };

    var _getActive_camnums = function() {

        return _onids_2_camnums(_camera_num.getActives());

    };

    var _dispatch_reticle_handler = function(evt, data) {

        var isActive = data.isActive;
        if(isActive) {
            _reticleButton.activateButton().switchTo({id:"button_reticle_on"});
        }
        else {
            _reticleButton.disableButton();
        }

    };

    var _initShortcutKey = function() {

        $(document).on('keydown', _keydownShortcutHandler); // キーボードショートカット

        $(document).on('wheel', _scrollWheelHandler);

    };

    var _cameraKeyMap = new Map([ // キーボードとカメラ番号の対応
        [49, 1], [97, 1],
        [50, 2], [98, 2],
        [51, 3], [99, 3],
        [48, 360] , [96, 360]
    ]);

    var _keydownShortcutHandler = function(evt) {

        // 数字キーでカメラ番号切替
        var pushCamKey = _cameraKeyMap.get(evt.which);
        var cams = _getActive_camnums();
        if(cams.has(pushCamKey) && !_camera_num.isOn(_camnum_2_onid(pushCamKey))) {
            player.switchCamera(pushCamKey);
            _dispatch_cam_handler(evt, {cam:pushCamKey, cams:Array.from(cams)});
        }

        // 矢印左右でカット切り替え
        if(evt.which == 37) {
            _prevButton_handler();
        }
        else if(evt.which == 39) {
            _nextButton_handler();
        }

        // 矢印上下でスピード上下(ToDo 将来実装)

        // PキーでPlay/Pause切り替え
        if(evt.which == 80) {
            _togglePlayPause();
        }

    };

    var _scrollWheelHandler = function(evt) {

        // ToDo 将来実装 再生速度変更
        // console.log("マウスホイール", evt.originalEvent.deltaY);

    };

    var _fade_nextPage = function () {

        g2e.common.Transition.fadeIn();

    };

    /** 公開モジュール */
    return {
        initView: initView
    };


}());

// 画面リサイズを有効化(viewsize内transform-scale初期化)
g2e.viewsize.activeFixViewResize();
$(document).ready(g2e.scenario_view.initView);