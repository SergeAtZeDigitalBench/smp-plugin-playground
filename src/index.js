import { Store } from "./store/index.js";
import { renderLanguagesList } from "./ui/index.js";

function main() {
  const root = document.getElementById("root");
  root.innerHTML = `
  <div>
    <h1>Store management</h1>
    <hr/>
    <div>
        <ul class="listFrameworks"></ul>
        <ul class="listLanguages"></ul>
    </div>
  </div>
  `;
  const listLanguagesElement = root.querySelector("ul.listLanguages");
  renderLanguagesList(
    listLanguagesElement,
    Store.getState(),
    Store.publish.bind(Store)
  );

  Store.subscribe({
    shouldComponentUpdate: (current, next) => {
      return (
        JSON.stringify(current.languages) !== JSON.stringify(next.languages)
      );
    },
    callback: (state) => {
      renderLanguagesList(
        listLanguagesElement,
        state,
        Store.publish.bind(Store)
      );
    },
  });

  Store.subscribe({
    callback: (newState) => {
      console.log("newState: ", newState);
    },
  });
}

main();
