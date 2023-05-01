<script setup>
import TheHeader from "@/components/TheHeader.vue";
import ProductCard from "@/components/ProductCard.vue";
import AppButton from "@/components/AppButton.vue";
// import products from "@/data/products.json";
import { useProductStore } from "@/stores/ProductStore";
import { useCartStore } from "@/stores/CartStore";
import { ref, reactive } from "vue";

const productStore = useProductStore();
const cartStore = useCartStore();

const history = reactive([]);
const future = reactive([]);
const doingHistory = ref(false);
history.push(JSON.stringify(cartStore.$state));

const redoUndo = (fromStack, toStack) => {
  if (fromStack.length === 0) return;
  doingHistory.value = true;
  toStack.push(fromStack.pop());
  cartStore.$state = JSON.parse(history.at(-1))
  doingHistory.value = false;
}
const undo = () => {
  return redoUndo(history, future)
}
const redo = () => {
  return redoUndo(future, history)
}
cartStore.$subscribe((mutation, state) => {
  if (!doingHistory.value) {
    history.push(JSON.stringify(state));
    future.splice(0, future.length);
  }
});

cartStore.$onAction(({ name, store, args, after, onError }) => {
  if (name === "addItems") {
    after(() => {
      console.log(args[0])
    })
    onError((error) => {
      console.log("error", error.message);
    })
  }
});

productStore.getProducts();
</script>

<template>
  <div class="container">
    <TheHeader />
    <div class="mb-5 flex justify-end">
      <AppButton @click="undo">Undo</AppButton>
      <AppButton class="ml-2" @click="redo">Redo</AppButton>
    </div>
    <ul class="sm:flex flex-wrap lg:flex-nowrap gap-5">
      <ProductCard v-for="product in productStore.products" :key="product.name" :product="product"
        @addToCart="cartStore.addItems($event, product)" />
    </ul>
  </div>
</template>
