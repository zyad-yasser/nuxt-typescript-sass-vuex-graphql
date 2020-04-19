export const state = () => ({
  items: [],
});

export const mutations = {
  setItems (state: any, items: any) {
    state.items = [1, 2, 3];
  },
};

export const actions = {
  async nuxtServerInit ({ commit }: any, { app }: any) {
    commit('setItems');
  },
};
