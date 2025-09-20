import { BrowserRouter as Router,Routes,Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";

//layout
import AppLayout from "./layout/AppLayout";

//home page
import Login from "./pages/Login";

//temporary
import Dashboard from "./pages/Dashboard";
import Activities from "./pages/Activities";
import ProductionJ from "./components/Kk";
import Production from "./pages/Production";
import Sales from "./pages/Sales"

function App() {
  return (
    <AuthProvider>
      <div className="App">
        <Router>
          <Routes>
              <Route path="/" element={<Login/>}></Route>
              <Route 
                path="/dashboard" element={<AppLayout>
                <Dashboard/>
                </AppLayout>
              }>

              </Route>



              <Route
                path="/activities"
                element={
                  <AppLayout>
                    <Activities/>
                  </AppLayout>
                }>
              </Route>

              <Route
                path="/production"
                element={
                  <AppLayout>
                    <Production/>
                  </AppLayout>
                }>
              </Route>

              <Route
                path="/sales"
                element={
                  <AppLayout>
                    <Sales/>
                  </AppLayout>
                }>
              </Route>


                <Route path="/kk" element={<ProductionJ/>}>

                </Route>
          </Routes>
        </Router>
      </div>
      </AuthProvider>
  );
}

export default App;