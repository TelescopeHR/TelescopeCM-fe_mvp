import { NavLink } from "react-router";
export default function NotfoundPage() {
  return (
    <div className="flex flex-col items-center justify-center h-[90vh] text-center">
      <h1 className="text-6xl lg:text-[10rem] font-bold text-slate-300">404</h1>
      <p className="text-lg text-gray-600">Page not found</p>
      <NavLink to="/dashboard" className="mt-4 text-blue-500">
        Go back to Dashboard
      </NavLink>
    </div>
  );
}
