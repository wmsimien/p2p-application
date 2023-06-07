import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiUrlsService {

  /**
   * Declare variables
   */
  private urlSubject = new Subject<any>();

  
  constructor(private http: HttpClient) {
  
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

  /**
   * Method calls API to obtain a listing of all employees.
   * @returns
   */
  public getAllEmployees(): Observable<any> {
    return this.http.get(`http://localhost:8080/api/employees/`);

  }
  /**
   * Method calls API to created a new employee record.
   * @param data Employee data to create new employee record.
   * @returns Created employee record.
   */
  public createEmployee(data: any): Observable<any> {
    return this.http.post(`http://localhost:8080/api/employees/`, data);
  }
  /**
   * Method calls API to update a specific employee.
   * @param id Employee id to update.
   * @param data Employee data to update specific employee record.
   * @returns Updated employee record.
   */
  public updateEmployeeById(id: number, data: any): Observable<any> {
    return this.http.put(`http://localhost:8080/api/employees/${id}/`, data);
  }

  /**
   * Method calls API to obtain a listing of item favorites.
   * @returns Listing of item favorites
   */
  public getAllItemFavs(): Observable<any> {
    return this.http.get(`http://localhost:8080/api/items/`);
  }
  /**
   * Method calls
   * @param data Item favorite data elements to create new item favorite record.
   * @returns 
   */
  public createItemFavs(data: any): Observable<any> {
    return this.http.post(`http://localhost:8080/api/items/`, data);
  }
  /**
   * Method calls API to update a specific item favorite.
   * @param id Item favorite id to update.
   * @param data Item favorite data elements for updating specific item favorite.
   * @returns Updated item favorite record.
   */
  public updateItemFavId(id: number, data: any): Observable<any> {
    return this.http.put(`http://localhost:8080/api/items/${id}/`, data);
  }
  /**
   * Method calls API to delete specified item favorite.
   * @param id Item favorite id to delete/remove.
   * @returns Item favorite was deleted.
   */
  public deleteItemFavId(id: number): Observable<any> {
    return this.http.delete(`http://localhost:8080/api/items/${id}/`);
  }

  /**
   * Metho calls API to obtain listing of all suppliers.
   * @returns List of supplier records.
   */
  public getAllSuppliers(): Observable<any> {
    return this.http.get(`http://localhost:8080/api/suppliers/`);
  }
  /**
   * Method calls API to update to create a new supplier record.
   * @param data Supplier Data elements for update.
   * @returns New supplier record.
   */
  public createSupplier(data: any): Observable<any> {
    return this.http.post(`http://localhost:8080/api/suppliers/`, data);
  }
  /**
   * Method calls API to update a specific supplier with specified data elements.
   * @param id Supplier id to update.
   * @param data Supplier data elements to update.
   * @returns Update supplier record.
   */
  public updateSupplierId(id: number, data: any): Observable<any> {
    return this.http.put(`http://localhost:8080/api/suppliers/${id}/`, data);
  }
  /**
   * Method calls API to delete specified supplier record.
   * @param id Supplier id to delete/remove.
   * @returns Supplier record that was deleted.
   */
  public deleteSupplierId(id: number): Observable<any> {
    return this.http.delete(`http://localhost:8080/api/suppliers/${id}/`);
  }

  public getAllPurchaseReqs(): Observable<any> {
    return this.http.get(`http://localhost:8080/api/purchase-orders/reqs/`);
  }

  public getAllPOReqs(): Observable<any> {
    return this.http.get(`http://localhost:8080/api/po-req/`);
  }

  public updatePOReqById(id: number, data: any): Observable<any> {
    return this.http.get(`http://localhost:8080/api/po-req/${id}/`);
  }

  public createPOReqHeader(data: any): Observable<any> {
    return this.http.post(`http://localhost:8080/api/po-req/`, data);
  }
  public createPOReqDetail(id: number, data: any): Observable<any> {
    return this.http.put(`http://localhost:8080/api/po-req/${id}/`, data);
  }
}
