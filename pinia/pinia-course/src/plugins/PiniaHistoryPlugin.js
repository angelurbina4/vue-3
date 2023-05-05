import { ref, reactive } from 'vue';

export function piniaHistoryPlugin({ pinia, app, store, options }) {
  if (!options.historyEnabled) return;
  const history = reactive([]);
  const future = reactive([]);
  const doingHistory = ref(false);
  history.push(JSON.stringify(store.$state));

  const redoUndo = (fromStack, toStack) => {
    console.log('history', history);
    if (fromStack.length === 0) return;
    doingHistory.value = true;
    toStack.push(fromStack.pop());
    store.$state = JSON.parse(history.at(-1))
    doingHistory.value = false;
  }
  store.$subscribe((mutation, state) => {
    if (!doingHistory.value) {
      history.push(JSON.stringify(state));
      future.splice(0, future.length);
    }
  });
  return {
    history,
    future,
    undo: () => {
      return redoUndo(history, future)
    },
    redo: () => {
      return redoUndo(future, history)
    }
  };
}