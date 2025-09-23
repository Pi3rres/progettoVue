<template>
  <main
    class="flex-grow-1 d-flex flex-column align-items-center"
    style="background: url('/images/BG_Home.jpg') center/cover no-repeat"
  >
    <!-- Hero principale -->
    <div
      class="bg-primary container p-3 p-md-5 rounded-3 shadow mt-5"
      style="--bs-bg-opacity: 0.85"
    >
      <div class="container-fluid py-5 text-center text-white">
        <h1 class="display-5 fw-bold">Appunti di cucina</h1>
        <p class="col-md-10 mx-auto fs-4">
          Il tuo piccolo ricettario condiviso, dove la passione per la cucina
          incontra la condivisione.
        </p>
      </div>
    </div>

    <section class="container my-5 d-flex justify-content-center">
      <div
        class="bg-dark text-white p-4 rounded-3 shadow"
        style="--bs-bg-opacity: 0.6; max-width: 700px"
      >
        <blockquote class="fst-italic fs-4 mb-2 text-center">
          “Il cibo trova sempre coloro che amano cucinare.”
        </blockquote>
        <hr
          class="border-light opacity-25 my-3"
          style="width: 40%; margin: 0 auto"
        />
        <footer class="text-light text-opacity-75 text-center mt-2">
          A. Gusteau – <cite title="Ratatouille">Ratatouille</cite>
        </footer>
      </div>
    </section>

    <!-- Sezione feature -->
    <div class="container my-5">
      <div class="row g-4">
        <!-- Box 1 - Community -->
        <div class="col-md-4">
          <div
            class="bg-primary text-white p-4 rounded-3 shadow h-100 d-flex flex-column justify-content-between"
            style="--bs-bg-opacity: 0.85"
          >
            <div>
              <h3 class="fw-bold">Una community sempre attiva</h3>
              <p class="mt-2">
                Ogni giorno puoi trovare nuove ricette e ispirazioni dalla
                nostra community di appassionati di cucina.
              </p>
            </div>
            <router-link
              :to="{ name: 'ricette' }"
              class="btn btn-light mt-3 align-self-start"
            >
              Scopri le ricette
            </router-link>
          </div>
        </div>

        <!-- Box 2 - Registrazione -->
        <div class="col-md-4">
          <div
            class="bg-primary text-white p-4 rounded-3 shadow h-100 d-flex flex-column justify-content-between"
            style="--bs-bg-opacity: 0.85"
          >
            <div>
              <h3 class="fw-bold">Registrati e partecipa</h3>
              <p class="mt-2">
                Con un profilo personale puoi pubblicare e gestire le tue
                ricette, contribuendo alla crescita del ricettario condiviso.
              </p>
            </div>
            <router-link
              v-if="!isLoggedIn"
              :to="{ name: 'login' }"
              class="btn btn-light mt-3 align-self-start"
            >
              Registrati / Accedi
            </router-link>
            <router-link
              v-else
              :to="{ name: 'profilo' }"
              class="btn btn-light mt-3 align-self-start"
            >
              Vai al tuo profilo
            </router-link>
          </div>
        </div>

        <!-- Box 3 - Preferiti e commenti -->
        <div class="col-md-4">
          <div
            class="bg-primary text-white p-4 rounded-3 shadow h-100 d-flex flex-column justify-content-between"
            style="--bs-bg-opacity: 0.85"
          >
            <div>
              <h3 class="fw-bold">Interagisci e resta ispirato</h3>
              <p class="mt-2">
                Salva le tue ricette preferite, lascia un commento e scopri ogni
                volta nuove idee in cucina.
              </p>
            </div>
            <button
              class="btn btn-light mt-3 align-self-start"
              @click="vaiRicettaCasuale"
            >
              Una ricetta a sorpresa
            </button>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
export default {
  name: "HomeView",
  computed: {
    isLoggedIn() {
      return this.$store.getters.isLoggedIn;
    },
  },
  methods: {
    vaiRicettaCasuale() {
      const ricette = this.$store.getters.ricette;
      if (!ricette.length) {
        alert("Nessuna ricetta disponibile al momento.");
        return;
      }
      const random = ricette[Math.floor(Math.random() * ricette.length)];
      this.$router.push({
        name: "recipe-details",
        params: { id: random.id },
      });
    },
  },
  async created() {
    if (!this.$store.getters.ricette.length) {
      await this.$store.dispatch("loadRecipes");
    }
  },
};
</script>
