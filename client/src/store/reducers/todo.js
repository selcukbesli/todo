const initialState = {
  todoList: [
    {
      name: "",
      completed: "",
      created: "",
      _id: "",
      isLoading: false,
    },
  ],
  fetchTodoIsLoading: false,
  fetchTodoError: "",
  errorMessage: "",
  postTodoIsLoading: false,
  removeTodosIsLoading: false,
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
        todoList: state.todoList.map((item) =>
          item._id === action.payload ? { ...item, isLoading: true } : item
        ),
        errorMessage: "",
      };
    case "TOGGLE_COMPLETED_SUCCESS":
      return {
        ...state,
        todoList: state.todoList.map((item) =>
          item._id === action.payload._id
            ? { ...action.payload, isLoading: false }
            : item
        ),
        errorMessage: "",
      };
    case "TOGGLE_COMPLETED_FAIL":
      return {
        ...state,
        todoList: state.todoList.map((item) => {
          return { ...item, isLoading: false };
        }),
        errorMessage: action.payload,
      };
    case "POST_TODO_START":
      return {
        ...state,
        postTodoIsLoading: true,
        errorMessage: "",
      };
    case "POST_TODO_SUCCESS":
      return {
        ...state,
        todoList: [...state.todoList, action.payload],
        postTodoIsLoading: false,
        errorMessage: "",
      };
    case "POST_TODO_FAIL":
      return {
        ...state,
        postTodoIsLoading: false,
        errorMessage: action.payload,
      };
    case "REMOVE_TODOS_START":
      return {
        ...state,
        removeTodosIsLoading: true,
        errorMessage: "",
      };
    case "REMOVE_TODOS_SUCCESS":
      return {
        ...state,
        todoList: state.todoList.filter((item) => item.completed === false),
        removeTodosIsLoading: false,
        errorMessage: "",
      };
    case "REMOVE_TODOS_FAIL":
      return {
        ...state,
        removeTodosIsLoading: false,
        errorMessage: action.payload,
      };
    case "REMOVE_TODO_START":
      return {
        ...state,
        removeTodoIsLoading: true,
        errorMessage: "",
      };
    case "REMOVE_TODO_SUCCESS":
      return {
        ...state,
        todoList: state.todoList.filter(
          (item) => item._id !== action.payload._id
        ),
        removeTodoIsLoading: false,
        errorMessage: "",
      };
    case "REMOVE_TODO_FAIL":
      return {
        ...state,
        removeTodoIsLoading: false,
        errorMessage: action.payload,
      };
    case "UPDATE_TODO_START":
      return {
        ...state,
        todoList: state.todoList.map((item) =>
          item._id === action.payload ? { ...item, isLoading: true } : item
        ),
        errorMessage: "",
      };
    case "UPDATE_TODO_SUCCESS":
      return {
        ...state,
        todoList: state.todoList.map((item) =>
          item._id === action.payload._id
            ? { ...action.payload, isLoading: false }
            : item
        ),
        errorMessage: "",
      };
    case "UPDATE_TODO_FAIL":
      return {
        ...state,
        todoList: state.todoList.map((item) => {
          return { ...item, isLoading: false };
        }),
        errorMessage: action.payload,
      };
    default:
      return state;
  }
};

export default reducer;
