import { useEffect } from "react";
import "./App.css";
import ProtectedRoutes from "./routes/protected_routes";
import { useThemeStore } from "./store/themestore";
// import PublicRoutes from "./routes/public-routes";

function App() {
  const { theme } = useThemeStore();

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  return (
    <>
      <ProtectedRoutes />
      {/* <PublicRoutes /> */}
    </>
  );
}

export default App;
