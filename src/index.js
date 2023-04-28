import { State } from "./store/index.js";

const addTwo = () => {
  State.add(2);
};

const addThree = () => {
  State.add(3);
};

/**
 * @param {HTMLDivElement} rootElement
 */
const renderCounter = (rootElement) => {
  rootElement.querySelector(
    "h3.counter"
  ).textContent = `State.value: ${State.value}`;
};

function main() {
  const root = document.getElementById("root");
  root.innerHTML = `
  <div>
    <h1>Hello World!</h1>
    <div>
        <button class="btn">add 2</button>
        <button class="btn">add 3</button>
        <h3 class="counter">State.value: ${State.value}</h3>
    </div>
  </div>
  `;

  State.listen(() => renderCounter(root));

  const [one, two] = root.querySelectorAll("button.btn");
  one.onclick = addTwo;
  two.onclick = addThree;

  console.log("State.value: ", State.value);
}

main();
