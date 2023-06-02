import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiUrlsService {

  private empUrl: string;
  
  constructor(private http: HttpClient) {
    this.empUrl = 'http://localhost:8080/api/employees/';
  }

  public findAllEmployees(): Observable<any> {
    return this.http.get(this.empUrl);

  }
}
