import './App.css';
import {Route, Routes} from "react-router-dom";
import {TodosPage} from "./pages/TodosPage";
import {HomePage} from "./pages/HomePage";
import {Navigation} from "./components/Navigation";

function App() {
  return (
      <>
        <Navigation/>
        <div className="App">
            <Routes>
              <Route path="/" element={ <HomePage /> } />
              <Route path="/todos" element={ <TodosPage /> } />
            </Routes>
        </div>
      </>
  );
}

export default App;
