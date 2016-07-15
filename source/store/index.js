const store = Redux.createStore(searchApp)

store.subscribe(function() {
  console.log('State changed!', store.getState())
})
