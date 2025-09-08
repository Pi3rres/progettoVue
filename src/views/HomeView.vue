<template>
  <main
    class="flex-grow-1 d-flex align-items-start justify-content-center"
    style="background: url('/images/BG_Home.jpg') center/cover no-repeat"
  >
    <div
      class="bg-primary container p-5 rounded-3 shadow mt-5 opacity-5"
      style="--bs-bg-opacity: 0.85"
    >
      <div class="container-fluid py-5">
        <h1 class="display-5 fw-bold text-white">Appunti di cucina</h1>
        <p class="col-md-8 fs-4 text-white">Piccolo ricettario condiviso</p>
        <router-link
          :to="{ name: 'ricette' }"
          class="btn btn-light btn-lg"
          type="button"
        >
          Ricette
        </router-link>
      </div>
    </div>
  </main>
</template>

<script>
export default {
  name: "HomeView",
};
</script>
