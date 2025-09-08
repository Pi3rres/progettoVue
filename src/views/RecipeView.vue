<template>
  <div>
    <h1>In questa pagina mettiamo poi le ricette</h1>
    <RecipeCard v-for="ricetta in ricette" :key="ricetta.id" :ricetta="ricetta">
    </RecipeCard>
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
    this.$store.dispatch("loadRecipes");
  },
};
</script>
