import { defineStore, acceptHMRUpdate } from "pinia";
import { groupBy } from "lodash";
import { useAuthUserStore } from "../components/AuthUserStore";

export const useCartStore = defineStore("CartStore", {
  historyEnabled: true,
  state: () => {
    return {
      items: [],
    };
  },
  getters: {
    count: (state) => state.items.length,
    isEmpty: (state) => state.items.length === 0,
    grouped: (state) => {
      const grouped = groupBy(state.items, (item) => item.name);
      const sorted = Object.keys(grouped).sort();
      let inOrder = {};
      sorted.forEach((key) => (inOrder[key] = grouped[key]));
      return inOrder;
    },
    groupCount: (state) => (name) => state.grouped[name].length,
    total: (state) => state.items.reduce((acc, item) => acc + item.price, 0),
  },
  actions: {
    checkout() {
      const authUserStore = useAuthUserStore();

      alert(`${authUserStore.username} just bought ${this.count} items at a total of $${this.total}`);
    },
    addItems(count, item) {
      count = parseInt(count);
      // throw new Error("Error test adding items");
      const newItems = Array.from({ length: count }, () => ({ ...item }));
      // console.log('newitems', newItems);
      this.items.push(...newItems);
    },
    clearItem(itemName) {
      this.items = this.items.filter(item => item.name !== itemName);
    },
    setItemCount(item, count) {
      this.clearItem(item.name);
      this.addItems(count, item);
    },
  },
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useCartStore, import.meta.hot));
}