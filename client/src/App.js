// ract-tostify
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Components and CSS
import './App.css';
import IndexRouter from './router/IndexRouter';

function App() {
  return (
    <div className="App">
      <IndexRouter />
      <ToastContainer />
    </div>
  );
}

export default App;
