const app = Vue.createApp({
  // template: `
  //   <h1>Hello World</h1>
  // `
 
  data() {
    return {
      quote: "I'm Batman",
      author: 'Bruce Wayne',
    }
  },
  methods: {
    changeQuote() {
      console.log('changeQuote')
      this.quote = 'I am the night'

      this.capitalize()
    },
    capitalize() {
      this.quote = this.quote.toUpperCase()
    }
  }
})
app.mount('#myApp')