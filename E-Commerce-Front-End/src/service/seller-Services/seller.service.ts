import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {loginCustomer, loginCustomer2} from "../../classes/loginCustomer";
import {editSellerInfo, manageSellerInfo, seller} from "../../classes/sellerClasses";
import {customer_orderPastHistory, seller_orderHistory} from "../../classes/orderDetails";

@Injectable({
  providedIn: 'root'
})
export class SellerService {

  private apiServerUrl ='http://localhost:8081/api/sell/dataman';

  constructor(private http:HttpClient) { }

  public registerSeller(manageSellerInfo:manageSellerInfo):Observable<any>{
    return this.http.post(this.apiServerUrl+"/post",manageSellerInfo);
  }

  public getSellerPersonalInformation(sellerUserName:string):Observable<seller[]>{
    let params = new HttpParams().append('seller_username',sellerUserName);
    return this.http.get<seller[]>(this.apiServerUrl+'/get/FSPI',{params});
  }

  public editSellerPersonalInformation(editSellerInfo:editSellerInfo,sellerUsername:string):Observable<any>{
    let params = new HttpParams().append('seller_username',sellerUsername);
    const body=JSON.stringify(editSellerInfo);
    return this.http.put(this.apiServerUrl+"/put",editSellerInfo,{params,responseType:'text'});
  }


  public getSellerOrderHistory(sellerUsername:string):Observable<seller_orderHistory[]>{
    let params = new HttpParams().append('seller_username',sellerUsername);
    return this.http.get<seller_orderHistory[]>("http://localhost:8081/api/order/get/orderSellerOrders",{params});
  }



}