import { createStore } from "vuex";
import axios from "axios";

export default createStore({
  state: {
    ricette: [],
    commenti: [],
  },
  getters: {
    ricette: (state) => state.ricette,
    commenti: (state) => state.commenti,
  },
  mutations: {
    SET_RECIPES(state, recipes) {
      state.ricette = recipes;
    },
    SET_COMMENTS(state, comments) {
      state.commenti = comments;
    },
  },
  actions: {
    async loadRecipes({ commit }) {
      const response = await axios.get("http://localhost:3000/recipes");
      commit("SET_RECIPES", response.data);
    },
    async loadComments({ commit }) {
      const response = await axios.get("http://localhost:3000/comments");
      commit("SET_COMMENTS", response.data);
    },
  },
  modules: {},
});
