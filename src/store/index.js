import { createStore } from "vuex";
import axios from "axios";

export default createStore({
  state: {
    ricette: [],
    commenti: [],
    currentUser: JSON.parse(localStorage.getItem("currentUser")) || null,
  },
  getters: {
    ricette: (state) => state.ricette,
    commenti: (state) => state.commenti,
    users: (state) => state.users,
    currentUser: (state) => state.currentUser,
    isLoggedIn: (state) => !!state.currentUser,
    isPreferita: (state) => (recipeId) => {
      if (!state.currentUser) return false;
      return state.currentUser.preferiti.includes(Number(recipeId));
    },
  },
  mutations: {
    SET_RECIPES(state, recipes) {
      state.ricette = recipes;
    },
    SET_COMMENTS(state, comments) {
      state.commenti = comments;
    },
    SET_USERS(state, users) {
      state.users = users;
    },
    SET_USER(state, user) {
      state.currentUser = user;
      localStorage.setItem("currentUser", JSON.stringify(user));
    },
    LOGOUT(state) {
      state.currentUser = null;
      localStorage.removeItem("currentUser");
    },
    ADD_PREFERITA(state, recipeId) {
      if (!state.currentUser) return;
      const idNum = Number(recipeId);
      if (!state.currentUser.preferiti.includes(idNum)) {
        state.currentUser.preferiti.push(idNum);
        localStorage.setItem("currentUser", JSON.stringify(state.currentUser));
      }
    },
    REMOVE_PREFERITA(state, recipeId) {
      if (!state.currentUser) return;
      const idNum = Number(recipeId);
      state.currentUser.preferiti = state.currentUser.preferiti.filter(
        (id) => id !== idNum
      );
      localStorage.setItem("currentUser", JSON.stringify(state.currentUser));
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
    async loadUsers({ commit }) {
      const response = await axios.get("http://localhost:3000/users");
      commit("SET_USERS", response.data);
    },
    async login({ commit }, { email, password }) {
      const res = await axios.get(
        `http://localhost:3000/users?email=${email}&password=${password}`
      );
      if (res.data.length > 0) {
        const user = res.data[0];
        commit("SET_USER", { id: user.id, username: user.username }); // NO password
      } else {
        throw new Error("Credenziali errate");
      }
    },
    logout({ commit }) {
      commit("LOGOUT");
    },
    async addPreferita({ commit, state }, recipeId) {
      const idNum = Number(recipeId);
      if (!state.currentUser.preferiti.includes(idNum)) {
        commit("ADD_PREFERITA", idNum);
        const userId = Number(state.currentUser.id);
        await axios.patch(`http://localhost:3000/users/${userId}`, {
          preferiti: state.currentUser.preferiti,
        });
      }
    },

    async removePreferita({ commit, state }, recipeId) {
      const idNum = Number(recipeId);
      if (state.currentUser.preferiti.includes(idNum)) {
        commit("REMOVE_PREFERITA", idNum);
        const userId = Number(state.currentUser.id);
        await axios.patch(`http://localhost:3000/users/${userId}`, {
          preferiti: state.currentUser.preferiti,
        });
      }
    },
  },
  modules: {},
});
