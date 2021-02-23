import "./App.css";
import MainNavbar from "./components/MainNavbar/MainNavbar";
import TodoList from "./components/TodoList/TodoList";

const App = () => {
  return (
    <div>
      <MainNavbar />
      <TodoList />
    </div>
  );
};

export default App;
