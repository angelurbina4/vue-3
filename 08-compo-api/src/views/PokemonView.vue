<template lang="">
  <h1>Pokemon</h1>
</template>
<script>
import { useRoute } from 'vue-router'

export default {

  setup() {

    const route = useRoute()

    console.log(route.params)

    return {}
  }
  
}
</script>