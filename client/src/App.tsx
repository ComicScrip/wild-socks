import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import BackOfficeScreen from "./screens/BackOfficeScreen";
import { HomeScreen } from "./screens/HomeScreen";
import { LoginScreen } from "./screens/LoginScreen";

function App() {
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<HomeScreen />} />
        <Route path="/login" element={<LoginScreen />} />
        <Route path="/admin" element={<BackOfficeScreen />} />
      </Routes>
    </div>
  );
}

export default App;
