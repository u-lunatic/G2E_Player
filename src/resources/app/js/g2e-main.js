// //////////////////////////////////////////////////////
// Copyright (c) 2021 Luna's Torture Room / るなてぃっく
// Released under the MIT license
// http://opensource.org/licenses/mit-license.php
//
// //////////////////////////////////////////////////////

// アプリケーション作成用のモジュールを読み込み
const {
	app,
	BrowserWindow,
	powerSaveBlocker,
	ipcMain } = require("electron");
// const localShortcut = require("electron-localshortcut");
app.commandLine.appendSwitch('disable-renderer-backgrounding');
const psbid = powerSaveBlocker.start('prevent-app-suspension');

// console.log(app.getPath('userData'));

let mainWindow;
let win_pos_x = 0;
let win_pos_y = 0;

/**
 * メインウィンドウを作成する。
 */
function createWindow() {

	var path = require('path');
	var url = require('url');
	mainWindow = new BrowserWindow({
		useContentSize: true,
		enableLargerThanScreen: true,
		backgroundColor: "#000000",
		width:1920,
		height:1080,
		icon: path.join(__dirname, '/../icons/icon.ico'),
		webPreferences: {
			nodeIntegration: true
		}
	});

	mainWindow.loadURL(url.format({
		pathname: path.join(__dirname,'/../warning.html'),
		protocol: 'file',
		slashes: true
	}));

	mainWindow.removeMenu();

	// // Ignore Keys
	// localShortcut.register(mainWindow, 'F5', function() {
	// 	// noop
	// });

	// mainWindow.webContents.toggleDevTools();
	// localShortcut.register(mainWindow, 'Shift+CommandOrControl+Alt+U', function() {
	// 	mainWindow.webContents.toggleDevTools();
	// });

	mainWindow.on("closed", () => {
		mainWindow = null;
	});

	mainWindow.on("move", () => {
		var pos = mainWindow.getPosition();
		win_pos_x = pos[0];
		win_pos_y = pos[1];
	});

	mainWindow.on("minimize", () => {
		mainWindow.webContents.send('WINDOW_MINIMIZE');
	});

	mainWindow.on("restore", () => {
		mainWindow.webContents.send('WINDOW_RESTORE');
	});

	/**
	 * ウィンドウ再描画時にウィンドウが小さくなってしまう対処
	 * ※resizable=falseの場合にのみ必要
	 */
	// {
		// mainWindow.on("resize", () => {
		// 	mainWindow.setResizable(true);
		// });
	
		// mainWindow.on("minimize", () => {
		// 	mainWindow.setResizable(true);
		// });
	
		// mainWindow.on("restore", () => {
		// 	mainWindow.setResizable(false);
		// });
	
		// mainWindow.hookWindowMessage(Number.parseInt(0x0232), () => {
		// 	mainWindow.setResizable(false);
		// });	
	// }


}

/**
 * メインウィンドウをリサイズする。
 */
function resizeWindow({width=1920, height=1080, fullscreen=false}) {

	// mainWindow.setResizable(true);
	mainWindow.setFullScreen(fullscreen);
	mainWindow.setContentSize(width,height);
	mainWindow.setBounds({x:win_pos_x, y:win_pos_y});
	// mainWindow.setResizable(false);

}

/**
 * アプリケーションイベント
 * ----------------------------------------------------------*/
//  初期化が完了した時の処理
app.on("ready", createWindow);

// 全てのウィンドウが閉じたときの処理
app.on("window-all-closed", () => {

	powerSaveBlocker.stop(psbid);
	if (process.platform !== "darwin") {
		app.quit();
	}
	
});

// アプリケーション起動時の処理
app.on("activate", () => {

	if (mainWindow === null) {
		createWindow();
	}

});

/**
 * レンダープロセス監視
 * ----------------------------------------------------------*/
// レンダープロセスのリサイズ、フルスクリーン要求を監視
ipcMain.on("REQUEST_RESIZE", (evt, {width, height, fullscreen}) => {

	resizeWindow({width, height, fullscreen});

});

// アプリケーション終了
ipcMain.on("REQUEST_QUIT", (evt) => {

	powerSaveBlocker.stop(psbid);
	app.exit();

});