import "./App.css";
import MainNavbar from "./components/Navigation/MainNavbar/MainNavbar";
import TodoList from "./components/Todo/TodoList/TodoList";

const App = () => {
  return (
    <div>
      <MainNavbar />
      <TodoList />
    </div>
  );
};

export default App;
