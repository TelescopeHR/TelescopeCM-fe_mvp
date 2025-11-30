import SecureLS from "secure-ls";
const ls = new SecureLS({ encodingType: "rc4", isCompression: true });

export const storeUserDetails = (userpwd: any) =>
  ls.set("telescopeUserPWD", userpwd);
export const getUserDetails = () => ls.get("telescopeUserPWD");
export const removeUserDetails = () => {
  ls.remove("telescopeUserPWD");
};
export const getStoredAuthToken = () => ls.get("teleScopeAuthToken");

export const storeAuthToken = (token: string) =>
  ls.set("teleScopeAuthToken", token);

export const removeStoredAuthToken = () => {
  ls.remove("teleScopeAuthToken");
};
export const removePersistStore = () => {
  ls.remove("persist:root");
};

export const getIntendedRoute = () => ls.get("mvIntendedRoute");
export const storeIntendedRoute = (path: string) =>
  ls.set("mvIntendedRoute", path);

export const removeIntendedRoute = () => {
  ls.remove("mvIntendedRoute");
};
