import { useUserStore } from "@/store/userStore";
import { useEffect, useState } from "react";

export default function UseAuth() {
  const { user, setUser } = useUserStore();
  const [isAuth, setIsAuth] = useState(false);

  const Logout = () => {
    setUser(null);
    setIsAuth(false);
  };

  useEffect(() => {
    if (user && Object.keys(user).length) {
      setIsAuth(true);
    } else setIsAuth(false);
  }, [user]);

  return { isAuth, Logout };
}
