// //////////////////////////////////////////////////////
// Copyright (c) 2021 Luna's Torture Room / るなてぃっく
// Released under the MIT license
// http://opensource.org/licenses/mit-license.php
//
// //////////////////////////////////////////////////////

if (typeof require !== "undefined") {

    // console.log("electron require is renamed nodeRequire.");
    window.nodeRequire = require;
    delete window.require;
    delete window.exports;
    delete window.module;

}

/**
 * g2e.ipc モジュール
 * 
 * 
 */
var g2e = g2e || {};
g2e.ipc = (function(){

	/**
	 * メインプロセスへIPC通信を初期化。g2e-init-electron.jsが事前に実行されていること。
	 */
	const ipcRenderer = (function(){

		if (typeof nodeRequire !== "undefined") {

			const { ipcRenderer } = nodeRequire('electron');
			return ipcRenderer;
			
		}
		else {
			return null;
		}		

	}());

	var isElectron = function() {

		return ipcRenderer ? true : false;

	};

    /** 公開モジュール */
    return {
		ipcRenderer : ipcRenderer,
		isElectron : isElectron
    };

}());
