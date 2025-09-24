import { createStore } from "vuex";
import axios from "axios";

export default createStore({
  state: {
    ricette: [],
    commenti: [],
    users: [],
    currentUser: JSON.parse(localStorage.getItem("currentUser")) || null,
    uploadEnabled: false, // di default disabilitato
  },
  getters: {
    ricette: (state) => state.ricette,
    commenti: (state) => state.commenti,
    users: (state) => state.users,
    currentUser: (state) => state.currentUser,
    isLoggedIn: (state) => !!state.currentUser,
    isPreferita: (state) => (recipeId) => {
      if (!state.currentUser) return false;
      return state.currentUser.preferiti.includes(String(recipeId));
    },
    uploadEnabled: (state) => state.uploadEnabled,
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
    ADD_USER(state, user) {
      state.users.push(user);
    },
    ADD_PREFERITA(state, recipeId) {
      if (!state.currentUser) return;
      if (!state.currentUser.preferiti.includes(recipeId)) {
        state.currentUser.preferiti.push(recipeId);
        localStorage.setItem("currentUser", JSON.stringify(state.currentUser));
      }
    },
    REMOVE_PREFERITA(state, recipeId) {
      if (!state.currentUser) return;
      state.currentUser.preferiti = state.currentUser.preferiti.filter(
        (id) => id !== recipeId
      );
      localStorage.setItem("currentUser", JSON.stringify(state.currentUser));
    },
    ADD_COMMENTO(state, commento) {
      state.commenti.push(commento);
    },
    ADD_RECIPE(state, recipe) {
      state.ricette.push(recipe);
    },
    UPDATE_RECIPE(state, updatedRecipe) {
      const index = state.ricette.findIndex((r) => r.id === updatedRecipe.id);
      if (index !== -1) {
        state.ricette.splice(index, 1, updatedRecipe);
      }
    },
    SET_UPLOAD_ENABLED(state, val) {
      state.uploadEnabled = val;
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
        commit("SET_USER", {
          id: user.id,
          username: user.username,
          email: user.email,
          preferiti: user.preferiti || [],
        });
      } else {
        throw new Error("Credenziali errate");
      }
    },
    logout({ commit }) {
      commit("LOGOUT");
    },
    async register({ commit, state }, { username, email, password }) {
      // controllo se l’email è già usata
      const exists = state.users.find((u) => u.email === email);
      if (exists) {
        throw new Error("Email già registrata");
      }

      const newUser = {
        id: String(Date.now()),
        username,
        email,
        password,
        preferiti: [],
      };

      const res = await axios.post("http://localhost:3000/users", newUser);
      commit("ADD_USER", res.data);
      commit("SET_USER", res.data);
      return true;
    },

    async addPreferita({ commit, state }, recipeId) {
      if (!state.currentUser.preferiti.includes(recipeId)) {
        commit("ADD_PREFERITA", recipeId);
        await axios.patch(
          `http://localhost:3000/users/${state.currentUser.id}`,
          {
            preferiti: state.currentUser.preferiti,
          }
        );
      }
    },
    async removePreferita({ commit, state }, recipeId) {
      if (state.currentUser.preferiti.includes(recipeId)) {
        commit("REMOVE_PREFERITA", recipeId);
        await axios.patch(
          `http://localhost:3000/users/${state.currentUser.id}`,
          {
            preferiti: state.currentUser.preferiti,
          }
        );
      }
    },
    async addCommento({ commit }, commento) {
      const nuovoCommento = {
        ...commento,
        id: String(Date.now()),
        userId: String(commento.userId),
        recipeId: String(commento.recipeId),
      };
      const res = await axios.post(
        "http://localhost:3000/comments",
        nuovoCommento
      );
      commit("ADD_COMMENTO", res.data);
    },
    async checkBackend({ commit }) {
      try {
        await axios.get("http://localhost:3001/ping");
        commit("SET_UPLOAD_ENABLED", true);
      } catch (e) {
        commit("SET_UPLOAD_ENABLED", false);
      }
    },
    async uploadImage(_, file) {
      const formData = new FormData();
      formData.append("image", file);
      const res = await axios.post("http://localhost:3001/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return res.data.filename; // es: "pasta.jpg"
    },
    async addRecipe({ commit, state }, { recipe, file }) {
      if (!state.currentUser) {
        throw new Error("Devi essere loggato per inserire una ricetta");
      }

      let imageName = recipe.immagine;

      if (state.uploadEnabled && file) {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("filename", imageName); // passiamo il nome scelto

        await axios.post("http://localhost:3001/upload", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      }

      const nuovaRicetta = {
        ...recipe,
        immagine: imageName,
        id: String(Date.now()),
        authorId: state.currentUser.id,
      };

      const res = await axios.post(
        "http://localhost:3000/recipes",
        nuovaRicetta
      );
      commit("ADD_RECIPE", res.data);
      return res.data;
    },
    async eliminaRicetta({ commit, state }, recipeId) {
      const ricetta = state.ricette.find((r) => r.id === recipeId);
      if (!ricetta) throw new Error("Ricetta non trovata");
      if (ricetta.authorId !== state.currentUser?.id) {
        throw new Error("Non sei autorizzato a eliminare questa ricetta");
      }

      const commentiDaEliminare = state.commenti.filter(
        (c) => c.recipeId === recipeId
      );
      for (const c of commentiDaEliminare) {
        await axios.delete(`http://localhost:3000/comments/${c.id}`);
      }

      await axios.delete(`http://localhost:3000/recipes/${recipeId}`);

      commit(
        "SET_COMMENTS",
        state.commenti.filter((c) => c.recipeId !== recipeId)
      );
      commit(
        "SET_RECIPES",
        state.ricette.filter((r) => r.id !== recipeId)
      );
    },
    async updateRicetta({ commit, state }, recipe) {
      const r = state.ricette.find((r) => r.id === recipe.id);
      if (!r) throw new Error("Ricetta non trovata");
      if (String(r.authorId) !== String(state.currentUser?.id)) {
        throw new Error("Non puoi modificare le ricette di altri utenti");
      }

      const res = await axios.patch(
        `http://localhost:3000/recipes/${recipe.id}`,
        recipe
      );

      commit("UPDATE_RECIPE", res.data);
      return res.data;
    },
  },
  modules: {},
});
