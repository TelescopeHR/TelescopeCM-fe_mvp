import { catchError, from, map, Observable } from "rxjs";
import http, { handleError } from "../http-service/httpService";

//get all employee
export const getEmployees = (): Observable<any> => {
  return from(http.get("/employee")).pipe(
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
