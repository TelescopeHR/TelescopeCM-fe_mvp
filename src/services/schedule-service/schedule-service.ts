import { catchError, from, map, Observable } from "rxjs";
import http, { handleError } from "../http-service/httpService";

export const createVisit = (payload: any): Observable<any> => {
  return from(http.post("/employee", payload)).pipe(
    map((response: any) => response),
    catchError(handleError)
  );
};

//get all visits
export const getAllSchedule = (): Observable<any> => {
  return from(http.get("/schedule")).pipe(
    map((response: any) => response),
    catchError(handleError)
  );
};

export const updateVisit = (payload: any, id: any): Observable<any> => {
  return from(http.post(`/employee/${id}/update`, payload)).pipe(
    map((response: any) => response),
    catchError(handleError)
  );
};
