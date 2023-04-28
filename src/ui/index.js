import { Store } from "../store/index.js";
import { toggleTabValue } from "../lib/index.js";

/**
 * @param {string} name
 * @param {(name: string)=>void} onClick
 * @param {boolean} isSelected
 * @returns {HTMLLIElement}
 */
const createListItem = (name, onClick, isSelected) => {
  const li = document.createElement("li");
  const button = document.createElement("button");
  const span = document.createElement("span");
  span.innerHTML = isSelected ? " x" : "";
  button.innerHTML = name;
  button.onclick = () => onClick(name);
  li.append(button, span);

  return li;
};

/**
 * @param {HTMLUListElement} rootUlElement
 * @param {typeof Store.value} state
 * @param {typeof Store.publish} publish
 * @returns {undefined} void fn
 */
export const renderLanguagesList = (rootUlElement, state, publish) => {
  const { languages } = state;

  const toggleLanguage = (languageName) => {
    const newStoreValue = toggleTabValue({
      tabName: "languages",
      propertyName: languageName,
      state,
    });

    publish(newStoreValue);
  };

  const listItems = Object.entries(languages).map(([name, isSelected]) => {
    return createListItem(name, toggleLanguage, isSelected);
  });

  rootUlElement.innerHTML = "";
  rootUlElement.append(...listItems);
};
