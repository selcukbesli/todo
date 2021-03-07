import { useEffect } from "react";
import { useDispatch } from "react-redux";
import "./App.css";
import Auth from "./components/auth/Auth";
import MainNavbar from "./components/Navigation/MainNavbar/MainNavbar";
import TodoList from "./components/Todo/TodoList/TodoList";
import { loadUser } from "./store/actions/auth";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadUser());
  }, [dispatch]);

  return (
    <Router>
      <div>
        <MainNavbar />
        <Switch>
          <Route path="/" exact component={Auth} />
          <Route path="/todos" component={TodoList} />
        </Switch>
      </div>
    </Router>
  );
};

export default App;
