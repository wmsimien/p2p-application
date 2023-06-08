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
  private poReqHeaderData: any = 
  {
    id:'',
    reqDate: '',
    deliveryDate: '',
     glAcctNo: '',
     status: "Open",
    paymentTerms: "COD",
     poNotes: '',
    reqNotesInternal: '',
    reqNotesExternal:'',
     shipTo: '',
     createdBy: '',
    createdDate: '',
    approvedBy: '',
    approvedDate:'',
    supplier:''
  };
  private poReqDetailData: any = {
    items:'',
  };
  
  
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
  /**
   * Method calls endpoint to obtain all pos generated from approved reqs
   * @returns 
   */
  public getAllPurchaseReqs(): Observable<any> {
    return this.http.get(`http://localhost:8080/api/purchase-orders/reqs/`);
  }
/**
 * Method calls endpoint to obtain all po reqs
 * @returns 
 */
  public getAllPOReqs(): Observable<any> {
    return this.http.get(`http://localhost:8080/api/po-req/`);
  }

  /**
   * Method calls endpoint to update poReqHeader changes.
   * @param id PoReqHeader record to update.
   * @param data POReqHeader data to update current record with.
   * @returns Updated record.
   */
  public updatePOReqById(id: number, data: any): Observable<any> {
    // set poReqHeader information
    this.poReqHeaderData.id =  data.id;
    this.poReqHeaderData.approvedBy = data.approvedBy;
    this.poReqHeaderData.approvedDate = data.approvedDate;
    this.poReqHeaderData.shipTo = data.shipTo;
    this.poReqHeaderData.createdBy = data.createdBy;
    this.poReqHeaderData.createdDate = data.createdDate;
    this.poReqHeaderData.deliveryDate = data.deliveryDate;
    this.poReqHeaderData.glAcctNo = data.glAcctNo;
    this.poReqHeaderData.paymentTerms = data.paymentTerms;
    this.poReqHeaderData.poNotes = data.poNotes;
    this.poReqHeaderData.reqDate = data.reqDate;
    this.poReqHeaderData.reqNotesExternal = data.reqNotesExternal;
    this.poReqHeaderData.reqNotesInternal = data.reqNotesInternal;
    this.poReqHeaderData.status = "Open";
    this.poReqHeaderData.deliveryDate = data.deliveryDate;
    this.poReqHeaderData.poNotes = data.poNotes;
    this.poReqHeaderData.supplier = data.supplier;
    // call endpoint for updating poReqHeader record
    return this.http.put(`http://localhost:8080/api/po-req/${id}/`, this.poReqHeaderData
    );
  }
  /**
   * Method calls endpoint to update POReqDetail record.
   * @param id POReqHeader record to use for updating.
   * @param data POReqDetail data for updating.
   * @returns Update POReqHeader record.
   */
  public updatePOReqDetail(id: number, data: any) {
    this.poReqDetailData.items = data.poReqDetailList[0].items;
    return this.http.put(`http://localhost:8080/api/po-req-detail/${id}/`, this.poReqDetailData
    );
  }
  /**
   * Method calls endpoint to create POReqHeader record.
   * @param data POReqHeader data to update with.
   * @returns Updated POReqHeader record.
   */
  public createPOReqHeader(data: any): Observable<any> {
    return this.http.post(`http://localhost:8080/api/po-req/`, data);
  }
  /**
   * Method calls endpoint to create POReqDetail record.
   * @param id Assoicated POReqHeader value.
   * @param data Data elements to update POReqDetail record with.
   * @returns Updated record.
   */
  public createPOReqDetail(id: number, data: any): Observable<any> {
    return this.http.put(`http://localhost:8080/api/po-req/${id}/`, data);
  }
}
