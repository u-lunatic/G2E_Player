// //////////////////////////////////////////////////////
// Copyright (c) 2021 Luna's Torture Room / るなてぃっく
// Released under the MIT license
// http://opensource.org/licenses/mit-license.php
//
// //////////////////////////////////////////////////////

const builder = require('electron-builder');

builder.build({
    config: {
        "appId": "u-lunatic.lunastortureroom.g2eplayer",
        "copyright": "© 2021 Luna's Torture Room / るなてぃっく",
        "directories": {
            "app": "./resources/app",
            "output": "build"
        },
        "asar": "false",
        "extraResources": {
            "from": "./story",
            "to": "../story"
        },
        "win": {
            "icon": "./resouces/app/icons/icon.ico",
            "target": "dir"
        }
    }
});