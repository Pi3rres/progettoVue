<template>
  <main class="flex-grow-1">
    <div class="container py-4">
      <div v-if="ricetta">
        <!-- Categoria -->
        <div class="mb-2">
          <span class="badge bg-primary">{{ ricetta.categoria }}</span>
        </div>

        <!-- Titolo -->
        <div class="d-flex align-items-center justify-content-between mt-2">
          <h2 class="mb-0">{{ ricetta.nome }}</h2>

          <!-- Bottone preferita -->
          <button
            v-if="$store.getters.isLoggedIn"
            @click="togglePreferita"
            class="btn btn-sm btn-outline-danger"
          >
            <span v-if="isPreferita">Preferita ❤️</span>
            <span v-else>Aggiungi alle preferite🤍</span>
          </button>
        </div>

        <!-- Layout immagine + descrizione -->
        <div class="row g-4 align-items-start">
          <!-- Immagine -->
          <div class="col-md-5">
            <img
              :src="'/images/recipes/' + ricetta.immagine"
              :alt="ricetta.nome"
              class="img-fluid rounded shadow-sm"
            />
          </div>

          <!-- Descrizione e ingredienti -->
          <div class="col-md-7">
            <!-- Descrizione breve -->
            <p class="lead">{{ ricetta.descrizioneBreve }}</p>

            <!-- Ingredienti -->
            <h5>Ingredienti</h5>
            <ul>
              <li v-for="(ingrediente, i) in ricetta.ingredienti" :key="i">
                {{ ingrediente }}
              </li>
            </ul>
          </div>
        </div>

        <!-- Procedimento -->
        <div class="mt-5">
          <h4>Procedimento</h4>
          <p>{{ ricetta.procedimento }}</p>
        </div>
        <!-- Commenti -->
        <div class="mt-5">
          <h4>Commenti</h4>
          <div v-if="commenti.length > 0" class="list-group">
            <div
              v-for="c in commenti"
              :key="c.id"
              class="list-group-item d-flex flex-column"
            >
              <strong>{{ c.autore }}</strong>
              <span>{{ c.testo }}</span>
            </div>
          </div>
          <div v-else>
            <p>Nessun commento per questa ricetta.</p>
          </div>
        </div>
      </div>

      <div v-else>
        <p>Ricetta non trovata</p>
      </div>

      <!-- Pulsante ritorno (sempre visibile) -->
      <div class="mt-4">
        <router-link :to="{ name: 'ricette' }" class="btn btn-secondary">
          ← Torna alle ricette
        </router-link>
      </div>
    </div>
  </main>
</template>

<script>
export default {
  components: {},
  props: ["id"],
  computed: {
    ricetta() {
      return this.$store.getters.ricette.find((c) => c.id == this.id);
    },
    commenti() {
      return this.$store.getters.commenti.filter((c) => c.recipeId == this.id);
    },
    isPreferita() {
      return this.$store.getters.isPreferita(Number(this.id));
    },
  },
  methods: {
    togglePreferita() {
      const idNum = Number(this.id);
      if (this.isPreferita) {
        this.$store.dispatch("removePreferita", idNum);
      } else {
        this.$store.dispatch("addPreferita", idNum);
      }
    },
  },
  created() {
    this.$store.dispatch("loadRecipes");
    this.$store.dispatch("loadComments");
  },
};
</script>
