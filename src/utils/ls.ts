import SecureLS from "secure-ls";

let ls: any;
const init = () => {
  ls = new SecureLS({ encodingType: "rc4", isCompression: true });
};
if (global?.localStorage) init();

export const getStoredAuthToken = () => ls.get("classutToken");

export const getStoredRefreshToken = () => ls.get("classutRefreshToken");

//@Desc: Store access token securely
export const storeAuthToken = (token: string) => ls.set("classutToken", token);

//@Desc: Store refresh token securely
export const storeResfreshToken = (token: string) =>
  ls.set("classutRefreshToken", token);

export const getStoredClientUser = () => {
  if (typeof window !== "undefined") {
    return ls.get("classutUser");
  }
};
export const storeClientUser = (user: string) => ls.set("classutUser", user);

//@Desc: Store access token securely
export const storeLoginUrl = (url: string) => ls.set("loginurl", url);
export const getLoginUrl = () => ls.get("loginurl");

export const removeStoredAuthToken = () => {
  ls.remove("classutToken");
  ls.remove("classutUser");
  ls.remove("classutRefreshToken");
};
