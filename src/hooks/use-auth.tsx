import { useUserStore } from "@/store/userStore";
import { removeStoredAuthToken } from "@/utils/ls";
import { useEffect, useState } from "react";

export default function UseAuth() {
  const { user, setUser } = useUserStore();
  const [isAuth, setIsAuth] = useState(false);

  const Logout = () => {
    removeStoredAuthToken(); //remove token
    setUser(null); //remove user details from state
    setIsAuth(false);
  };

  useEffect(() => {
    if (user && Object.keys(user).length) {
      setIsAuth(true);
    } else setIsAuth(false);
  }, [user]);

  return { isAuth, Logout };
}
