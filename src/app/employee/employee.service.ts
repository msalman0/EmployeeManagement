import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { IEmployee } from './employee';
import { Observable, throwError } from 'rxjs';
import { catchError , tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private employeeUrl = environment.apiBaseURL;
  constructor(private http : HttpClient) { }

  getEmployee(): Observable <IEmployee[]> {
    return this.http.get<IEmployee[]>(this.employeeUrl)
                    .pipe(
                      tap(data => console.log("All received list of employees" + JSON.stringify(data)))
                      , catchError(this.handleError)
                    );

  }

  addEmployee(employee : IEmployee) : Observable <void> {
    return this.http.post<void>(`${this.employeeUrl}/add`,employee);
  }

  updateEmployee(employee : IEmployee) : Observable <void>{
    return this.http.put<void>(`${this.employeeUrl}/update`,employee);
  }

  deleteEmployee(employeeId : number) : Observable <void>{
    return this.http.delete<void>(`${this.employeeUrl}/delete/${employeeId}`);
  }

  handleError(err : HttpErrorResponse) {
    return throwError(err.message);
  }
}
