// return promise in handler
const MyPromise = require('./../index')

const promise = new MyPromise((resolve, reject) => {
  setTimeout(() => {
    resolve(3)
  }, 1000)
})

promise.then((res) => {
  console.log(res)
})

promise
  .then((res) => {
    return new MyPromise((resolve, reject) => {
      resolve(res * 2)
    })
  })
  .then((res) => {
    console.log('end 1, ', res)
  })

promise
  .then((res) => {
    return new MyPromise((resolve, reject) => {
      setTimeout(() => {
        resolve(res * 2)
      }, 5000)
    })
  })
  .then((res) => {
    console.log('end 2, ', res)
  })

promise
  .then((res) => {
    return new MyPromise((resolve, reject) => {
      setTimeout(() => {
        resolve(res * 3)
      }, 3000)
    })
  })
  .then((res) => {
    return new MyPromise((resolve, reject) => {
      setTimeout(() => {
        resolve(res * 3)
      }, 3000)
    })
  })
  .then((res) => {
    console.log('end 3, ', res)
  })
