export const state = () => ({
  items: [],
});

export const mutations = {
  setItems (state, items) {
    state.items = [1, 2, 3];
  },
};

export const actions = {
  async nuxtServerInit ({ commit }, { app }) {
    commit('setItems');
  },
};
