import { Store } from "../store/index.js";
/**
 * @param {{ tabName: string; propertyName: string; state: typeof Store.value; }} params
 * @returns {boolean}
 */
const isInputValid = ({ tabName, propertyName, state }) => {
  if (!state.hasOwnProperty(tabName)) {
    return false;
  }
  if (!state[tabName].hasOwnProperty(propertyName)) {
    return false;
  }

  return true;
};

/**
 * @param {{ tabName: string; propertyName: string; state: typeof Store.value; }} params
 * @returns {typeof Store.value} new state
 */
export const toggleTabValue = ({ tabName, propertyName, state }) => {
  if (!isInputValid({ tabName, propertyName, state })) {
    throw new Error(
      `Invalid values for tab: ${tabName}, and property: ${propertyName}`
    );
  }

  const newEntries = Object.entries(state[tabName]).map(
    ([name, isSelected]) => [name, propertyName === name]
  );
  const newTabValue = Object.fromEntries(newEntries);

  return { ...state, [tabName]: newTabValue };
};
