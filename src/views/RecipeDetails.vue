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
          <div>
            <h2 class="mb-0">{{ ricetta.nome }}</h2>
            <small class="text-muted">
              Autore: {{ autore ? autore.username : "Utente sconosciuto" }}
            </small>
          </div>
          <div class="d-flex justify-content-end gap-2">
            <button
              v-if="$store.getters.isLoggedIn"
              @click="togglePreferita"
              class="btn btn-sm btn-outline-danger"
            >
              <span v-if="isPreferita">Preferita ❤️</span>
              <span v-else>Aggiungi alle preferite🤍</span>
            </button>
            <router-link
              v-if="ricetta.authorId === $store.getters.currentUser?.id"
              :to="{ name: 'editor', params: { id: ricetta.id } }"
              class="btn btn-sm btn-outline-primary"
            >
              Modifica ✏️
            </router-link>
            <button
              v-if="ricetta.authorId === $store.getters.currentUser?.id"
              @click="eliminaRicetta"
              class="btn btn-sm btn-outline-danger"
            >
              Elimina ricetta 🗑️
            </button>
          </div>
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

          <div class="accordion" id="accordionCommenti">
            <div class="accordion-item">
              <h2 class="accordion-header" id="headingCommenti">
                <button
                  class="accordion-button collapsed"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseCommenti"
                  aria-expanded="false"
                  aria-controls="collapseCommenti"
                >
                  Vedi commenti ({{ commenti.length }})
                </button>
              </h2>
              <div
                id="collapseCommenti"
                class="accordion-collapse collapse"
                aria-labelledby="headingCommenti"
                data-bs-parent="#accordionCommenti"
              >
                <div class="accordion-body">
                  <div v-if="commenti.length > 0" class="list-group">
                    <div
                      v-for="c in commentiConUtente"
                      :key="c.id"
                      class="list-group-item d-flex flex-column"
                    >
                      <strong>{{ c.username }}</strong>
                      <span>{{ c.testo }}</span>
                    </div>
                  </div>
                  <div v-else>
                    <p>Nessun commento per questa ricetta.</p>
                  </div>

                  <!-- Form per aggiungere un commento -->
                  <div v-if="$store.getters.isLoggedIn" class="mt-3">
                    <textarea
                      v-model="nuovoCommento"
                      class="form-control mb-2"
                      placeholder="Scrivi un commento..."
                    ></textarea>
                    <button
                      class="btn btn-primary btn-sm"
                      @click="aggiungiCommento"
                    >
                      Aggiungi commento
                    </button>
                  </div>
                </div>
              </div>
            </div>
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
  data() {
    return {
      nuovoCommento: "",
    };
  },
  computed: {
    ricetta() {
      return this.$store.getters.ricette.find((c) => c.id == this.id);
    },
    autore() {
      const users = this.$store.getters.users || [];
      return users.find((u) => u.id === this.ricetta?.authorId);
    },
    commenti() {
      return this.$store.getters.commenti.filter((c) => c.recipeId == this.id);
    },
    commentiConUtente() {
      const users = this.$store.getters.users || [];
      return this.commenti.map((c) => {
        const user = users.find((u) => u.id === c.userId);
        return {
          ...c,
          username: user ? user.username : "Utente sconosciuto",
        };
      });
    },
    isPreferita() {
      return this.$store.getters.isPreferita(this.id);
    },
  },

  methods: {
    togglePreferita() {
      if (this.isPreferita) {
        this.$store.dispatch("removePreferita", this.id);
      } else {
        this.$store.dispatch("addPreferita", this.id);
      }
    },
    async aggiungiCommento() {
      if (!this.nuovoCommento.trim()) return;

      const commento = {
        recipeId: this.id,
        userId: this.$store.getters.currentUser.id,
        testo: this.nuovoCommento,
      };

      await this.$store.dispatch("addCommento", commento);
      this.nuovoCommento = "";
    },
    async eliminaRicetta() {
      if (!confirm("Sei sicuro di voler eliminare questa ricetta?")) return;

      try {
        await this.$store.dispatch("eliminaRicetta", this.ricetta.id);
        this.$router.push({ name: "profilo" });
      } catch (error) {
        alert(error.message);
      }
    },
  },
  created() {
    if (
      !this.$store.getters.ricette ||
      this.$store.getters.ricette.length === 0
    ) {
      this.$store.dispatch("loadRecipes");
    }
    if (
      !this.$store.getters.commenti ||
      this.$store.getters.commenti.length === 0
    ) {
      this.$store.dispatch("loadComments");
    }
    if (!this.$store.getters.users || this.$store.getters.users.length === 0) {
      this.$store.dispatch("loadUsers");
    }
  },
};
</script>
