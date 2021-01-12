// //////////////////////////////////////////////////////
// Copyright (c) 2021 Luna's Torture Room / るなてぃっく
// Released under the MIT license
// http://opensource.org/licenses/mit-license.php
//
// //////////////////////////////////////////////////////

/**
 * g2e.widget モジュール
 */
var g2e = g2e || {};
g2e.widget = g2e.widget || {};

{

	/**
	 * g2e.widget.MessageDisplayクラス
	 */
	class MessageDisplay {

		/**
		 * コンストラクタ
		 * 
		 * @param disp_id (必須)メッセージCSSを適用する要素のid属性
		 * @param msg_class (必須)メッセージCSSのクラス名
		 * @param duration (オプション)表示アニメーションのduration(ミリ秒)
		 */
		constructor({disp_id,msg_class,duration}) {
			this._disp_id = disp_id;
			this._dispElm = $("#" + disp_id);
			this._msg_class = msg_class;
			this._duration = duration ? duration : 220;
		}

		/**
		 * 表示領域にメッセージを表示する。
		 */
		show_message() {

			this._dispElm.attr("class", "");
			this._dispElm.addClass(this._msg_class);
			this._dispElm.animate({
				left:0,
				opacity: 1.0
			},{
				duration : this._duration,
				easing : "linear"
			});

		};

		show_message_handler = () => {
			this.show_message();
		};

		/**
		 * 表示領域をクリアする。
		 */
		remove_message() {
			this._dispElm.stop();
			this._dispElm.css({
				"left": "",
				"opacity" : "0"
			});
			this._dispElm.removeClass(this._msg_class);
		};

		remove_message_handler = () => {
			this.remove_message();
		};

	};

	/**
	 * g2e.widget.Buttonクラス
	 */
	class Button {

		/** 
		 * コンストラクタ
		 * 
		 * - クリッカブルマップを使用する場合
		 * 引数のidと同一のid属性を指定したareaタグにマウスイベントを登録する。
		 * 次にidと同名のクラスを指定した表示要素(<div class="<id>">やimgタグ)に対し、
		 * mousedown/mouseup/mouseleave及びdisabled時のCSS設定を行う。
		 * イベント時にmousedown時のclass名は<id>_down、disabled時のclass名は<id>_disabledを追加(削除)する。
		 * 
		 * - 指定要素をそのままボタン化する場合
		 * 指定要素のid属性とclass属性に引数のidと同一の値を設定すること。
		 * 動作はクリッカブルマップと同様。
		 * 
		 * @param id (必須)areaタグのidまたはボタン化する要素のid
		 * @param click (オプション)クリック時に実行されるハンドラ。複数指定する場合は配列に格納すること。
		 * @param message (オプション)マウスオーバー時に表示するメッセージ。MessageDisplayクラスのインスタンス。
		 */
		constructor({
			id,
			click,
			message
		}) {

			// メンバ変数
			this._id = id;
			this._click = $.isArray(click) ? click : [click];
			this._target = $('#' + id); // マウスイベントターゲット
			this._button = $("." + this._id); // CSS切替ターゲット
			this._high = $('#' + this._id + '_high'); // ハイライトエレメント
			this._classdown = this._id + '_down';
			this._classdisabled = this._id + '_disabled';
			this._classhover = this._id + '_hover';
			this._classhigh = this._id + '_high';
			this._message = message ? message : {};
			this._state = 'active';

		};

		/** activate関数 */
		activateButton = () => {

			this._state = 'active';
			this._removeDisabled();

			this._removeClick();
			this._removeMouseEffects();

			this._addMouseEffects();
			for (const handler of this._click) {
				this._target.click(handler);
			}

			return this;

		};

		/** disable関数 */
		disableButton = () => {

			this._state = 'disabled';
			this._removeMouseEffects();
			this._removeClick();

			this._addDisabled();

			return this;

		};

		/** ハイライトON */
		highOn() {

			this._high.addClass(this._classhigh);

		};

		/** ハイライトOFF */
		highOff() {

			this._high.removeClass(this._classhigh);

		};

		/**
		 * ボタンがActive状態か返却する。
		 * @returns {Boolean} true(Active)
		 */
		isActive() {

			return this._state == 'active';

		};

		/**
		 * 一時的にボタンの状態を変える場合に、処理後に現在の状態に戻すための関数を取得する。
		 * @returns {Function}
		 */
		getRevert() {

			if(this._state == 'active') {
				return () => { this.activateButton(); };
			}
			else {
				return () => { this.disableButton(); };
			}

		};

		get button_id() {
			return this._id;
		}

		_mousedownEffect = () => {
			this._button.addClass(this._classdown);
		};

		_mouseupEffect = () => {
			this._button.removeClass(this._classdown);
		};

		_mouseleaveEffect = () => {
			this._button.removeClass(this._classdown); // down
			this._button.removeClass(this._classhover); // hover
		};

		_addDisabled = () => {
			this._button.addClass(this._classdisabled);
		};

		_removeDisabled = () => {
			this._button.removeClass(this._classdisabled);
		};

		_mouseEnterEffect = () => {
			this._button.addClass(this._classhover); // hover
		};

		_addMouseEffects = () => {
			this._target.on('mouseenter', this._mouseEnterEffect);
			this._target.on('mouseenter', this._message.show_message_handler);
			this._target.on('mousedown', this._mousedownEffect);
			this._target.on('mouseup', this._mouseupEffect);
			this._target.on('mouseleave', this._mouseleaveEffect);
			this._target.on('mouseleave', this._message.remove_message_handler);
		};

		_removeClick = () => {
			this._target.off('click');
		};

		_removeMouseEffects = () => {
			this._target.off('mouseenter');
			this._target.off('mousedown');
			this._target.off('mouseup');
			this._target.off('mouseleave');
		};

	};

	/**
	 * g2e.widget.Toggleボタンクラス
	 */
	class ToggleButton {

		/**
		 * コンストラクタ
		 * 
		 * - クリッカブルマップを使用する場合
		 * クリック対象となるarea要素のid属性にid1(またはbutton_id)と同一の値を設定すること。CSS切替対象の要素のclass属性にid1(またはbutton_id)と同一の値を含めること。
		 * 
		 * - 指定要素をそのままトグルボタン化する場合
		 * クリック対象のなる要素(divやimgなど)のid属性にid1またはbutton_idを設定し、class属性にid1またはbutton_idと同一の値を含めること。
		 *  
		 * @param id1 (必須)トグル表示の一方のCSS class名。button_idが省略される場合、この値がbutton_idに設定する。
		 * @param id2 (必須)トグル表示のもう一方のCSS class名。
		 * @param click1 (オプション)id1が表示されている時にボタンをクリックした時に実行するハンドラ。複数指定の場合は配列に格納すること。
		 * @param click2 (オプション)id2が表示されている時にボタンをクリックした時に実行するハンドラ。複数指定の場合は配列に格納すること。
		 * @param button_id (オプション)この引数と同一のid属性の値を持つ要素がマウスイベントのターゲット、同一のclass属性の値を含む要素がCSS切替のターゲットとなる。省略した場合はid1と同じ値になる。
		 * @param disp_id (オプション)初期表示時に表示するCSS class名を指定する。指定するのはid1またはid2と同一の値。省略した場合はid1となる。
		 * @param message (オプション)マウスオーバー時に表示するメッセージ。MessageDisplayクラスのインスタンス。
		 */
		constructor({
			id1,
			id2,
			click1,
			click2,
			button_id,
			disp_id,
			message
		}) {

			this._id1 = id1;
			this._id2 = id2;
			this._click1 = $.isArray(click1) ? click1 : [click1];
			this._click2 = $.isArray(click2) ? click2 : [click2];
			this._button_id = button_id ? button_id : id1;
			this._high = $('#' + this._button_id + '_high'); // ハイライトエレメント
			this._classhigh = this._button_id + '_high';
			this._disp_id = disp_id ? disp_id : id1;
			this._message = message ? message : {};
			this._state = "active";

			this._target = $('#' + this._button_id); // マウスイベントターゲット
			this._button = $("." + this._button_id); // CSS切替ターゲット

			this._classes1 = this._genClassNames(id1);
			this._classes2 = this._genClassNames(id2);
			this._classMap = {};
			this._classMap[id1] = this._classes1;
			this._classMap[id2] = this._classes2;

			this._clickMap = {};
			this._clickMap[id1] = this._click1;
			this._clickMap[id2] = this._click2;

			this._addClasses();

		}

		/** 
		 * activate関数 
		 * @public
		 */
		activateButton() {

			this._state = "active";
			this._removeDisabled();

			this._removeClick();
			this._removeMouseEffects();

			this._addMouseEffects();
			this._registerClick(this._disp_id);
			this._target.click(this._toggleButton_handler);

			return this;

		};

		activateButton_handler = () => {
			return this.activateButton();
		};

		/** 
		 * disable関数 
		 * @public
		 * */
		disableButton() {

			this._state = "disabled";

			this._removeMouseEffects();
			this._removeClick();

			this._addDisabled();

			return this;

		};

		disableButton_handler = () => {
			return this.disableButton();
		};

		/** 
		 * switchTo関数
		 * @public
		 * @param {String} id (必須)CSS id id1 または id2に指定した値
		 * @param {String} state (オプション) "active" または "disabled"
		 *  */
		switchTo({id, state}) {

			if(this._disp_id != id) {
				this._state = state ? state : this._state;
				this._toggleButton();
			}

		};

		switchTo_handler = ({id, state}) => {
			this.switchTo({id:id, state:state});
		};

		/** ハイライトON */
		highOn() {

			this._high.addClass(this._classhigh);

		};

		/** ハイライトOFF */
		highOff() {

			this._high.removeClass(this._classhigh);

		};

		get button_id() {
			return this._button_id;
		}

		/**
		 * ボタンがActive状態か返却する。
		 * @returns {Boolean} true(Active)
		 */
		isActive() {

			return this._state == 'active';

		};

		/**
		 * 一時的にボタンの状態を変える場合に、処理後に現在の状態に戻すための関数を取得する。
		 * @returns {Function}
		 */
		getRevert() {

			return () => { 
				this.activateButton();
				this.switchTo({id:this._disp_id, state:this._state})
			};

		};

		/**
		 * @protected
		 */
		_addMouseEffects() {

			this._target.on('mouseenter', this._message.show_message_handler);
			this._target.on('mousedown', this._mousedownEffect_handler);
			this._target.on('mouseup', this._mouseupEffect_handler);
			this._target.on('mouseleave', this._mouseleaveEffect_handler);
			this._target.on('mouseleave', this._message.remove_message_handler);

		};

		_addMouseEffects_handler = () => {
			this._addMouseEffects();
		};

		/**
		 * @protected
		 */
		_removeMouseEffects() {
			this._target.off('mouseenter');
			this._target.off('mousedown');
			this._target.off('mouseup');
			this._target.off('mouseleave');
		};

		_removeMouseEffects_handler = () => {
			this._removeMouseEffects();
		};

		/**
		 * @protected
		 */
		_toggleButton() {

			this._removeClasses();
			this._target.off('click');

			this._disp_id = (this._disp_id == this._id1) ? this._id2 : this._id1;

			this._addClasses();
			this._registerClick(this._disp_id);
			this._target.click(this._toggleButton_handler);

		};
		
		_toggleButton_handler = () => {
			this._toggleButton();
		};

		/**
		 * @protected
		 */
		_registerClick(id) {

			var hdlMap = this._clickMap[id];
			for (const key in hdlMap) {
				this._target.click(hdlMap[key]);
			}

		};

		_registerClick_handler = (id) => {
			this._registerClick(id);
		}

		/** 
		 * @protected
		 */
		_removeClick() {
			this._target.off('click');
		};

		_removeClick_handler = () => {
			this._removeClick();
		};

		/**
		 * @protected
		 */
		_mousedownEffect() { 
			this._button.addClass(this._getDownClass());
		};

		_mousedownEffect_handler = () => {
			this._mousedownEffect();
		};

		/**
		 * @protected
		 */
		_mouseupEffect() { 
			this._button.removeClass(this._getDownClass());
		};

		_mouseupEffect_handler = () => {
			this._mouseupEffect();
		};

		/**
		 * @protected
		 */
		_mouseleaveEffect() { 
			this._button.removeClass(this._getDownClass());
		};

		_mouseleaveEffect_handler = () => {
			this._mouseleaveEffect();
		};

		/**
		 * @protected
		 */
		_addDisabled() { 
			this._button.addClass(this._getDisabledClass());
		};

		_addDisabled_handler = () => {
			this._addDisabled();
		};

		/**
		 * @protected
		 */
		_removeDisabled() { 
			this._button.removeClass(this._getDisabledClass());
		};

		_removeDisabled_handler = () => {
			this._removeDisabled();
		};

		/**
		 * @protected
		 */
		_genClassNames(id) {

			return {
				base : id,
				down : id + '_down',
				disabled : id + '_disabled'
			};

		};

		/**
		 * @protected
		 */
		_removeClasses() {

			var cls = this._classMap[this._disp_id];
			for(const key in cls) {
				var val = cls[key];
				if(val == this._button_id) {
					continue;
				}
				else {
					this._button.removeClass(val);
				}
			}

		};

		_removeClasses_handler = () => {
			this._removeClasses();
		};

		/**
		 * @protected
		 */
		_addClasses() {

			var cls = this._classMap[this._disp_id];
			if(this._button_id != this._disp_id) {
				this._button.addClass(cls["base"]);
			}
			if(this._state == "disabled") {
				this._button.addClass(cls["disabled"]);
			}

		};

		_addClasses_handler = () => {
			this._addClasses();
		};

		/**
		 * @protected
		 */
		_getDownClass() {
			return this._classMap[this._disp_id].down;
		};

		/**
		 * @protected
		 */
		_getDisabledClass() {
			return this._classMap[this._disp_id].disabled;
		};

	};

	/**
	 * g2e.widget.ToggleRadioクラス
	 * 
	 * 
	 * @extends ToggleButton
	 */
	class ToggleRadio extends ToggleButton {

		/**
		 * コンストラクタ
		 * 
		 * ラジオボタンの一要素を表す。
		 * 生成したインスタンスはToggleGroupに登録すること。
		 * 
		 * @overload
		 * @param off_id (必須)off表示の場合のid。表示要素のoff時のclass名。
		 * @param on_id (必須)on表示の場合のid。表示要素のon時のclass名。
		 * @param off_func ※未実装※(オプション)onからoffになる時に実行される関数を指定する。複数指定の場合は配列に格納すること。
		 * @param on_func (オプション)offからonになる時に実行される関数を指定する。複数指定の場合は配列に格納すること。
		 * @param button_id (オプション)クリックイベントの対象となる要素のid属性と同一の値。省略の場合はoff_idが設定される。
		 * @param onoff_id (オプション)初期表示をonで表示する場合はon_idと同一の値、offの場合はoff_idと同一の値を指定する。省略した場合はoff_id。
		 * @param state (オプション)初期表示時の状態を指定する。"active"または"disabled"を指定する。省略時は"active"。
		 * @param message (オプション)マウスオーバー時に表示するメッセージ。MessageDisplayクラスのインスタンス。
		 */
		constructor({
			off_id,
			on_id,
			off_func,
			on_func,
			button_id,
			onoff_id,
			state,
			message
		}) {

			super({
				id1 : off_id,
				id2 : on_id,
				click1 : on_func,
				button_id : button_id,
				disp_id : onoff_id,
				message : message
			});
			this._off_id = off_id;
			this._on_id = on_id;
			this._off_func = $.isArray(off_func) ? off_func : [off_func];
			this._on_func = $.isArray(on_func) ? on_func : [on_func];
			this._state = state ? state : "active";
			
		}

		/**
		 * @public
		 * @param group ToggleGroup
		 */
		setGroup = ({group}) => {
			this._group = group;
		};

		/**
		 * @public
		 */
		initializeButton = () => {
			if(this._state == "active") {
				this.activateButton();
			}
			else {
				this.disableButton();
			}
		};

		/**
		 * @public
		 * @override ToggleButton.activateButton
		 */
		activateButton() {

			this._state = "active";
			this._removeDisabled();
			this._removeMouseEffects();
			this._addMouseEffects();
			if(!this.isOn()) {
				this._removeClick();
				this._registerClick(this._disp_id);
				this._target.click(this._toggleButton_handler);
	
				return this;
			}

		};

		activateButton_handler = () => {
			return this.activateButton();
		};

		/**
		 * @public
		 * @override ToggleButton.disableButton
		 */
		disableButton() {
			super.disableButton();
		};

		disableButton_handler = () => {
			this.disableButton();
		};

		/**
		 * @protected
		 */
		_toggleButton() {

			super._toggleButton();
			if(this.isOn()) {
				super._removeClick();
				$(this._group).trigger("turn_on", [this]);
			}

		};

		_toggleButton_handler = () => {
			this._toggleButton();
		};

		/**
		 * @protected
		 */
		_executeClick(list) {

			for(const func of list) {
				func();
			}

		};

		_executeClick_handler = (list) => {
			this._executeClick(list);
		};

		/**
		 * @public
		 * @override
		 */
		switchTo({id, state}) {
			super.switchTo({id:id, state:state});
			if(this.isOn()) {
				super._removeClick();
				$(this._group).trigger("turn_on", [this]);
			}
		};

		/**
		 * ボタンをOn表示にする。
		 * @public
		 */
		turnOn() {

			// CSSの設定
			// クリックイベントの設定し直し
			this.switchTo({id:this._on_id});

		};

		turnOn_handler = () => {
			this.turnOn();
		};

		// turnOnAndClick

		/**
		 * ボタンをOff表示にする。
		 * @public
		 */
		turnOff() {

			// CSSの設定
			// クリックイベントの設定し直し
			this.switchTo({id:this._off_id});

		};

		turnOff_handler = () => {
			this.turnOff();
		};

		/**
		 * @public
		 */
		isOn() {

			return this._disp_id == this._on_id;

		};

		getOnId() {
			return this._on_id;
		};

		/**
		 * ボタンがActive状態か返却する。
		 * @returns {Boolean} true(Active)
		 */
		isActive() {

			return this._state == 'active';

		};

		/**
		 * @override
		 */
		getRevert() {

			return () => {
				this.activateButton();
				this.switchTo({id:this._disp_id, state:this._state})
			};

		};

	};

	/**
	 * トグルグループ
	 * 
	 * グループ内のactiveとdisabled、on/offを管理し、クリック時のイベントを処理する。
	 * ・activeかつonのボタンをクリックしたら何も起こさないように
	 * ・activeかつoffのボタンをクリックしたら現在onのボタンをoffにしてクリックしたものをonに
	 * ・初期のstateとonを設定できるように
	 *
	 * 状態と処理のリスト：
	 * active かつ off → クリックしたボタンをonにして他をoffに
	 * active かつ on → 何もしない
	 * disable かつ off → 何もしない
	 * disable かつ on → 何もしない
	 * 
	 * ※注意：off_funcは未実装
	 * 
	 */
	class ToggleGroup {

		/**
		 * コンストラクタ
		 */
		constructor({id}) {

			this._id = id ? id : "ToggleGroup";
			this._radioMap = {};

		}

		add = ({
			off_id,
			on_id,
			off_func,
			on_func,
			button_id,
			onoff_id,
			state,
			message
		}) => {

			var tr = new ToggleRadio({
				off_id:off_id,
				on_id:on_id,
				off_func:off_func,
				on_func:on_func,
				button_id:button_id,
				onoff_id:onoff_id,
				state:state,
				message:message
			});
			tr.setGroup({group:this});

			if(tr.isOn()) {

				if(this._on_id) {
					throw "AddError:Already " + this._on_id + " is On.";
				}

				this._on_id = on_id;

			}

			this._radioMap[on_id] = tr;

			return this;

		};

		initialize = () => {

			for(const key in this._radioMap) {

				this._radioMap[key].initializeButton();
			}

			$(this).on("turn_on", this._on_click_turn_on);

		};

		_on_click_turn_on(evt, radio){

			this._on_id = radio.getOnId();

			for(const key in this._radioMap) {

				if(key == this._on_id) {
					continue;
				}

				this._radioMap[key].turnOff();

			}
			
			return false;

		};

		/**
		 * 引数に指定されたon_idに従ってグループ内のラジオボタンの表示状態を設定する。
		 * 
		 * @param {String} on_id 選択したいラジオボタンのon_id
		 * @param {Array} actives アクティブ状態にしたいラジオボタンのon_idの配列。含まれないラジオボタンはdisabledに設定される。
		 */
		switchTo({on_id, actives}) {

			for(const key in this._radioMap) {

				if($.inArray(key, actives) > -1) {
					this._radioMap[key].activateButton();
				}
				else {
					this._radioMap[key].turnOff();
					this._radioMap[key].disableButton();
					continue;
				}

				if(key == on_id) {
					this._radioMap[key].turnOn();
				}
				else {
					this._radioMap[key].turnOff();
				}

			}

		};

		/**
		 * 現在アクティブなボタンのID(ON)のリストを返却する。
		 * @returns {Set<String>}
		 */
		getActives() {

			var ret = new Set();
			for(const key in this._radioMap) {

				if(this._radioMap[key].isActive()) {

					ret.add(key);

				}

			}

			return ret;

		};

		/** 何も実行しない */
		activateButton = () => {};

		disableButton = () => {

			this.switchTo({on_id:null, actives:[]});

		};

		/** ハイライトON */
		highOn() {

			for(const key in this._radioMap) {

				if(this._radioMap[key]._state == 'active') {
					this._radioMap[key].highOn();
				}

			}

		};

		/** ハイライトOFF */
		highOff() {

			for(const key in this._radioMap) {
				
				this._radioMap[key].highOff();

			}

		};

		/**
		 * Active状態のラジオボタンが存在するか返却する。
		 * @returns {Boolean} true(Active) false(All Disabled)
		 */
		isActive() {

			for(const tr of this._radioMap.values()) {

				if(tr.isActive()) {
					return true;
				}

			}
			return false;

		};

		/**
		 * 指定したIDが現在ON状態かどうか返却する。存在しないIDかdisabled状態のIDを指定してもfalse(OFF)を返却する。
		 * @param {String} on_id 
		 * @return {Boolean} true ON false OFF
		 */
		isOn(on_id) {

			var radio = this._radioMap[on_id];
			if(radio && radio.isActive) {
				return radio.isOn();
			}
			else {
				return false;
			}
			
		};

		/**
		 * 一時的にボタンの状態を変える場合に、処理後に現在の状態に戻すための関数を取得する。
		 * @returns {Function}
		 */
		getRevert(){

			var revs = [];
			var tr;
			for(const key in this._radioMap) {
				tr = this._radioMap[key];
				revs.push(tr.getRevert());
			}

			return () => {

				for(const revf of revs) {
					revf();
				};

			};

		};

		get button_id() {

			return this._id;

		};

	};

	// モジュール公開
	g2e.widget.MessageDisplay = MessageDisplay;
	g2e.widget.Button = Button;
	g2e.widget.ToggleButton = ToggleButton;
	g2e.widget.ToggleRadio = ToggleRadio;
	g2e.widget.ToggleGroup = ToggleGroup;

} // global汚染対策
