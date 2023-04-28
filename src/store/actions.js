export const actions = {
  addItem(context, payload) {
    context.commit("addItem", payload);
  },
  clearItem(context, payload) {
    context.commit("clearItem", payload);
  },
};
