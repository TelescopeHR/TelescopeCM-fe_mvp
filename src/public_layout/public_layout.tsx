// import UseAuth from "@/hooks/use-auth";
import { useUserStore } from "@/store/userStore";
import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router";

export default function PublicLayout() {
  const { user } = useUserStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (user && Object.keys(user).length) {
      navigate("/dashboard");
    }
  }, [user, navigate]);

  return (
    <div>
      <Outlet />
    </div>
  );
}
