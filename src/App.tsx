import { useEffect } from "react";
import "./App.css";
import { useThemeStore } from "./store/themestore";
// import UseAuth from "./hooks/use-auth";
// import ProtectedRoutes from "./routes/protected_routes";
import ApplicationRoutes from "./routes/approutes";

function App() {
  // const { isAuth } = UseAuth();
  const { theme } = useThemeStore();

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  return <ApplicationRoutes />;
}

export default App;
