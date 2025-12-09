import { catchError, from, map, Observable } from "rxjs";
import http, { handleError } from "../http-service/httpService";
import { ILoginModel } from "@/models/model";

export const loginService = (payload: ILoginModel): Observable<any> => {
  return from(http.post("/admin/api/v1/login", payload)).pipe(
    map((response: any) => response),
    catchError(handleError)
  );
};

export const sendOTPService = (payload: any): Observable<any> => {
  return from(http.post("/admin/api/v1/otp/send", payload)).pipe(
    map((response: any) => response),
    catchError(handleError)
  );
};
