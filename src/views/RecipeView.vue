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
    <!-- Griglia -->
    <div
      class="row justify-content-center row-cols-1 row-cols-sm-2 row-cols-lg-3 row-cols-xxl-4 gy-md-4"
    >
      <div
        v-for="ricetta in ricetteMostrate"
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
    <!-- Paginazione (desktop/tablet) -->
    <nav v-else-if="!isMobile" class="d-flex justify-content-center mt-4">
      <ul class="pagination">
        <li class="page-item" :class="{ disabled: paginaCorrente === 1 }">
          <button
            class="page-link"
            @click="paginaCorrente--"
            :disabled="paginaCorrente === 1"
          >
            &laquo;
          </button>
        </li>
        <li
          v-for="n in totalePagine"
          :key="n"
          class="page-item"
          :class="{ active: paginaCorrente === n }"
        >
          <button class="page-link" @click="paginaCorrente = n">{{ n }}</button>
        </li>
        <li
          class="page-item"
          :class="{ disabled: paginaCorrente === totalePagine }"
        >
          <button
            class="page-link"
            @click="paginaCorrente++"
            :disabled="paginaCorrente === totalePagine"
          >
            &raquo;
          </button>
        </li>
      </ul>
    </nav>

    <!-- Carica altri (solo mobile) -->
    <div v-else class="text-center mt-4">
      <button
        v-if="ricetteMostrate.length < ricetteFiltrate.length"
        class="btn btn-outline-primary"
        @click="caricaAltri"
      >
        Carica altri
      </button>
      <p v-else class="text-muted small">Hai visto tutte le ricette 🎉</p>
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
      isMobile: false,
      paginaCorrente: 1,
      perPagina: 12, // desktop
      visibiliMobile: 6, // inizialmente quante ricette caricare su mobile
      incrementoMobile: 6, // quante caricarne ogni click
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
    totalePagine() {
      return Math.ceil(this.ricetteFiltrate.length / this.perPagina);
    },
    ricettePaginazione() {
      const start = (this.paginaCorrente - 1) * this.perPagina;
      const end = start + this.perPagina;
      return this.ricetteFiltrate.slice(start, end);
    },
    ricetteMostrate() {
      if (!this.isMobile) {
        return this.ricettePaginazione;
      }
      return this.ricetteFiltrate.slice(0, this.visibiliMobile);
    },
  },
  methods: {
    checkMobile() {
      this.isMobile = window.matchMedia("(max-width: 767px)").matches;
    },

    caricaAltri() {
      this.visibiliMobile += this.incrementoMobile;
    },
  },
  watch: {
    ricetteFiltrate() {
      this.paginaCorrente = 1;
      this.visibiliMobile = this.incrementoMobile; // reset su mobile
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
  mounted() {
    this.checkMobile();
    window.addEventListener("resize", this.checkMobile);
  },
  beforeUnmount() {
    window.removeEventListener("resize", this.checkMobile);
  },
};
</script>
