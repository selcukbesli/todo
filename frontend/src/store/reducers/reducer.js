const initialState = {
  todoList: [
    {
      name: "",
      completed: "",
      created: "",
      _id: "",
    },
  ],
  error: "",
  loading: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "FETCH_TODO_START":
      return { ...state, loading: true };
    case "FETCH_TODO_SUCCESS":
      return { ...state, todoList: action.payload, error: "", loading: false };
    case "FETCH_TODO_FAIL":
      return { ...state, error: action.payload, loading: false };
    default:
      return state;
  }
};

export default reducer;
