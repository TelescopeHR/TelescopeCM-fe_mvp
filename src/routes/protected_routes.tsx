import { Route, Routes } from "react-router";
import DashboardPage from "../portal/dashboard/dashboard_page";
import SettingsPage from "../portal/settings/settings_page";
import PortalLayout from "../portal/portal_layout/portal_layout";
import NotfoundPage from "../notound/notfound";

export default function ProtectedRoutes() {
  return (
    <Routes>
      <Route path="dashboard" element={<PortalLayout />}>
        {/* Default child (shown when visiting /dashboard) */}
        <Route index element={<DashboardPage />} />

        {/* Child route (shown when visiting /dashboard/settings) */}
        <Route path="settings" element={<SettingsPage />} />
        <Route path="*" element={<NotfoundPage />} />
      </Route>
    </Routes>
  );
}
