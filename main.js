async function f() {
  await import(/* webpackIgnore:true */ './dll/vendor/vendor.dll.js')
  const x = await import('xxx/vendor')
  console.log(x.default) // 2048

  // await new Promise(r => setTimeout(r, 500))

  await import(/* webpackIgnore:true */ './dll/lodash/lodash.dll.js')
  const y = await import('yyy/vendor_lodash')
  console.log(y.default.map([1,2,3], x => x*2)) // [2,4,6]
  
  // await new Promise(r => setTimeout(r, 500))

  await import(/* webpackIgnore:true */ './dll/lodash2/lodash2.dll.js')
  const z = await import('zzz/lodash/lodash.js')
  console.log(z.default.map([1,2,3], x => x*3)) // [3,6,9]
  
  // await new Promise(r => setTimeout(r, 500))
  
  await import(/* webpackIgnore:true */ './dll/d3/d3.dll.js')
  const d3 = await import('d3/d3')
  var svg = d3.default.select("#dataviz_area")
  svg.append("circle").attr("cx", 2).attr("cy", 2).attr("r", 40).style("fill", "blue");
  svg.append("circle").attr("cx", 140).attr("cy", 70).attr("r", 40).style("fill", "red");
  svg.append("circle").attr("cx", 300).attr("cy", 100).attr("r", 40).style("fill", "green");

  // await new Promise(r => setTimeout(r, 500))

  // more advanced example with hashed filenames inside dll
  await import(/* webpackIgnore:true */ `./${MONACO_DLL_PATH}`)
  const monaco = await import('monaco/monaco')

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