store = Redux.createStore(datastoreReducers)

store.subscribe(function() {
  console.log('State changed!', store.getState())
})

console.log('store', store.getState())
