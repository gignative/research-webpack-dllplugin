async function f() {
  await import(/* webpackIgnore:true */ './vendor.bundle.js')
  const x = await import('xxx/vendor')
  console.log(x.default) // 2048

  // await new Promise(r => setTimeout(r, 500))

  await import(/* webpackIgnore:true */ './vendor_lodash.bundle.js')
  const y = await import('yyy/vendor_lodash')
  console.log(y.default.map([1,2,3], x => x*2)) // [2,4,6]
  
  // await new Promise(r => setTimeout(r, 500))

  await import(/* webpackIgnore:true */ './vendor_lodash2.bundle.js')
  const z = await import('zzz/lodash/lodash.js')
  console.log(z.default.map([1,2,3], x => x*3)) // [3,6,9]
  
  // await new Promise(r => setTimeout(r, 500))
  
  await import(/* webpackIgnore:true */ './vendor_monaco.bundle.js')
  const monaco = await import('monaco/vendor_monaco')

  const editor = monaco.default.editor.create(
    document.getElementsByClassName('monacoEditor')[0],
    {
      value: `// Loading...`,
      language: 'javascript',
      theme: 'vs-dark',
      "cursorBlinking": "solid",
    }
  );
}
f()