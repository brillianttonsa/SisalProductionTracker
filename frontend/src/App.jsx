import { BrowserRouter as Router,Routes,Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";

//home page
import Login from "./pages/Login";

//temporary
import Dashboard from "./pages/Dashboard";

function App() {
  return (
    <AuthProvider>
      <div className="App">
        <Router>
          <Routes>
              <Route path="/" element={<Login/>}></Route>
              <Route path="/dashboard" element={<Dashboard/>}></Route>
          </Routes>
        </Router>
      </div>
      </AuthProvider>
  );
}

export default App;