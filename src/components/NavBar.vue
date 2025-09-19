<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <div class="container-fluid">
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <router-link class="nav-link text-white" :to="{ name: 'home' }"
              >Home</router-link
            >
          </li>
          <li class="nav-item">
            <router-link class="nav-link text-white" :to="{ name: 'ricette' }"
              >Ricette</router-link
            >
          </li>
          <li class="nav-item d-flex align-items-center px-2 text-white">|</li>
          <li v-if="$store.getters.isLoggedIn" class="nav-item">
            <router-link class="nav-link text-white" :to="{ name: 'editor' }"
              >Editor</router-link
            >
          </li>
          <li v-if="$store.getters.isLoggedIn" class="nav-item">
            <router-link class="nav-link text-white" :to="{ name: 'profilo' }"
              >Profilo ({{ $store.state.currentUser.username }})</router-link
            >
          </li>
          <li
            v-if="$store.getters.isLoggedIn"
            class="nav-item d-flex align-items-center px-2 text-white"
          >
            |
          </li>
          <li v-if="!$store.getters.isLoggedIn" class="nav-item">
            <router-link class="nav-link text-white" :to="{ name: 'login' }">
              Accedi
            </router-link>
          </li>
          <li v-else class="nav-item">
            <a href="#" class="nav-link text-white" @click.prevent="logout">
              Logout
            </a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>
<script>
export default {
  methods: {
    logout() {
      this.$router.push({ name: "home" });
      this.$store.dispatch("logout");
    },
  },
};
</script>
