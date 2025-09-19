<template>
  <div class="container-xxl my-4">
    <h1 class="mb-5 text-center">Le nostre ricette</h1>
    <div
      class="row justify-content-center row-cols-1 row-cols-sm-2 row-cols-lg-3 row-cols-xxl-4 gy-md-4"
    >
      <div v-for="ricetta in ricette" :key="ricetta.id" class="col d-flex mb-4">
        <div class="flex-fill px-md-2">
          <RecipeCard :ricetta="ricetta"> </RecipeCard>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import RecipeCard from "@/components/RecipeCard.vue";

export default {
  components: {
    RecipeCard,
  },
  computed: {
    ricette() {
      return this.$store.getters.ricette;
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
