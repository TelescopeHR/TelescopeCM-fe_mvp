import { catchError, from, map, Observable } from "rxjs";
import http, { handleError } from "../http-service/httpService";

export const createEmployee = (payload: any): Observable<any> => {
  return from(http.post("/employee", payload)).pipe(
    map((response: any) => response),
    catchError(handleError)
  );
};

export const updateEmployee = (payload: any, id: any): Observable<any> => {
  return from(http.post(`/employee/${id}/update`, payload)).pipe(
    map((response: any) => response),
    catchError(handleError)
  );
};

export const updateEmployeePhones = (
  payload: any,
  id: any
): Observable<any> => {
  return from(http.post(`/phone-number/${id}/update`, payload)).pipe(
    map((response: any) => response),
    catchError(handleError)
  );
};

//get employee data
export const getEmployee = (id: any): Observable<any> => {
  return from(http.get(`/employee/${id}`)).pipe(
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

//get all clients
export const getClients = (): Observable<any> => {
  return from(http.get("/client?select=true")).pipe(
    map((response: any) => response),
    catchError(handleError)
  );
};

//create schedule
export const createSchedule = (payload: any): Observable<any> => {
  return from(http.post("/employee/schedule", payload)).pipe(
    map((response: any) => response),
    catchError(handleError)
  );
};

//get all schedules
export const getSchedules = (payload: any, id: string): Observable<any> => {
  return from(
    http.get(`employee/schedule/${id}`, {
      params: { ...payload },
    })
  ).pipe(
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

export const deleteEmployee = (id: string): Observable<any> => {
  return from(http.post(`/employee/${id}/delete`)).pipe(
    map((response: any) => response),
    catchError(handleError)
  );
};
