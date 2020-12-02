class EventEmitter {
  constructor () {}
  on (eventName, cb) {
      if (!this._events) this._events = {}
      this._events[eventName] ? this._events[eventName].push(cb) : (this._events[eventName] = [cb])
  }
  emit (eventName, ...args) {
      if (!this._events || !this._events[eventName]) return
      this._events[eventName].forEach(cb => {
          cb.apply(this, args)
      })
  }
  off (eventName, cb) {
      if (!this._events || !this._events[eventName]) return
      if (!cb) {
          delete this._events[eventName]
          return
      }
      let that = cb
      let cbs = this._events[eventName]
      for (let i=0; i<cbs.length; i++) {
          if (cbs[i] === that) {
              cbs.splice(i, 1)
              i--
          }
      }
  }
  once (eventName, cb) {
      let onceCb = function (...args) {
          cb.apply(this, args)
          this.off(eventName, onceCb)
      }
      this.on(eventName, onceCb)
  }
}

module.exports = EventEmitter;