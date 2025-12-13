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
import { SettingsLayout } from "@/portal/settings/settings_layout";
import OnboardEmployee from "@/portal/settings/onboard-employee/page";
import EmployeeNote from "@/portal/employee/employee-note/employee-note";
import OnboardClient from "@/portal/settings/onboard-client/page";
import EmployeeScheduleVisits from "@/portal/schedules/emp-schedule-visits/emp-schedule-visits";
import Visitspage from "@/portal/visits/page";
import ScheduleModule from "@/portal/schedule-module/schedule-module";
// import CreateAccountPage from "@/create-account/create-account";
import CientUpcomingSceduleDetails from "@/portal/client/client-schedule/client-schedule-details/upcoming-details";
import ForgotPasswordPage from "@/forgot-password/forgotpassword";
import VerifyEmailPage from "@/verify-email/verifyemail";
import CreatePasswordPage from "@/create-password/create-password";
import TelescopeAccSelection from "@/create-account/telescope-acc-selection";
import WorkflowUpgrade from "@/create-account/workflow-upgrade";
import HRLogin from "@/create-account/hr-login";
import CreateAccountPage from "@/create-account/create-account";
import HRDetailsPage from "@/create-account/hr-details";
import CreateClient from "@/portal/clients/create-client/create-client";

export default function ApplicationRoutes() {
  return (
    <Routes>
      <Route path="/" element={<PublicLayout />}>
        <Route index element={<LoginPage />} />

        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/verify-email" element={<VerifyEmailPage />} />
        <Route path="/create-password" element={<CreatePasswordPage />} />
        <Route path="/account-selection" element={<TelescopeAccSelection />} />
        <Route path="/hr-login" element={<HRLogin />} />
        <Route path="/upgrade-workflow" element={<WorkflowUpgrade />} />
        <Route path="/create-account" element={<CreateAccountPage />} />
        <Route path="/hr-details" element={<HRDetailsPage />} />
        <Route path="*" element={<NotfoundPage path="/" />} />
      </Route>

      {/* private routes */}
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

        {/* ===== Client module routes =========================== */}
        <Route path="clients" element={<ClientsLayout />}>
          <Route index element={<ClientsPage />} />
          <Route path="client/:id" element={<ClientHome />} />
          <Route path="create-client" element={<CreateClient />} />
          <Route
            path="client/:id/schedule/upcoming"
            element={<CientUpcomingSceduleDetails />}
          />
        </Route>
        {/* ================================================== */}

        <Route path="schedules" element={<ScheduleModule />} />

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
