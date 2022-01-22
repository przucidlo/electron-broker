# Installation

### Required packages

Install the npm package

```
npm install electron-broker
```

You need to install reflect-metadata package:

```
npm install reflect-metadata --save
```

and you must import it in entry file of each process that you're going to use the library in:

```
import "reflect-metadata";
```

### Typescript configuration

Enable these options in tsconfig.json.

```typescript
"emitDecoratorMetadata": true,
"experimentalDecorators": true,
```

## Babel config

If you're using babel to transpile your typescript code to javascript, make sure to include those plugins and presets in babel configuration file.

Install required plugins and presets

```
npm install -D @babel/preset-typescript @babel/plugin-proposal-decorators @babel/plugin-proposal-class-properties babel-plugin-transform-typescript-metadata
```

And add them to your babel configuration file:

#### babel.config.js

```javascript
module.exports = function () {
  const presets = ['@babel/preset-typescript'];
  const plugins = [
    'babel-plugin-transform-typescript-metadata',
    ['@babel/plugin-proposal-decorators', { legacy: true }],
    ['@babel/plugin-proposal-class-properties', { loose: true }],
  ];

  return {
    presets,
    plugins,
  };
};
```
