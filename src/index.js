import events from './events';
import utils from './utils';

const emptyFn = () => {};

export default class DomEvents {

  constructor(options) {
    const opts = options || {};
    this._events = events;
    this._queue = [];
    // TODO: Sync mode
    this._syncMode = opts.syncMode || false;

    for (const eventName in events) {
      if ({}.hasOwnProperty.call(events, eventName)) {
        this._registerEvent(eventName);
      }
    }
  }


  _registerEvent(eventName) {
    this[eventName] = (...args) => {
      this._queue.push((cont) => {
        const [node, ...params] = args;
        this._events[eventName](true === utils.isFn(node) ? node() : node,
          ...params);
        cont();
      });

      return this;
    };
  }


  _run() {
    const fn = this._queue.shift();

    if ('undefined' !== typeof fn) {
      fn(cont => this._run(cont));
    }
  }


  wait(delay) {
    this._queue.push(cont => setTimeout(cont, delay));
    return this;
  }


  exec(callback) {
    this._queue.push((cont) => {
      callback();
      cont();
    });

    return this;
  }


  async(callback) {
    this._queue.push(cont => callback(cont));
    return this;
  }


  done(callback) {
    this.exec(callback || emptyFn);
    this._run();

    return this;
  }

}
