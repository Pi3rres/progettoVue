<template>
  <main class="container py-4">
    <h2 class="mb-4">Profilo utente</h2>

    <p v-if="$store.getters.currentUser">
      <strong>Username:</strong> {{ user.username }}
    </p>
    <p v-if="$store.getters.currentUser">
      <strong>Email:</strong> {{ user.email || "non disponibile" }}
    </p>

    <h4 class="mt-4">Le tue ricette</h4>
    <div
      v-if="mieRicette.length > 0"
      class="row row-cols-1 row-cols-sm-2 row-cols-lg-3 row-cols-xxl-4 gy-md-4"
    >
      <div v-for="ricetta in mieRicette" :key="ricetta.id" class="col">
        <div style="max-width: 300px; width: 100%">
          <RecipeCard :ricetta="ricetta" />
        </div>
      </div>
    </div>
    <p v-else>Non hai ancora pubblicato ricette.</p>

    <h4 class="mt-4 bt-4">Ricette preferite</h4>
    <div
      v-if="preferite.length > 0"
      class="row row-cols-1 row-cols-sm-2 row-cols-lg-3 row-cols-xxl-4 gy-md-4"
    >
      <div v-for="ricetta in preferite" :key="ricetta.id" class="col">
        <div style="max-width: 300px; width: 100%">
          <RecipeCard :ricetta="ricetta" />
        </div>
      </div>
    </div>
    <p v-else>Nessuna ricetta preferita.</p>
  </main>
</template>

<script>
import RecipeCard from "@/components/RecipeCard.vue";

export default {
  name: "UserView",
  components: { RecipeCard },
  computed: {
    user() {
      return this.$store.getters.currentUser;
    },
    mieRicette() {
      const ricette = this.$store.getters.ricette;
      const user = this.user;
      if (!user || !user.id) return [];
      return ricette.filter((r) => r.authorId === this.user.id);
    },
    preferite() {
      const ricette = this.$store.getters.ricette;
      const user = this.user;
      if (!user || !user.preferiti) return [];
      return ricette.filter((r) => this.user.preferiti.includes(String(r.id)));
    },
  },
  created() {
    if (
      !this.$store.getters.ricette ||
      this.$store.getters.ricette.length === 0
    ) {
      this.$store.dispatch("loadRecipes");
    }
  },
};
</script>
