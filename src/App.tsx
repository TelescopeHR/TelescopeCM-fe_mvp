import "./App.css";
import ProtectedRoutes from "./routes/protected_routes";
// import PublicRoutes from "./routes/public-routes";

function App() {
  return (
    <>
      <ProtectedRoutes />
      {/* <PublicRoutes /> */}
    </>
  );
}

export default App;
