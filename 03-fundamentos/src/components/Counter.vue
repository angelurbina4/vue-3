<template>
  <h2>Counter</h2>
  <p>{{ counter }} <sup>2</sup> = {{ squareCounter }}</p>
  <div>
    <button @click="increase">+</button>
    <button @click="decrease">-</button>
  </div>
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
    },
    increase() {
      this.counter++;
    },
    decrease() {
      this.counter--;
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

button{
  margin: 0 5px;
  padding: 5px 15px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: #39a962;
  cursor: pointer;
  color: white;
  transition: 0.3s ease-in-out;
}

button:hover {
  background-color: #2c3e50;
  transition: 0.3s ease-in-out;
}

</style>