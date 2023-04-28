import { toggleTabValue } from "../lib/index.js";
import { reducer } from "./reducer.js";

export const initialState = {
  languages: {
    javascript: true,
    rust: false,
    go: false,
  },
  frameworks: {
    nextJs: true,
    gatsby: false,
    vue: false,
    angular: false,
    svelte: false,
  },
};
/**
 * @type { {[x:string]: Set<(state: typeof initialState)=>void;>}}
 */
let subscriptions = {};

const isFunc = (maybeFunc) => typeof maybeFunc === "function";
const isValidEvent = (maybeEvent) => {
  return (
    typeof maybeEvent.type === "string" &&
    typeof maybeEvent.payload === "string"
  );
};
const isValidAction = (maybeAction) => {
  let isValid = true;
  if (typeof maybeAction.type !== "string") {
    isValid = false;
  }

  return isValid && isFunc(maybeAction.callback);
};

export const Store = {
  value: initialState,

  getState() {
    return { ...this.value };
  },

  /**
   * @param {{type: string, payload: string}} event
   */
  publish(event) {
    if (!isValidEvent(event)) {
      throw new Error(
        "Event type is invalid,\n expected {type: string, payload: string}"
      );
    }

    this.value = reducer(this.getState(), event);

    subscriptions[event.type].forEach((fn) => fn && fn(this.value));
  },

  /**
   * @param {{
   *   type: string,
   *   callback: (state: typeof initialState)=>void;
   * }} newAction
   * @returns {() => void} unsubscriber function
   */
  subscribe(newAction) {
    if (!isValidAction(newAction)) {
      return;
    }
    if (!subscriptions[newAction.type]) {
      subscriptions[newAction.type] = new Set();
    }

    subscriptions[newAction.type].add(newAction.callback);

    return () => {
      subscriptions[newAction.type].delete(newAction.callback);
    };
  },
};
