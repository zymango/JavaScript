var obj = {
  [Symbol('name')]: 'xiaoming',
  [Symbol('age')]: 18
}
Object.getOwnPropertySymbols(obj).forEach(res => {
  console.log(res)
})