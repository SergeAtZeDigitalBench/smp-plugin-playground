import { Store } from "./store/index.js";
import { renderLanguagesList, renderFrameworksList } from "./ui/index.js";

function main() {
  const root = document.getElementById("root");
  root.innerHTML = `
  <div>
    <h1>Store management</h1>
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

  renderLanguagesList(
    listLanguagesElement,
    Store.getState(),
    Store.publish.bind(Store),
    Store.subscribe.bind(Store)
  );

  renderFrameworksList(
    listFrameworksElement,
    Store.getState(),
    Store.publish.bind(Store),
    Store.subscribe.bind(Store)
  );
}

main();
