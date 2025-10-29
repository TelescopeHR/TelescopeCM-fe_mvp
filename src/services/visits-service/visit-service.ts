import { catchError, from, map, Observable } from "rxjs";
import http, { handleError } from "../http-service/httpService";

export const createVisit = (payload: any): Observable<any> => {
  return from(http.post("/visit", payload)).pipe(
    map((response: any) => response),
    catchError(handleError)
  );
};

export const updateVisit = (payload: any, visitId: string): Observable<any> => {
  return from(http.post(`/visit/update/${visitId}`, payload)).pipe(
    map((response: any) => response),
    catchError(handleError)
  );
};

export const deleteVisit = (visitId: string): Observable<any> => {
  return from(http.post(`/visit/delete/${visitId}`)).pipe(
    map((response: any) => response),
    catchError(handleError)
  );
};

//get all visits
export const getAllVisits = (payload: any): Observable<any> => {
  return from(http.get("/visit", { params: { ...payload } })).pipe(
    map((response: any) => response),
    catchError(handleError)
  );
};
