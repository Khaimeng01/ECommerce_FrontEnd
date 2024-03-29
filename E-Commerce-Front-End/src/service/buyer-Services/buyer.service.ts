// Programmer Name 	: Mr. Lai Khai Meng , TP055753 , APU3F2209CS
// Program Name   	: E_Commerce_Front_END
// Description     	: The service for Buyer related function/services (To communicate with Backend or other Components)



import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient, HttpParams} from "@angular/common/http";
import {loginCustomer, loginCustomer2} from "../../classes/loginCustomer";
import {customer_orderPastHistory} from "../../classes/orderDetails";

@Injectable({
  providedIn: 'root'
})
export class BuyerService {
  constructor(private http:HttpClient) { }


  public getCustomerPersonalInformation(userName:string):Observable<loginCustomer2[]>{
    let params = new HttpParams().append('customer_username',userName);
    return this.http.get<loginCustomer2[]>('http://localhost:8081/api/cs/dataman/get/FCPI',{params});
  }

  public editDetails(customerDetails:loginCustomer2,customerUsername:string):Observable<any>{
    const headers = { 'content-type': 'application/json'}
    let params = new HttpParams().append('customer_username',customerUsername);
    console.log(customerDetails);
    const body=JSON.stringify(customerDetails);
    return this.http.put('http://localhost:8081/api/cs/dataman/put',customerDetails,{params,responseType:'text'});
  }

  public getCustomerOrderPastHistory(customerUsername:string):Observable<customer_orderPastHistory[]>{
    let params = new HttpParams().append('customer_username',customerUsername);
    return this.http.get<customer_orderPastHistory[]>("http://localhost:8081/api/order/get/orderCustomerPastOrders",{params});
  }

  public getCustomerStatus(customerUsername:string):Observable<any>{
    let params = new HttpParams().append('customer_username',customerUsername);
    return this.http.get("http://localhost:8081/api/cs/dataman/findIfAccountExists",{params,responseType:'text'})
  }

  public updatePassword(customerUsername:string,customerPassword:string):Observable<any>{
    let params = new HttpParams().append('customer_username',customerUsername);
    params= params.append('customer_password',customerPassword);
    return this.http.get("http://localhost:8081/api/cs/dataman/updatePassword",{params,responseType:'text'})

  }

}
