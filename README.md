# Webpack DllPlugin working examples

## What is this?

Attempt to solve DllPlugin wiring without manual index.html script tag.

This repository contains working examples of such approach.

## What is DllPlugin?

* https://webpack.js.org/plugins/dll-plugin/
* https://github.com/webpack/webpack/tree/master/examples/dll
* https://github.com/webpack/webpack/tree/master/examples/dll-user
* https://blog.isquaredsoftware.com/2017/03/declarative-earth-part-1-cesium-webpack/#building-a-cesium-bundle-using-dllplugin

## Install

    npm install

    cd big_lib
    npm install


## Running

    ./clean
    npx webpack --config webpack.dll.config.js
    npx webpack --config webpack.lodash.config.js
    npx webpack --config webpack.lodash2.config.js

    cd big_lib
    npx webpack --config webpack.monaco.config.js
    cd ..

    # You should see something like this during final webpack build (both lines matter):
    # [dll-reference vendor_lib] external "vendor_lib" 42 bytes {main} [built]
    # [.../vendor.js] delegated ./vendor.js from dll-reference vendor_lib 42 bytes {1} [built]
    npx webpack-dev-server

## Why?

DllPlugin documentation is not clear enough about the fact that you need to add additional `<script src="dist/vendor.bundle.js"></script>` in index.html i.e. manually include DllPlugin output build bundle in html script tag of root application. This is only seen in github examples: https://github.com/webpack/webpack/blob/355763ad58c4c4c695500a1f9ee20252d6a50871/examples/dll-user/example.html#L4-L5

Naturally we would think that webpack would do it automatically, but is not the case unfortunately. You need to do final wiring yourself so javascript/webpack will see global variable created within vendor.bundle.js, which will be wiried to import statement `import 'xxx/vendor'` (which is converted to something like `const imported_lib = some_variable` and `some_variable` is exported to global/window scope from vendor.bundle.js which is an output from DllPlugin).

Check below example on how to fix this.

```javascript
// main.js
import x from 'xxx/vendor'
console.log(x) // expect 2048 output

// vendor.js
export default 2048

// webpack.config.js
module.exports = {
  mode: 'development',
  entry: {
    main: ['./main'],
  },
  output: {
    filename: 'main.bundle.js',
    path: path.resolve('dist/'),
  },
  plugins: [
    new webpack.DllReferencePlugin({
      scope: 'xxx',
      manifest: require('./dist/vendor-manifest.json'),
    }),
    new HtmlWebpackPlugin({
      template: './index.html'
    })
  ]
};

// webpack.dll.config.js
module.exports = {
  mode: 'development',
  entry: {
    vendor: ['./vendor'],
  },
  output: {
    filename: 'vendor.bundle.js',
    path: path.resolve('dist/'),
    library: 'vendor_lib'
  },
  plugins: [new webpack.DllPlugin({
    name: 'vendor_lib',
    path: 'dist/vendor-manifest.json',
  })]
};

// index.html
<!DOCTYPE html>
<html>
<head>
  <!-- <script src='dist/vendor.bundle.js'></script> -->
</head>
<body>
  Test
</body>
</html>
```

Then run

    npx webpack --config webpack.dll.config.js
    npx webpack-dev-server

And you will see error in console in the browser that `vendor_lib` is undefined.

Then uncomment `<!-- <script src='dist/vendor.bundle.js'></script> -->` and it will work.

This is not a good solution because we include potentially big library during application startup which partially defeats the purpose of DllPlugin as a way to extract big library from application code dist/startup process. The solution is to do as follows:

```diff
// index.html
<head>
-  <script src='dist/vendor.bundle.js'></script>
</head>

// webpack.dll.config.js
output: {
  filename: 'vendor.bundle.js',
  path: path.resolve('dist/'),
- library: 'vendor_lib'
+ library: 'vendor_lib',
+ libraryTarget: "window"
}

// main.js
-import x from 'xxx/vendor'
-console.log(x)
-
+async function f() {
+  await import(/* webpackIgnore:true */ './vendor.bundle.js')
+  const x = await import('xxx/vendor')
+  console.log(x.default)
+}
+f()
```

This repository contains working examples of above approach.