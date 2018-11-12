let names = [
  {
    name: "S",
    age: 18
  },
  {
    name: "D",
    age: 19
  }
];
const todos = (state = names, action) => {
  switch (action.type) {
    case "ADD_TODO":
      return Object.assign([], state, state.push(action.content));
    case "TOGGLE_TODO":
      return names.splice(state.length - 1);
    default:
      return state;
  }
};

export default todos;
