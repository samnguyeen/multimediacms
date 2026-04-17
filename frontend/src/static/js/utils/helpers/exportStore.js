import Dispatcher from '../dispatcher.js';
export default function (store, handler) {
  Dispatcher.register(store[handler].bind(store));
  return store;
}
