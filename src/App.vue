<template>
  <div class="d-flex flex-column min-vh-100">
    <header>
      <NavBar />
    </header>

    <router-view />

    <footer class="footer py-3 bg-dark text-white-50 text-center">
      <div class="container">
        <span>Progetto didattico &copy; 2025 &mdash; AutoApp</span>
      </div>
    </footer>
  </div>
</template>

<script>
import NavBar from "./components/NavBar.vue";
export default {
  components: { NavBar },
};
</script>

<style></style>
