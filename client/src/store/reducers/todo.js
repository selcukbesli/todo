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
  toggleCompletedIsLoading: false,
  toggleCompletedError: "",
  postTodoIsLoading: false,
  postTodoError: "",
  removeTodosIsLoading: false,
  removeTodosError: "",
  removeTodoIsLoading: false,
  removeTodoError: "",
  updateTodoIsLoading: false,
  updateTodoError: "",
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
    case "TOGGLE_COMPLETED_SUCCESS":
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
    case "POST_TODO_START":
      return {
        ...state,
        postTodoIsLoading: true,
        postTodoError: "",
      };
    case "POST_TODO_SUCCESS":
      return {
        ...state,
        todoList: [...state.todoList, action.payload],
        postTodoIsLoading: false,
        postTodoError: "",
      };
    case "POST_TODO_FAIL":
      return {
        ...state,
        postTodoIsLoading: false,
        postTodoError: action.payload,
      };
    case "REMOVE_TODOS_START":
      return {
        ...state,
        removeTodosIsLoading: true,
        removeTodosError: "",
      };
    case "REMOVE_TODOS_SUCCESS":
      return {
        ...state,
        todoList: state.todoList.filter((item) => item.completed === false),
        removeTodosIsLoading: false,
        removeTodosError: "",
      };
    case "REMOVE_TODOS_FAIL":
      return {
        ...state,
        removeTodosIsLoading: false,
        removeTodosError: action.payload,
      };
    case "REMOVE_TODO_START":
      return {
        ...state,
        removeTodoIsLoading: true,
        removeTodoError: "",
      };
    case "REMOVE_TODO_SUCCESS":
      return {
        ...state,
        todoList: state.todoList.filter(
          (item) => item._id !== action.payload._id
        ),
        removeTodoIsLoading: false,
        removeTodoError: "",
      };
    case "REMOVE_TODO_FAIL":
      return {
        ...state,
        removeTodoIsLoading: false,
        removeTodoError: action.payload,
      };
    case "UPDATE_TODO_START":
      return {
        ...state,
        updateTodoIsLoading: true,
        updateTodoError: "",
      };
    case "UPDATE_TODO_SUCCESS":
      return {
        ...state,
        todoList: state.todoList.map((item) =>
          item._id === action.payload._id ? action.payload : item
        ),
        updateTodoIsLoading: false,
        updateTodoError: "",
      };
    case "UPDATE_TODO_FAIL":
      return {
        ...state,
        updateTodoIsLoading: false,
        updateTodoError: action.payload,
      };
    default:
      return state;
  }
};

export default reducer;
