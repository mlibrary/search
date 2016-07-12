const { createStore } = require("redux")

const reducer = function(state, action) {
  return "fred"
}

const store = createStore(reducer, 0)

store.subscribe(() => {
  console.log("store changed", store.getState())
})

store.dispatch({type: "INC", payload: 1})
