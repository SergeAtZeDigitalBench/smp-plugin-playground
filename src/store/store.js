import { PubSub } from "../lib/pubSub";

export class Store {
  constructor(params) {
    this.events = new PubSub();
    this.actions = params?.actions || {};
    this.mutations = params?.mutations || {};
    this.state = {};
    this.status = "idle";

    this.state = new Proxy(params.state || {}, {
      set: (state, key, value) => {
        // Set the value as we would normally
        state[key] = value;

        // Trace out to the console. This will be grouped by the related action
        console.log(`stateChange: ${key}: ${value}`);

        // Publish the change event for the components that are listening
        this.events.publish("stateChange", this.state);

        // Give the user a little telling off if they set a value directly
        if (this.status !== "mutation") {
          console.warn(`You should use a mutation to set ${key}`);
        }

        // Reset the status ready for the next operation
        this.status = "idle";

        return true;
      },
    });
  }

  /**
   * A dispatcher for actions that looks in the actions
   * collection and runs the action if it can find it
   *
   * @param {string} actionKey
   * @param {mixed} payload
   * @returns {boolean}
   * @memberof Store
   */
  dispatch = (actionKey, payload) => {
    if (typeof this.actions[actionKey] !== "function") {
      console.error(`Action "${actionKey} doesn't exist.`);
      return false;
    }

    // Create a console group which will contain the logs from our Proxy etc
    console.groupCollapsed(`ACTION: ${actionKey}`);

    // Let anything that's watching the status know that we're dispatching an action
    this.status = "action";

    // Actually call the action and pass it the Store context and whatever payload was passed
    this.actions[actionKey](this, payload);

    // Close our console group to keep things nice and neat
    console.groupEnd();

    return true;
  };

  /**
   * Look for a mutation and modify the state object
   * if that mutation exists by calling it
   *
   * @param {string} mutationKey
   * @param {mixed} payload
   * @returns {boolean}
   * @memberof Store
   */
  commit = (mutationKey, payload) => {
    // Run a quick check to see if this mutation actually exists
    // before trying to run it
    if (typeof this.mutations[mutationKey] !== "function") {
      console.log(`Mutation "${mutationKey}" doesn't exist`);
      return false;
    }

    // Let anything that's watching the status know that we're mutating state
    this.status = "mutation";

    // Get a new version of the state by running the mutation and storing the result of it
    let newState = this.mutations[mutationKey](this.state, payload);

    // Merge the old and new together to create a new state and set it
    this.state = { ...this.state, ...newState };

    return true;
  };
}
