import { Store } from "../store/store.js";

export class Component {
  constructor(props = {}) {
    /**
     * @description If this Component class is the parent of another class,
     * then that will have likely set its own method for render. If there is no method set,
     * we create an empty method that will prevent things from breaking
     * @type {Function}
     */
    this.render = this.render || (() => {});

    if (props.store instanceof Store) {
      props.store.events.subscribe("stateChange", () => this.render());
    }

    if (props.hasOwnProperty("element")) {
      this.element = props.element;
    }
  }
}
