import "./App.scss";
import Header from "./components/Header/Header";
import { Link } from "react-router-dom";

const App = () => {
  return (
    <div className="app-container">
      <Header></Header>
      <div>
        test link
        <div>
          <button>
            <Link to="/users">Go to User page</Link>
          </button>
          <button>
            <Link to="/admin">Go to Admin page</Link>
          </button>
        </div>
      </div>
    </div>
  );
};

export default App;
