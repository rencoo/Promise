class MyPromise {
  constructor(executor) {
    this._state = 'pending'
    this._result = undefined

    // 并发
    this._resolveHandlers = []
    this._rejectHandlers = []

    const resolve = (response) => {
      if (this._state === 'pending') {
        this._state = 'fulfilled'
        this._result = response

        this._resolveHandlers.forEach((handler) => {
          handler(response)
        })
      }
    }
    const reject = (error) => {
      if (this._state === 'pending') {
        this._state = 'rejected'
        this._result = error

        this._rejectHandlers.forEach((handler) => {
          handler(error)
        })
      }
    }

    executor(resolve, reject)
  }

  then(resolveHandler, rejectHandler) {
    if (this._state === 'pending') {
      return new MyPromise((resolve, reject) => {
        // 这里既实现了resolveHandler的注册，同时也能将resolveHandler的执行结果留在新promise里再resolve出去
        const _resolveHandler = (value) => {
          const result = resolveHandler(value)
          // resolve(result)
          resolvePromise(result, resolve, reject)
        }
        this._resolveHandlers.push(_resolveHandler)

        const _rejectHandler = (error) => {
          const result = rejectHandler(error)
          reject(result)
        }
        this._rejectHandlers.push(_rejectHandler)
      })
    }

    if (this._state === 'fulfilled') {
      return new MyPromise((resolve, reject) => {
        const result = resolveHandler(this._result)
        resolve(result)
      })
    }

    if (this._state === 'rejected') {
      return new MyPromise((resolve, reject) => {
        const result = rejectHandler(this._result)
        resolve(result)
      })
    }
  }

  catch(handler) {}

  finally(handler) {}
}

const resolvePromise = (result, resolve, reject) => {
  if (result instanceof MyPromise) {
    if (result._state === 'pending') {
      result.then(function (data) {
        resolvePromise(data, resolve, reject)
      })
    } else {
      result.then(resolve, reject)
    }
    return
  }

  return resolve(result)
}

module.exports = MyPromise
