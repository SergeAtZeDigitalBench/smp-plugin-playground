import { State } from "./store/index.js";

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
 * @param {typeof State.value} state
 * @param {typeof State.publish} publish
 * @returns {undefined} void fn
 */
const renderLanguagesList = (rootUlElement, state, publish) => {
  const { languages } = state;

  const toggleLanguage = (languageName) => {
    const newEntries = Object.entries(languages).map(([name, isSelected]) => [
      name,
      languageName === name,
    ]);
    const newLanguages = Object.fromEntries(newEntries);

    const newState = {
      ...state,
      languages: newLanguages,
    };
    publish(newState);
  };

  const listItems = Object.entries(languages).map(([name, isSelected]) => {
    return createListItem(name, toggleLanguage, isSelected);
  });
  rootUlElement.innerHTML = "";
  rootUlElement.append(...listItems);
};

function main() {
  const root = document.getElementById("root");
  root.innerHTML = `
  <div>
    <h1>State management</h1>
    <hr/>
    <div>
        <ul class="listLanguages"></ul>
        <ul class="listFrameworks"></ul>
    </div>
  </div>
  `;
  const listLanguagesElement = root.querySelector("ul.listLanguages");
  renderLanguagesList(
    listLanguagesElement,
    State.getState(),
    State.publish.bind(State)
  );

  State.subscribe({
    shouldComponentUpdate: (current, next) => {
      return (
        JSON.stringify(current.languages) !== JSON.stringify(next.languages)
      );
    },
    callback: (state) => {
      renderLanguagesList(
        listLanguagesElement,
        state,
        State.publish.bind(State)
      );
    },
  });

  State.subscribe({
    callback: (newState) => {
      console.log("newState: ", newState);
    },
  });
}

main();
