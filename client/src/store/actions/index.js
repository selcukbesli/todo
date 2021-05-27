import Axios from "../../Axios";
import { tokenConfig } from "./auth";

// FETCH DATA FROM SERVER
export const fetchTodoListStart = () => {
  return {
    type: "FETCH_TODO_START",
  };
};

export const fetchTodoList = (params) => (dispatch, getState) => {
  dispatch(fetchTodoListStart());
  Axios.get(`/todos/${params.id}`, tokenConfig(getState))
    .then((response) => {
      dispatch({ type: "FETCH_TODO_SUCCESS", payload: response.data });
    })
    .catch((error) => {
      dispatch({ type: "FETCH_TODO_FAIL", payload: error.message });
    });
};

// TOGGLE COMPLETED A TODO
export const toggleCompletedStart = (id) => {
  return {
    type: "TOGGLE_COMPLETED_START",
    payload: id,
  };
};

export const toggleCompleted =
  (id, completed, params) => (dispatch, getState) => {
    dispatch(toggleCompletedStart(id));
    Axios.put(
      `/todos/${params.id}/${id}`,
      {
        completed: !completed,
      },
      tokenConfig(getState)
    )
      .then((response) => {
        dispatch({ type: "TOGGLE_COMPLETED_SUCCESS", payload: response.data });
      })
      .catch((error) => {
        dispatch({ type: "TOGGLE_COMPLETED_FAIL", payload: error.message });
      });
  };
// POST DATA TO SERVER
export const postTodoStart = () => {
  return {
    type: "POST_TODO_START",
  };
};

export const postTodo = (text) => (dispatch, getState) => {
  dispatch(postTodoStart());
  Axios.post(
    "/todos",
    {
      name: text,
      creator: getState().auth.user.id || getState().auth.user._id,
    },
    tokenConfig(getState)
  )
    .then((response) => {
      dispatch({ type: "POST_TODO_SUCCESS", payload: response.data });
    })
    .catch((error) => {
      dispatch({ type: "POST_TODO_FAIL", payload: error.message });
    });
};
// REMOVE COMPLETED TODOS FROM SERVER
export const removeTodosStart = () => {
  return {
    type: "REMOVE_TODOS_START",
  };
};

export const removeTodos = () => (dispatch, getState) => {
  dispatch(removeTodosStart());
  Axios.delete(
    `/todos/:userId/:todoId/deleteCompleted`,
    tokenConfig(getState),
    {
      completed: true,
    }
  )
    .then((response) => {
      dispatch({ type: "REMOVE_TODOS_SUCCESS", payload: response.data });
    })
    .catch((error) => {
      dispatch({ type: "REMOVE_TODOS_FAIL", payload: error.message });
    });
};
// REMOVE A TODO WITH SELECTED ID FROM SERVER
export const removeTodoStart = () => {
  return {
    type: "REMOVE_TODO_START",
  };
};

export const removeTodo = (id, params) => (dispatch, getState) => {
  dispatch(removeTodoStart());
  Axios.delete(`/todos/${params.id}/${id}`, tokenConfig(getState))
    .then((response) => {
      dispatch({ type: "REMOVE_TODO_SUCCESS", payload: response.data });
    })
    .catch((error) => {
      dispatch({ type: "REMOVE_TODO_FAIL", payload: error.message });
    });
};
// UPDATE A TODO WITH SELECTED ID FROM SERVER
export const updateTodoStart = (id) => {
  console.log(id);
  return {
    type: "UPDATE_TODO_START",
    payload: id,
  };
};

export const updateTodo = (id, text, params) => (dispatch, getState) => {
  dispatch(updateTodoStart(id));
  Axios.put(`/todos/${params.id}/${id}`, { name: text }, tokenConfig(getState))
    .then((response) => {
      dispatch({ type: "UPDATE_TODO_SUCCESS", payload: response.data });
    })
    .catch((error) => {
      dispatch({ type: "UPDATE_TODO_FAIL", payload: error.message });
    });
};
