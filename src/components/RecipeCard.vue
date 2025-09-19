<template>
  <div class="card shadow-sm h-100 d-flex flex-column recipe-card">
    <!-- router-link solo per immagine + corpo -->
    <router-link
      :to="{ name: 'recipe-details', params: { id: ricetta.id } }"
      class="text-decoration-none text-dark flex-grow-1 d-flex flex-column"
    >
      <img
        :src="'/images/recipes/T_' + ricetta.immagine"
        :alt="ricetta.nome"
        class="card-img-top"
      />
      <div class="card-body p-3 flex-grow-1">
        <h5 class="card-title">{{ ricetta.nome }}</h5>
        <p class="card-text">{{ ricetta.descrizioneBreve }}</p>
      </div>
    </router-link>

    <!-- footer sempre in fondo, NON linkato -->
    <div class="card-footer d-flex justify-content-between align-items-center">
      <span class="badge bg-primary">{{ ricetta.categoria }}</span>
      <span
        v-if="$store.getters.isPreferita(ricetta.id)"
        class="badge bg-danger text-white"
      >
        ❤️ Preferita
      </span>
    </div>
  </div>
</template>
<script>
export default {
  props: ["ricetta"],
};
</script>
