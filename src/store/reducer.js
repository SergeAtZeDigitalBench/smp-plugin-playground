import { toggleTabValue } from "../lib/index.js";
import { Store, initialState } from "./index.js";

/**
 * @param {typeof Store.value} state
 * @param {{type: string, payload?: string}} action
 * @returns {typeof Store.value} updated state
 */
export const reducer = (state, action) => {
  if (action.type === "resetAll") {
    return { ...initialState };
  }

  const { type: tabName, payload: propertyName } = action;

  return toggleTabValue({
    tabName,
    propertyName,
    state,
  });
};
