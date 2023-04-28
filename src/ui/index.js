import { Store } from "../store/index.js";

/**
 * @param {string} name
 * @param {()=>void} onClick
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
 * @param {typeof Store.subscribe} subscribe
 * @returns {undefined} void fn
 */
export const renderLanguagesList = (
  rootUlElement,
  state,
  publish,
  subscribe
) => {
  const { languages } = state;

  /**
   * @param {string} propertyName
   */
  const onClick = (propertyName) => {
    publish({
      type: "languages",
      payload: propertyName,
    });
  };

  const listItems = Object.entries(languages).map(([name, isSelected]) => {
    return createListItem(name, onClick, isSelected);
  });

  rootUlElement.innerHTML = "";
  rootUlElement.append(...listItems);

  subscribe({
    type: "languages",
    callback: (state) => {
      const listItems = Object.entries(state.languages).map(
        ([name, isSelected]) => {
          return createListItem(name, onClick, isSelected);
        }
      );

      rootUlElement.innerHTML = "";
      rootUlElement.append(...listItems);
    },
  });
};

/**
 * @param {HTMLUListElement} rootUlElement
 * @param {typeof Store.value} state
 * @param {typeof Store.publish} publish
 * @param {typeof Store.subscribe} subscribe
 * @returns {undefined} void fn
 */
export const renderFrameworksList = (
  rootUlElement,
  state,
  publish,
  subscribe
) => {
  const { frameworks } = state;

  /**
   * @param {string} propertyName
   */
  const onClick = (propertyName) => {
    publish({
      type: "frameworks",
      payload: propertyName,
    });
  };

  const listItems = Object.entries(frameworks).map(([name, isSelected]) => {
    return createListItem(name, onClick, isSelected);
  });

  rootUlElement.innerHTML = "";
  rootUlElement.append(...listItems);

  subscribe({
    type: "frameworks",
    callback: (state) => {
      const listItems = Object.entries(state.frameworks).map(
        ([name, isSelected]) => {
          return createListItem(name, onClick, isSelected);
        }
      );

      rootUlElement.innerHTML = "";
      rootUlElement.append(...listItems);
    },
  });
};

/**
 * Description placeholder
 * @date 28/04/2023 - 15:56:04
 *
 * @param {HTMLDivElement} rootDivElement
 * @param {()=>void} onReset
 */
export const renderResetButton = (rootDivElement, onReset) => {
  const button = document.createElement("button");
  button.onclick = () => onReset();
  button.innerHTML = "reset all";
  rootDivElement.appendChild(button);
};
