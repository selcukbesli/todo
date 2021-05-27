import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./App.css";
import Auth from "./components/auth/Auth";
import MainNavbar from "./components/Navigation/MainNavbar/MainNavbar";
import TodoList from "./components/Todo/TodoList/TodoList";
import { loadUser } from "./store/actions/auth";
import { Switch, Route, Redirect } from "react-router-dom";

const App = () => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadUser());
  }, [dispatch]);

  let routes;

  if (isAuthenticated) {
    routes = (
      <Switch>
        <Route path="/todos/:id" component={TodoList} />
        <Redirect to={`/todos/${localStorage.getItem("userId")}`} />
      </Switch>
    );
  }

  if (isAuthenticated === false) {
    routes = (
      <Switch>
        <Route path="/" exact component={Auth} />
        <Redirect to="/" />
      </Switch>
    );
  }

  return (
    <div>
      <MainNavbar />
      {routes}
    </div>
  );
};

export default App;
