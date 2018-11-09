const todos = (state = [], action) => {
  switch (action.type) {
    case "ADD_TODO":
      return state.push({
        name: "G",
        age: 20
      });
    case "TOGGLE_TODO":
      return state.splice(state.length - 1);
    default:
      return state;
  }
};

export default todos;
