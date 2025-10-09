import { catchError, from, map, Observable } from "rxjs";
import http, { handleError } from "../http-service/httpService";

export const createEmployee = (payload: any): Observable<any> => {
  return from(http.post("/employee", payload)).pipe(
    map((response: any) => response),
    catchError(handleError)
  );
};

//get all employee
export const getEmployees = (payload: any): Observable<any> => {
  return from(http.get("/employee", { params: { ...payload } })).pipe(
    map((response: any) => response),
    catchError(handleError)
  );
};

//get employee stats
export const getEmployeesStats = (): Observable<any> => {
  return from(http.get(`/employee/statistics`)).pipe(
    map((response: any) => response),
    catchError(handleError)
  );
};

//get single employee
export const getSingleEmployee = (id: string): Observable<any> => {
  return from(http.get(`/employee/${id}`)).pipe(
    map((response: any) => response),
    catchError(handleError)
  );
};
