<template>
  <main class="flex-grow-1 d-flex justify-content-center">
    <div class="container mt-5" style="max-width: 400px">
      <div class="d-flex justify-content-center mb-4">
        <button
          class="btn me-2"
          :class="activeTab === 'login' ? 'btn-primary' : 'btn-outline-primary'"
          @click="activeTab = 'login'"
        >
          Login
        </button>
        <button
          class="btn"
          :class="
            activeTab === 'register' ? 'btn-primary' : 'btn-outline-primary'
          "
          @click="activeTab = 'register'"
        >
          Registrati
        </button>
      </div>

      <LoginForm v-if="activeTab === 'login'" />
      <NewUserForm v-else />
    </div>
  </main>
</template>

<script>
import LoginForm from "@/components/LoginForm.vue";
import NewUserForm from "@/components/NewUserForm.vue";

export default {
  components: { LoginForm, NewUserForm },
  data() {
    return {
      activeTab: "login", // default login
    };
  },
};
</script>
