<template>
  <h3 class="mb-3">Login</h3>
  <form @submit.prevent="doLogin">
    <div class="mb-3">
      <label>Email</label>
      <input v-model="email" type="email" class="form-control" required />
    </div>
    <div class="mb-3">
      <label>Password</label>
      <input v-model="password" type="password" class="form-control" required />
    </div>
    <button type="submit" class="btn btn-primary w-100">Login</button>
  </form>

  <div v-if="error" class="alert alert-danger mt-3">Login non riuscito</div>
</template>

<script>
export default {
  data() {
    return {
      email: "",
      password: "",
      error: false,
    };
  },
  methods: {
    async doLogin() {
      try {
        await this.$store.dispatch("login", {
          email: this.email,
          password: this.password,
        });
        this.$router.push({ name: "profilo" });
      } catch (e) {
        this.error = true;
      }
    },
  },
  created() {
    this.$store.dispatch("loadUsers");
  },
};
</script>
