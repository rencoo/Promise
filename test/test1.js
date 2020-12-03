// basic
const MyPromise = require('./../index')

const promise = new MyPromise((resolve, reject) => {
  setTimeout(() => {
    resolve(3)
  }, 1000)
})
promise.then((res) => {
  console.log(res)
})

const promise2 = new MyPromise((resolve, reject) => {
  setTimeout(() => {
    reject(new Error('shit'))
  }, 2000)
})
promise2.then(null, (err) => console.log(err))
