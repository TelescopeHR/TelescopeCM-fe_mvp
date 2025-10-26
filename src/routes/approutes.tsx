import { Route, Routes } from "react-router";
import DashboardPage from "../portal/dashboard/dashboard_page";
import PortalLayout from "../portal/portal_layout/portal_layout";
import NotfoundPage from "../notound/notfound";
import PublicLayout from "@/public_layout/public_layout";
import LoginPage from "@/login/login_page";
import { FinancePage } from "@/portal/payments/page";
import { EmployeePage } from "@/portal/employees/page";
import { ClientsPage } from "@/portal/clients/page";
import { ClientsLayout } from "@/portal/clients/client-layout";
import { EmployeeLayout } from "@/portal/employees/employee-layout";
import EmployeeHome from "@/portal/employee/page";
import ClientHome from "@/portal/client/page";
import EmployeeSchedule from "@/portal/schedules/employee-schedule/employee-schedule";
import ClientSchedule from "@/portal/schedules/client-schedule/client-schedule";
import CarePlans from "@/portal/care_plan/page";
import { SettingsLayout } from "@/portal/settings/settings_layout";
import OnboardEmployee from "@/portal/settings/onboard-employee/page";
import EmployeeNote from "@/portal/employee/employee-note/employee-note";
import OnboardClient from "@/portal/settings/onboard-client/page";
import EmployeeScheduleVisits from "@/portal/schedules/emp-schedule-visits/emp-schedule-visits";
import Visitspage from "@/portal/visits/page";
import ClientAdminNotes from "@/portal/client/client-admin-notes/client-admin-notes";

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
          <Route path="employee/:id" element={<EmployeeHome />} />
          <Route path="notes/:employeeId" element={<EmployeeNote />} />
          <Route path="schedule/:employeeId" element={<EmployeeSchedule />} />
          <Route
            path="schedule/visits/:scheduleId"
            element={<EmployeeScheduleVisits />}
          />
        </Route>

        <Route path="clients" element={<ClientsLayout />}>
          <Route index element={<ClientsPage />} />
          <Route path="client/:id" element={<ClientHome />} />
          <Route path="notes/:id" element={<ClientAdminNotes />} />
          <Route path="careplans/:clientId" element={<CarePlans />} />
          <Route path="schedule/:clientId" element={<ClientSchedule />} />
        </Route>
        <Route path="visits" element={<Visitspage />} />
        <Route path="settings" element={<SettingsLayout />}>
          <Route index element={<EmployeePage />} />
          <Route path="onboard/employee" element={<OnboardEmployee />} />
          <Route path="onboard/client" element={<OnboardClient />} />
        </Route>
        <Route path="finance" element={<FinancePage />} />
        <Route path="*" element={<NotfoundPage path="/dashboard" />} />
      </Route>
    </Routes>
  );
}
