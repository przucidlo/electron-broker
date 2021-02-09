# Electron-Dove
Encapsulates electron ipc communication to simplify it and make it more effective...

## Installation

1. Install the npm package

```
npm install electron-dove
```

2. You need to install reflect-metadata package:

```
npm install reflect-metadata --save
```

and you must import it in every process that you're planning to use the library in (for example Main, Renderer or ChildProcess):

```
import "reflect-metadata";
```

3. You may want to use InversifyJS If you're planning to use built-in dependency injection.

```
npm install inversify
```

#### Typescript configuration

Enable these options in tsconfig.json.
```
"emitDecoratorMetadata": true,
"experimentalDecorators": true,
```

## Step-by-step guide

### Setting-up broker instance in Main process

Electron-Dove uses main process as a "bridge" between Renderer/s and ChildProcess/es of your electron app, this is essential part of the library and ignoring it will result in messages not leaving their origin.

##### main.ts 
``` 
import "reflect-metadata";
import {Dove, DoveMode} from "electron-dove";
import {app, BrowserWindow} from "electron";

let mainWindow: BrowserWindow;
let doveBroker: Dove;

function createWindow() {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    webPreferences: {
      nodeIntegration: true, // Required to use ipc communication.
    },
  });
  
  // Create dove broker.
  doveBroker = new Dove({
    mode: DoveMode.BROKER,
    options: {
      browserWindows: [mainWindow],
      processes: []; 
    }
  });
  
  //Start the broker.
  doveBroker.start();
}

app.whenReady().then(createWindow);
```
#### More docs coming soon.
