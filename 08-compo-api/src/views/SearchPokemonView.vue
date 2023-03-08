<template lang="">
  <h1>Buscar Pokemon {{ pokemonId }}</h1>
  <form @submit.prevent="onSubmit">
    <input
      type="number"
      placeholder="Numero de pokemon"
      autofocus
      v-model="pokemonId"
    >
  </form>
  <br/>
  <span>Presione enter para buscar </span>
</template>
<script>
import { ref } from 'vue'

export default {

  setup() {

    const pokemonId = ref(1)

    return {
      pokemonId,

      onSubmit: () => {
        console.log('pokemon a buscar', pokemonId.value)
      }
    }
  }
  
}
</script>