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
 * @type { Set<
 *  {
 *   shouldComponentUpdate?: (currentState: typeof initialState, nextState: typeof initialState )=> boolean;
 *   callback: (state: typeof initialState)=>void;
 * }>
 * }
 */
const actions = new Set();

const isFunc = (maybeFunc) => typeof maybeFunc === "function";

export const State = {
  value: initialState,

  getState() {
    return this.value;
  },

  /**
   * @param {typeof initialState} newState
   */
  publish(newState) {
    const prevState = { ...this.value };
    this.value = { ...prevState, ...newState };

    actions.forEach((action) => {
      const isCalling = action.shouldComponentUpdate
        ? action.shouldComponentUpdate(prevState, newState)
        : true;
      isCalling && action.callback(this.value);
    });
  },
  /**
   * @param {{
   *    shouldComponentUpdate?: (currentState: typeof initialState, nextState: typeof initialState )=> boolean;
   *    callback: (state: typeof initialState)=>void;
   * }} newAction
   * @returns {() => void} unsubscriber function
   */
  subscribe(newAction) {
    if (!isFunc(newAction.callback)) {
      return;
    }

    actions.add(newAction);

    return () => {
      actions.delete(newAction);
    };
  },
};
