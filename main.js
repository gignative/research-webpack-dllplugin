// import './build/vendor.bundle.js'
// import y from 'xxx/vendor'
// console.log(y)

async function f() {
  await import('./build/vendor.bundle.js')
  const y = await import('xxx/vendor')
  console.log(y)
}

f()