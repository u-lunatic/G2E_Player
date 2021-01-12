// //////////////////////////////////////////////////////
// Copyright (c) 2021 Luna's Torture Room / るなてぃっく
// Released under the MIT license
// http://opensource.org/licenses/mit-license.php
//
// //////////////////////////////////////////////////////

/**
 * g2e.config モジュール
 */
var g2e = g2e || {};
g2e.config = g2e.config || {};

/**
 * g2e.config モジュール定義
 */
g2e.config = (function(){

    var getConfigValues = function () {

		var ret = {
			window_size : _getValueByDefault("window_size", "ws-1280-720"),
			fullscreen : _getValueByDefault("fullscreen", false),
			volume_bgm : _getValueByDefault("volume_bgm", 100),
			volume_se : _getValueByDefault("volume_se", 100),
			volume_voice : _getValueByDefault("volume_voice", 100),
            volume_lvoice : _getValueByDefault("volume_lvoice", 100),
            is_outline : _getValueByDefault("is_outline", "mv-outline-on"),
            is_60fps : _getValueByDefault("is_60fps", false),
            is_text_nowait : _getValueByDefault("is_text_nowait", false),
            text_speed : _getValueByDefault("text_speed", 70)
		};

		return ret;

    };
    
    var saveConfigValues = function({
        window_size = "ws-1280-720",
        fullscreen = false,
        volume_bgm = 100,
        volume_se = 100,
        volume_voice = 100,
        volume_lvoice = 100,
        is_outline = "mv-outline-on",
        is_60fps = false,
        is_text_nowait = false,
        text_speed = 50
    }) {

        var ls = localStorage;
        ls.setItem("window_size", window_size);
        ls.setItem("fullscreen", fullscreen);
        ls.setItem("volume_bgm", volume_bgm);
        ls.setItem("volume_se", volume_se);;
        ls.setItem("volume_voice", volume_voice);
        ls.setItem("volume_lvoice", volume_lvoice);
        ls.setItem("is_outline", is_outline);
        ls.setItem("is_60fps", is_60fps);
        ls.setItem("is_text_nowait", is_text_nowait);
        ls.setItem("text_speed", text_speed);

        return arguments[0];

    };

    var _getValueByDefault = function(key, defVal) {

        var ls = localStorage;
        var ret = ls.getItem(key) ? ls.getItem(key) : defVal;

        var type = typeof defVal;
        var type_ret = typeof ret;
        if(type == "number" && type_ret == "string") {
            ret = parseInt(ret);
        } else if (type == "boolean" && type_ret == "string") {
            ret = (ret == "true");
        }

        return ret;

    };

    /** 公開モジュール */
    return {
        getConfigValues : getConfigValues,
        saveConfigValues : saveConfigValues
    };

}());
