<template>
  <div class="container-xxl my-4">
    <h1 class="mb-5 text-center">Le nostre ricette</h1>

    <div class="row align-items-center mb-4">
      <!-- Filtri categorie -->
      <div class="col-md-8">
        <label class="form-label d-block">Filtra per categorie</label>
        <div class="d-flex flex-wrap gap-3">
          <div
            v-for="cat in categorie"
            :key="cat"
            class="form-check form-check-inline"
          >
            <input
              class="form-check-input"
              type="checkbox"
              :id="cat"
              :value="cat"
              v-model="categorieSelezionate"
            />
            <label class="form-check-label" :for="cat">{{ cat }}</label>
          </div>
        </div>
      </div>

      <!-- Ricerca -->
      <div class="col-md-4 text-md-end mt-3 mt-md-0">
        <input
          type="text"
          v-model="stringaRicerca"
          placeholder="Cerca ricetta..."
          class="form-control"
        />
      </div>
    </div>
    <div
      class="row justify-content-center row-cols-1 row-cols-sm-2 row-cols-lg-3 row-cols-xxl-4 gy-md-4"
    >
      <div
        v-for="ricetta in ricetteFiltrate"
        :key="ricetta.id"
        class="col d-flex mb-4"
      >
        <div class="flex-fill px-md-2">
          <RecipeCard :ricetta="ricetta"> </RecipeCard>
        </div>
      </div>
    </div>
    <div v-if="ricetteFiltrate.length === 0" class="text-center mt-4">
      <p class="text-muted">
        Nessuna ricetta trovata per le categorie selezionate.
      </p>
    </div>
  </div>
</template>

<script>
import RecipeCard from "@/components/RecipeCard.vue";

export default {
  components: {
    RecipeCard,
  },
  data() {
    return {
      categorie: ["Antipasti", "Primi piatti", "Secondi piatti", "Dolci"],
      categorieSelezionate: [],
      stringaRicerca: "",
    };
  },
  computed: {
    ricette() {
      return this.$store.getters.ricette;
    },
    ricetteFiltrate() {
      return this.ricette.filter((r) => {
        const matchCategoria =
          this.categorieSelezionate.length === 0 ||
          this.categorieSelezionate.includes(r.categoria);
        const matchNome = r.nome
          .toLowerCase()
          .includes(this.stringaRicerca.toLowerCase());
        return matchCategoria && matchNome;
      });
    },
  },
  created() {
    if (!this.$store.getters.ricette.length) {
      this.$store.dispatch("loadRecipes");
    }
    if (!this.$store.getters.commenti.length) {
      this.$store.dispatch("loadComments");
    }
    if (!this.$store.getters.users.length) {
      this.$store.dispatch("loadUsers");
    }
  },
};
</script>
