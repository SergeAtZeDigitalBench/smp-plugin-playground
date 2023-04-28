let listeners = new Set();

const isFunc = (maybeFunc) => typeof maybeFunc === "function";

export const State = {
  value: 0,
  add(n) {
    this.value += n;
    listeners.forEach((fn) => isFunc(fn) && fn());
  },
  listen(cb) {
    if (!isFunc(cb)) {
      return;
    }

    listeners.add(cb);
    return () => {
      listeners = listeners.delete(cb);
    };
  },
};
