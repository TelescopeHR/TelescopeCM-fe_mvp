import axios, { AxiosError } from "axios";
import { toast } from "react-toastify";
import { useUserStore } from "../../store/userStore"; //state

import { throwError } from "rxjs";
import { base_url } from "@/utils/enviroment";
import { getStoredAuthToken } from "@/utils/ls";

const http = axios.create({
  baseURL: base_url,
  maxContentLength: 10 * 1024 * 1024, // 10 MB response limit
  maxBodyLength: 10 * 1024 * 1024,
});

http.interceptors.request.use(
  async (request: any) => {
    request.headers = {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: (await getStoredAuthToken())
        ? `Bearer ${await getStoredAuthToken()}`
        : "",
    };
    return request;
  },
  (error) => {
    return Promise.reject(error);
  }
);

http.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    return Promise.reject(error);
  }
);

//Promised-based Error handler
export const handleAxiosError = (error: AxiosError) => {
  const axiosError = error as AxiosError<any>;
  return axiosError.response?.data?.error;
};
//Observable Error handler
export const handleError = (errorResponse: any) => {
  if (errorResponse?.response?.status === 401) {
    toast.error(
      errorResponse?.response?.data?.message
        ? errorResponse?.response?.data?.message
        : errorResponse?.response?.data?.error
    );

    useUserStore.getState().setUser(null); // set state
    localStorage.clear();
    window.location.href = "/";
  }

  if (errorResponse?.response?.status === 403) {
    toast.error(
      errorResponse?.response?.data?.message
        ? errorResponse?.response?.data?.message
        : errorResponse?.response?.data?.error
    );
  }

  if (errorResponse?.response?.status === 422) {
    toast.error(
      errorResponse?.response?.data?.message
        ? errorResponse?.response?.data?.message
        : errorResponse?.response?.data?.error
    );
  }

  const unExpectedError = errorResponse?.response?.status >= 500;
  if (unExpectedError) {
    toast.error("An unexpected error occured.");
  }

  // toast.error(errorResponse?.response.data.message);
  if (errorResponse.message === "Network Error") {
    toast.error(errorResponse.message);
  }

  return throwError(() => errorResponse);
};
export default http;
