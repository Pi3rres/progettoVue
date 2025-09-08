<template>
  <div class="d-flex flex-column min-vh-100">
    <header>
      <NavBar />
    </header>

    <router-view />

    <footer>
      <FooterApp />
    </footer>
  </div>
</template>

<script>
import FooterApp from "./components/FooterApp.vue";
import NavBar from "./components/NavBar.vue";
export default {
  components: { NavBar, FooterApp },
};
</script>

<style></style>
