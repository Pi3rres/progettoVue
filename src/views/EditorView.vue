<template>
  <main class="container py-4">
    <h2 class="mb-4">Crea una nuova ricetta</h2>

    <form @submit.prevent="salvaRicetta" class="row g-3">
      <!-- Nome -->
      <div class="col-12">
        <label class="form-label">Nome ricetta</label>
        <input v-model="form.nome" type="text" class="form-control" required />
      </div>

      <!-- Categoria -->
      <div class="col-md-6">
        <label class="form-label">Categoria</label>
        <select v-model="form.categoria" class="form-select" required>
          <option disabled value="">Seleziona una categoria</option>
          <option>Antipasti</option>
          <option>Primi piatti</option>
          <option>Secondi piatti</option>
          <option>Dolci</option>
        </select>
      </div>

      <!-- Immagine (nome file) -->
      <div class="col-md-6">
        <label class="form-label">Immagine (nome file)</label>
        <input
          v-model="form.immagine"
          type="text"
          class="form-control"
          placeholder="es: pasta.jpg"
        />
      </div>

      <!-- Descrizione breve -->
      <div class="col-12">
        <label class="form-label">Descrizione breve</label>
        <textarea
          v-model="form.descrizioneBreve"
          class="form-control"
          rows="2"
          required
        ></textarea>
      </div>

      <!-- Ingredienti -->
      <div class="col-12">
        <label class="form-label">Ingredienti</label>
        <div v-for="(ing, i) in form.ingredienti" :key="i" class="d-flex mb-2">
          <input
            v-model="form.ingredienti[i]"
            type="text"
            class="form-control me-2"
            placeholder="Ingrediente"
          />
          <button
            type="button"
            class="btn btn-danger btn-sm"
            @click="rimuoviIngrediente(i)"
          >
            ✖
          </button>
        </div>
        <button
          type="button"
          class="btn btn-outline-primary btn-sm"
          @click="aggiungiIngrediente"
        >
          ➕ Aggiungi ingrediente
        </button>
      </div>

      <!-- Procedimento -->
      <div class="col-12">
        <label class="form-label">Procedimento</label>
        <textarea
          v-model="form.procedimento"
          class="form-control"
          rows="5"
          required
        ></textarea>
      </div>

      <!-- Pulsante salva -->
      <div class="col-12">
        <button type="submit" class="btn btn-success">Salva ricetta</button>
      </div>
    </form>
  </main>
</template>

<script>
export default {
  name: "EditorView",
  data() {
    return {
      form: {
        nome: "",
        categoria: "",
        immagine: "",
        descrizioneBreve: "",
        procedimento: "",
        ingredienti: [""],
      },
    };
  },
  methods: {
    aggiungiIngrediente() {
      this.form.ingredienti.push("");
    },
    rimuoviIngrediente(i) {
      this.form.ingredienti.splice(i, 1);
    },
    async salvaRicetta() {
      if (!this.$store.getters.currentUser) {
        alert("Devi essere loggato per inserire una ricetta.");
        return;
      }

      try {
        await this.$store.dispatch("addRecipe", this.form);
        this.$router.push({ name: "profilo" });
      } catch (error) {
        console.error("Errore nell'aggiunta della ricetta:", error);
        alert("Si è verificato un errore. Riprova.");
      }
    },
  },
};
</script>
