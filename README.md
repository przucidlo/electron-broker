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
```typescript
"emitDecoratorMetadata": true,
"experimentalDecorators": true,
```

## Step-by-step guide

### Setting-up broker instance in Main process

Electron-Dove uses main process as a "bridge" between Renderer/s and ChildProcess/es of your electron app, this is essential part of the library and ignoring it will result in messages not leaving their origin.

##### main.ts 
```typescript
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
### Setting-up client instance in Renderer/ChildProcess

##### index.tsx
```typescript
import "reflect-metadata";
import { Dove, DoveClient, DoveMode } from "electron-dove";
import { Container } from "inversify";
import React from "react";
import ReactDOM from "react-dom";

const dove = new Dove({
  mode: DoveMode.RENDERER,
  controllers: [],
  options: {},
});

export const doveClient = dove.getDoveClient();

dove.start();

ReactDOM.render(<div></div>, document.getElementById("root"));
```
### Adding your first controller

```typescript
import { MessagePattern } from "electron-dove";

export class MyFirstController {
  
  @MessagePattern("ping")
  public pong(): string {
    return "pong";
  }
}

```

#### More docs coming soon.
