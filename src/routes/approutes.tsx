import { Route, Routes } from "react-router";
import DashboardPage from "../portal/dashboard/dashboard_page";
import SettingsPage from "../portal/settings/settings_page";
import PortalLayout from "../portal/portal_layout/portal_layout";
import NotfoundPage from "../notound/notfound";
import PublicLayout from "@/public_layout/public_layout";
import LoginPage from "@/login/login_page";
import { FinancePage } from "@/portal/payments/page";
import { EmployeePage } from "@/portal/employees/page";
import { ClientsPage } from "@/portal/clients/page";
import { ClientsLayout } from "@/portal/clients/client-layout";
import { EmployeeLayout } from "@/portal/employees/employee-layout";

export default function ApplicationRoutes() {
  return (
    <Routes>
      <Route path="/" element={<PublicLayout />}>
        <Route index element={<LoginPage />} />
        <Route path="*" element={<NotfoundPage path="/" />} />
      </Route>
      <Route path="dashboard" element={<PortalLayout />}>
        <Route index element={<DashboardPage />} />
        <Route path="employees" element={<EmployeeLayout />}>
          <Route index element={<EmployeePage />} />
          <Route path="employee/:id" element={<div>Employee page</div>} />
        </Route>

        <Route path="clients" element={<ClientsLayout />}>
          <Route index element={<ClientsPage />} />
          <Route path="client/:id" element={<div>Client page</div>} />
        </Route>
        <Route path="settings" element={<SettingsPage />} />
        <Route path="finance" element={<FinancePage />} />
        <Route path="*" element={<NotfoundPage path="/dashboard" />} />
      </Route>
    </Routes>
  );
}
