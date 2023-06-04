import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiUrlsService {

  /**
   * Private variables declared
   */
  private empUrl: string;
  private urlSubject = new Subject<any>();

  
  constructor(private http: HttpClient) {
    this.empUrl = `http://localhost:8080/api/employees/`;
  }

  /**
   * Method sends the active url
   * @param url Active url
   */
  sendActiveUrl(url: string) {
    this.urlSubject.next(url);
  }

  /**
   * Method obtains the active url
   * @param url Active url
   */
  getActiveUrl(): Observable<string> {
    return this.urlSubject.asObservable();
  }

  // Employees
  public getAllEmployees(): Observable<any> {
    return this.http.get(this.empUrl);

  }

  public createEmployee(data: any): Observable<any> {
    return this.http.post(this.empUrl, data);
  }

  public updateEmployeeById(id: number, data: any): Observable<any> {
    return this.http.put(`http://localhost:8080/api/employees/${id}/`, data);
  }

  // Item Favs
  public getAllFavItems(): Observable<any> {
    return this.http.get(`http://localhost:8080/api/items/`);
  }

}
