import { Store } from "./store/index.js";
import {
  renderLanguagesList,
  renderFrameworksList,
  renderResetButton,
} from "./ui/index.js";

function main() {
  const root = document.getElementById("root");
  root.innerHTML = `
  <div>
    <div class="title">
        <h1>Store management</h1>
    </div>
    <hr/>
    <div>
        <ul class="listFrameworks"></ul>
        <hr/>
        <ul class="listLanguages"></ul>
    </div>
  </div>
  `;
  const listLanguagesElement = root.querySelector("ul.listLanguages");
  const listFrameworksElement = root.querySelector("ul.listFrameworks");
  const divContainerElement = root.querySelector("div.title");
  /**
   * @type {typeof Store.publish}
   */
  const publish = Store.publish.bind(Store);
  /**
   * @type {typeof Store.subscribe}
   */
  const subscribe = Store.subscribe.bind(Store);

  renderLanguagesList(
    listLanguagesElement,
    Store.getState(),
    publish,
    subscribe
  );

  renderFrameworksList(
    listFrameworksElement,
    Store.getState(),
    publish,
    subscribe
  );

  renderResetButton(divContainerElement, () =>
    publish({ type: "resetAll", payload: "" })
  );

  subscribe({
    type: "resetAll",
    callback: (newState) => {
      renderLanguagesList(listLanguagesElement, newState, publish, subscribe);

      renderFrameworksList(listFrameworksElement, newState, publish, subscribe);
    },
  });
}

main();
