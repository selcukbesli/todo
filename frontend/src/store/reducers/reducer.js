const initialState = {
  todoList: [
    {
      name: "",
      completed: "",
      created: "",
      _id: "",
    },
  ],
  fetchTodoIsLoading: false,
  fetchTodoError: "",
  toggleCompletedIsLoading: "",
  toggleCompletedError: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "FETCH_TODO_START":
      return { ...state, fetchTodoIsLoading: true, fetchTodoError: "" };
    case "FETCH_TODO_SUCCESS":
      return {
        ...state,
        todoList: action.payload,
        fetchTodoIsLoading: false,
        fetchTodoError: "",
      };
    case "FETCH_TODO_FAIL":
      return {
        ...state,
        fetchTodoIsLoading: false,
        fetchTodoError: action.payload,
      };
    case "TOGGLE_COMPLETED_START":
      return {
        ...state,
        toggleCompletedIsLoading: true,
        toggleCompletedError: "",
      };
    case "TOGGLE_COMLETED_SUCCESS":
      return {
        ...state,
        todoList: state.todoList.map((item) =>
          item._id === action.payload._id ? action.payload : item
        ),
        toggleCompletedIsLoading: false,
        toggleCompletedError: "",
      };
    case "TOGGLE_COMPLETED_FAIL":
      return {
        ...state,
        toggleCompletedIsLoading: false,
        toggleCompletedError: action.payload,
      };
    default:
      return state;
  }
};

export default reducer;
