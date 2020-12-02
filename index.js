const EventEmitter = require('./eventEmitter');

const eventEmitter = new EventEmitter();
eventEmitter.taskIndex = 1;

class MyPromise {
  constructor(executor) {
    this._state = 'pending';
    this._result = undefined;

    // 并发
    this._resolveHandlers = [];
    this._rejectHandlers = [];

    const resolve = (response) => {
      if (this._state === 'pending') {
        this._state = 'fulfilled';
        this._result = response;

        this._resolveHandlers.forEach(task => {
          const { name, handler } = task;
          const result = handler.call(this, this._result);

          eventEmitter.emit(name, result);
        });
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
    const task = { name: 'event' + eventEmitter.taskIndex++, handler: resolveHandler };
    this._resolveHandlers.push(task);
    this._rejectHandlers.push(rejectHandler);

    return new MyPromise((resolve, reject) => {
      // async
      eventEmitter.on(task.name, (res) => {
        // console.log(task.name + ' settled', res);
        resolve(res);
      });
    });
  }

  catch(handler) {
  }

  finally(handler) {
  }

}

module.exports = MyPromise;
