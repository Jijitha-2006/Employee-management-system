import { Provider } from "react-redux";
import { HashRouter, Routes, Route, Navigate } from "react-router-dom";
import { store } from "./store";
import { ThemeProvider } from "./Context/ThemeContext";

import EmployeeList from "./pages/EmployeeList";
import EmployeeDetails from "./pages/EmployeeDetails";

import "./App.css";
import Login from "./pages/Login";
import ProtectedRoute from "./routes/ProtectedRoute";
import { useState } from "react";

function App() {
  const [data, setData] = useState(false);
  console.log("app render")
  // useEffect(() => {

  // }, [])
  return (
    <Provider store={store}>
      <ThemeProvider>
        <HashRouter>
          <Routes>
            <Route
              path="/"
              element={
                sessionStorage.getItem("isLoggedIn") !== "true" ? (
                  <Login />
                ) : (
                  <Navigate to="/employees" replace />
                )
              }
            />

            <Route element={<ProtectedRoute />}>
              <Route path="/employees" element={<EmployeeList setData={setData} />} />
              <Route path="/employees/:id" element={<EmployeeDetails setData={setData} />} />
            </Route>

            {/* Optional: redirect unknown routes */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </HashRouter>
      </ThemeProvider>
    </Provider>
  );
}

export default App;