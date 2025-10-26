import { catchError, from, map, Observable } from "rxjs";
import http, { handleError } from "../http-service/httpService";

export const createAdminNote = (payload: any): Observable<any> => {
  return from(http.post("note/admin", payload)).pipe(
    map((response: any) => response),
    catchError(handleError)
  );
};

//delete note
export const deleteNote = (note_id: any): Observable<any> => {
  return from(http.post(`/note/admin/delete/${note_id}`)).pipe(
    map((response: any) => response),
    catchError(handleError)
  );
};

export const updateNote = (payload: any, note_id: any): Observable<any> => {
  return from(http.post(`note/admin/update/${note_id}`, payload)).pipe(
    map((response: any) => response),
    catchError(handleError)
  );
};

//get all admin notes
export const getAdminNotes = (
  payload: any,
  userId: string
): Observable<any> => {
  return from(
    http.get(`/note/admin/${userId}`, { params: { ...payload } })
  ).pipe(
    map((response: any) => response),
    catchError(handleError)
  );
};
