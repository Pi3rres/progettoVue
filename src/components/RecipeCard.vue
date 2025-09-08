<template>
  <div>
    <h4>{{ ricetta.nome }}</h4>
    <p>{{ ricetta.ingredienti }}</p>
    <p>{{ ricetta.preparazione }}</p>
    <p>--RICETTA--</p>
  </div>
</template>
<script>
export default {
  props: ["ricetta"],
};
</script>
