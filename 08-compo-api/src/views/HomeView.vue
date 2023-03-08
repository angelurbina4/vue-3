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
import { ref } from 'vue'

export default {
  name: 'HomeView',
  setup() {

    const ironman = ref({ name: 'Tony Stark', age: 45 })
    const hulk = ref({ name: 'Bruce Banner', age: 35 })

    const ironmanIsAlive = ref(true)
    const hulkIsAlive = ref(true)

    const changeStatus = () => {
      ironmanIsAlive.value = false
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
        hulk.value.name = 'Bruce',
        hulk.value.age = 'Banner'
      }
    }

  }
}
</script>
