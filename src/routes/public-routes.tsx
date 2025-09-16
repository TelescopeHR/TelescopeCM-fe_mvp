import { Route, Routes } from "react-router";
import LoginPage from "../login/login_page";
import PublicLayout from "../public_layout/public_layout";
import NotfoundPage from "@/notound/notfound";

export default function PublicRoutes() {
  return (
    <Routes>
      <Route path="/" element={<PublicLayout />}>
        <Route index element={<LoginPage />} />
        <Route path="*" element={<NotfoundPage path="/" />} />
      </Route>
    </Routes>
  );
}
