<template>
  <div class="home">
    <h1>Reactive vs ref</h1>
    <h3>{{ ironman }}</h3>
    <h3>{{ hulk }}</h3>
    <button @click="changeIronman">cambiar iron man</button>
    <button @click="changeHulk">cambiar hulk</button>

    <h3>{{ ironmanIsAlive }}</h3>
    <h3>{{ hulkIsAlive }}</h3>
    <button @click="changeStatus">cambiar status</button>


  </div>
</template>

<script>
import { reactive, ref } from 'vue'

export default {
  name: 'HomeView',
  setup() {

    const ironman = ref({ name: 'Tony Stark', age: 45 })
    const hulk = reactive({ name: 'Bruce Banner', age: 35 })

    const ironmanIsAlive = reactive(true) // reactive no funciona con tipos primitivos
    const hulkIsAlive = ref(true) // ref funciona con tipos primitivos

    const changeStatus = () => {
      // ironmanIsAlive.isAlive = false // reactive no funciona con tipos primitivos
      hulkIsAlive.value = false
    }
    
    return {
      ironman,
      hulk,

      ironmanIsAlive,
      hulkIsAlive,
      changeStatus,

      changeIronman: () => {
        ironman.value.name = 'Tony',
        ironman.value.age = 'Stark'
      },
      changeHulk: () => {
        hulk.name = 'Bruce',
        hulk.age = 'Banner'
      }
    }

  }
}
</script>
