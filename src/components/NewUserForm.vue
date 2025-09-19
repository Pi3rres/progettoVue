<template>
  <div>
    <h3 class="mb-3">Registrazione</h3>
    <form @submit.prevent="registerUser">
      <div class="mb-3">
        <label>Username</label>
        <input v-model="username" type="text" class="form-control" required />
      </div>
      <div class="mb-3">
        <label>Email</label>
        <input v-model="email" type="email" class="form-control" required />
      </div>
      <div class="mb-3">
        <label>Password</label>
        <input
          v-model="password"
          type="password"
          class="form-control"
          required
        />
      </div>
      <button type="submit" class="btn btn-success w-100">Registrati</button>
    </form>

    <div v-if="error" class="alert alert-danger mt-3">{{ error }}</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: "",
      email: "",
      password: "",
      error: null,
    };
  },
  methods: {
    async registerUser() {
      try {
        await this.$store.dispatch("register", {
          username: this.username,
          email: this.email,
          password: this.password,
        });
        this.$router.push({ name: "profilo" });
      } catch (e) {
        this.error = e.message;
      }
    },
  },
};
</script>
