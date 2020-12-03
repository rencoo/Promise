// chain
const MyPromise = require('./../index');

const promise = new MyPromise((resolve, reject) => {
  setTimeout(() => {
    resolve(3);
  }, 1000);
});

promise.then(res => { console.log(res) });
promise.then(res => 2 * res).then(res => { console.log(res) });
promise.then(res => 2 * res).then(res => 2 * res).then(res => { console.log(res) });
setTimeout(() => {
  promise.then(res => { console.log(res); });
}, 5000);