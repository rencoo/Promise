class MyPromise {
  constructor(executor) {
    this._state = 'pending';
    this._result = undefined;

    this._resolveHandlers = [];
    this._rejectHandlers = [];

    const resolve = (response) => {
      if (this._state === 'pending') {
        this._state = 'fulfilled';
        this._result = response;

        this._resolveHandlers.forEach(resolveHandler => resolveHandler(this._result));
      }
    };
    const reject = (error) => {
      if (this._state === 'pending') {
        this._state = 'rejected';
        this._result = error;

        this._rejectHandlers.forEach(rejectHandler => rejectHandler(this._result));
      }
    }

    executor.call(this, resolve, reject);
  }

  then(resolveHandler, rejectHandler) {
    this._resolveHandlers.push(resolveHandler);
    this._rejectHandlers.push(rejectHandler);
  }

  catch(handler) {
  }

  finally(handler) {
  }

}

module.exports = MyPromise;
