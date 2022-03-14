"use strict";(self.webpackChunkwebsite=self.webpackChunkwebsite||[]).push([[152],{3905:function(e,t,n){n.d(t,{Zo:function(){return c},kt:function(){return f}});var r=n(7294);function a(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function o(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function i(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?o(Object(n),!0).forEach((function(t){a(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):o(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function l(e,t){if(null==e)return{};var n,r,a=function(e,t){if(null==e)return{};var n,r,a={},o=Object.keys(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}var s=r.createContext({}),p=function(e){var t=r.useContext(s),n=t;return e&&(n="function"==typeof e?e(t):i(i({},t),e)),n},c=function(e){var t=p(e.components);return r.createElement(s.Provider,{value:t},e.children)},u={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},d=r.forwardRef((function(e,t){var n=e.components,a=e.mdxType,o=e.originalType,s=e.parentName,c=l(e,["components","mdxType","originalType","parentName"]),d=p(n),f=a,b=d["".concat(s,".").concat(f)]||d[f]||u[f]||o;return n?r.createElement(b,i(i({ref:t},c),{},{components:n})):r.createElement(b,i({ref:t},c))}));function f(e,t){var n=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var o=n.length,i=new Array(o);i[0]=d;var l={};for(var s in t)hasOwnProperty.call(t,s)&&(l[s]=t[s]);l.originalType=e,l.mdxType="string"==typeof e?e:a,i[1]=l;for(var p=2;p<o;p++)i[p]=n[p];return r.createElement.apply(null,i)}return r.createElement.apply(null,n)}d.displayName="MDXCreateElement"},681:function(e,t,n){n.r(t),n.d(t,{assets:function(){return c},contentTitle:function(){return s},default:function(){return f},frontMatter:function(){return l},metadata:function(){return p},toc:function(){return u}});var r=n(7462),a=n(3366),o=(n(7294),n(3905)),i=["components"],l={sidebar_position:0},s="Installation",p={unversionedId:"getting-started/installation",id:"getting-started/installation",title:"Installation",description:"Required packages",source:"@site/docs/getting-started/installation.md",sourceDirName:"getting-started",slug:"/getting-started/installation",permalink:"/electron-broker/docs/getting-started/installation",editUrl:"https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/docs/getting-started/installation.md",tags:[],version:"current",sidebarPosition:0,frontMatter:{sidebar_position:0},sidebar:"tutorialSidebar",previous:{title:"Introduction",permalink:"/electron-broker/docs/intro"},next:{title:"Broker process setup",permalink:"/electron-broker/docs/getting-started/broker-process-setup"}},c={},u=[{value:"Required packages",id:"required-packages",level:3},{value:"Typescript configuration",id:"typescript-configuration",level:3},{value:"Babel config",id:"babel-config",level:2},{value:"babel.config.js",id:"babelconfigjs",level:4}],d={toc:u};function f(e){var t=e.components,n=(0,a.Z)(e,i);return(0,o.kt)("wrapper",(0,r.Z)({},d,n,{components:t,mdxType:"MDXLayout"}),(0,o.kt)("h1",{id:"installation"},"Installation"),(0,o.kt)("h3",{id:"required-packages"},"Required packages"),(0,o.kt)("p",null,"Install the npm package"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre"},"npm install electron-broker\n")),(0,o.kt)("p",null,"You need to install reflect-metadata package:"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre"},"npm install reflect-metadata --save\n")),(0,o.kt)("p",null,"and you must import it in entry file of each process that you're going to use the library in:"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre"},'import "reflect-metadata";\n')),(0,o.kt)("h3",{id:"typescript-configuration"},"Typescript configuration"),(0,o.kt)("p",null,"Enable these options in tsconfig.json."),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-typescript"},'"emitDecoratorMetadata": true,\n"experimentalDecorators": true,\n')),(0,o.kt)("h2",{id:"babel-config"},"Babel config"),(0,o.kt)("p",null,"If you're using babel to transpile your typescript code to javascript, make sure to include those plugins and presets in babel configuration file."),(0,o.kt)("p",null,"Install required plugins and presets"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre"},"npm install -D @babel/preset-typescript @babel/plugin-proposal-decorators @babel/plugin-proposal-class-properties babel-plugin-transform-typescript-metadata\n")),(0,o.kt)("p",null,"And add them to your babel configuration file:"),(0,o.kt)("h4",{id:"babelconfigjs"},"babel.config.js"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-javascript"},"module.exports = function () {\n  const presets = ['@babel/preset-typescript'];\n  const plugins = [\n    'babel-plugin-transform-typescript-metadata',\n    ['@babel/plugin-proposal-decorators', { legacy: true }],\n    ['@babel/plugin-proposal-class-properties', { loose: true }],\n  ];\n\n  return {\n    presets,\n    plugins,\n  };\n};\n")))}f.isMDXComponent=!0}}]);