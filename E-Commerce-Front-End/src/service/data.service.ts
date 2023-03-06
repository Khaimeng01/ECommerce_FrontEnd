import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {loginCustomer} from "../classes/loginCustomer";

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private apiServerUrl ='http://localhost:8081/api/a1';

  constructor(private http:HttpClient) { }

  public getLoginDetails(userName:string,password:string):Observable<any>{
    let params = new HttpParams().append('customer_username',userName);
    params=params.append('customer_password',password);
    return this.http.get('http://localhost:8081/api/cs/dataman/get25',{params,responseType:'text'});
  }

  public getLoginDetails2():Observable<any>{
    return this.http.get<any>('http://localhost:8081/api/a1/get25');
  }

  public getSellerLoginDetails(userName:string,password:string):Observable<any>{
    let params = new HttpParams().append('seller_username',userName);
    params=params.append('seller_password"',password);
    return this.http.get('http://localhost:8081/api/cs/dataman/get25',{params,responseType:'text'});
  }

  public registerCustomer(customerDetails:loginCustomer):Observable<any>{
    const headers = { 'content-type': 'application/json'}
    console.log(customerDetails);
    const body=JSON.stringify(customerDetails);
    return this.http.post('http://localhost:8081/api/cs/dataman/post',customerDetails);
  }
}
