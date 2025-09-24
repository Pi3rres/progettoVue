<template>
  <main class="flex-grow-1">
    <div class="container py-4">
      <h2 class="mb-4">
        {{ isEditing ? "Modifica ricetta" : "Crea una nuova ricetta" }}
      </h2>

      <form @submit.prevent="salvaRicetta" class="row g-3">
        <!-- Nome -->
        <div class="col-12">
          <label class="form-label">Nome ricetta</label>
          <input
            v-model="form.nome"
            type="text"
            class="form-control"
            required
          />
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
        <div v-if="uploadEnabled" class="mb-3">
          <label class="form-label">Carica immagine</label>
          <input type="file" class="form-control" @change="handleFileChange" />
          <small class="text-muted">
            Verrà salvata come: {{ form.immagine }}
          </small>
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
          <div
            v-for="(ing, i) in form.ingredienti"
            :key="i"
            class="d-flex mb-2"
          >
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
          <button type="submit" class="btn btn-success">
            {{ isEditing ? "Aggiorna ricetta" : "Salva ricetta" }}
          </button>
        </div>
      </form>
    </div>
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

      file: null, // il file da caricare
    };
  },
  computed: {
    isEditing() {
      return !!this.$route.params.id;
    },
    uploadEnabled() {
      return this.$store.getters.uploadEnabled;
    },
    ricettaEsistente() {
      return this.$store.getters.ricette.find(
        (r) => r.id === this.$route.params.id
      );
    },
  },
  methods: {
    aggiungiIngrediente() {
      this.form.ingredienti.push("");
    },
    rimuoviIngrediente(i) {
      this.form.ingredienti.splice(i, 1);
    },
    handleFileChange(e) {
      this.file = e.target.files[0];
    },
    async salvaRicetta() {
      if (!this.$store.getters.currentUser) {
        alert("Devi essere loggato per inserire una ricetta.");
        return;
      }

      try {
        if (this.isEditing) {
          const updatedFields = {
            nome: this.form.nome,
            categoria: this.form.categoria,
            immagine: this.form.immagine,
            descrizioneBreve: this.form.descrizioneBreve,
            procedimento: this.form.procedimento,
            ingredienti: this.form.ingredienti,
          };

          await this.$store.dispatch("updateRicetta", {
            id: this.$route.params.id,
            ...updatedFields,
          });
        } else {
          await this.$store.dispatch("addRecipe", {
            recipe: this.form,
            file: this.file,
          });
        }
        this.$router.push({ name: "profilo" });
      } catch (error) {
        console.error("Errore nel salvataggio della ricetta:", error);
        alert("Si è verificato un errore. Riprova.");
      }
    },
  },
  async created() {
    if (!this.$store.getters.ricette.length) {
      await this.$store.dispatch("loadRecipes");
    }
    await this.$store.dispatch("checkBackend");

    if (this.isEditing) {
      const r = this.$store.getters.ricette.find(
        (r) => r.id === this.$route.params.id
      );

      if (!r) {
        alert("Ricetta non trovata.");
        this.$router.push({ name: "ricette" });
        return;
      }

      // Controllo autore
      if (r.authorId !== this.$store.getters.currentUser.id) {
        alert("Non puoi modificare ricette di altri utenti.");
        //this.$router.push({ name: "ricette" });
        return;
      }

      this.form.nome = r.nome;
      this.form.categoria = r.categoria;
      this.form.immagine = r.immagine;
      this.form.descrizioneBreve = r.descrizioneBreve;
      this.form.procedimento = r.procedimento;
      this.form.ingredienti = [...r.ingredienti];
    }
  },
};
</script>
