import { createStore } from "vuex";
import axios from "axios";

export default createStore({
  state: {
    ricette: [],
  },
  getters: {
    ricette: (state) => state.ricette,
  },
  mutations: {
    SET_RECIPES(state, ricette) {
      state.ricette = ricette;
    },
  },
  actions: {
    async loadRecipes({ commit }) {
      const response = await axios.get("http://localhost:3000/ricette");
      commit("SET_RECIPES", response.data);
    },
  },
  modules: {},
});
