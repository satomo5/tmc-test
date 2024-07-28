import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./components/pages/Login";
import Todos from "./components/pages/Todos";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import Dashboard from "./components/templates/Dashboard";

function App() {
  return (
    <LocalizationProvider dateAdapter={AdapterMoment}>
      <Router>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
        </Routes>
      </Router>
    </LocalizationProvider>
  );
}

function LoginPage() {
  return <Login />;
}

function DashboardPage() {
  return (
    <Dashboard>
      <Todos />
    </Dashboard>
  );
}

export default App;
