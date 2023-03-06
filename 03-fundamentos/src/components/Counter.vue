<template>
  <h2>Counter</h2>
  <p>{{ counter }} <sub>2</sub> = {{ squareCounter }}</p>
</template>

<script>
export default {
  // name: 'Counter'
  data() {
    return {
      counter: 5
    }
  },
  // methods are not cached and re-evaluated every time they are called
  methods: {
    getSquareValue() {
      return this.counter * this.counter;
    }
  },
  // computed properties are cached and only re-evaluated when some of their reactive dependencies have changed
  computed: { 
    squareCounter() {
      return this.counter * this.counter;
    }
  }
}
</script>

<style>

</style>