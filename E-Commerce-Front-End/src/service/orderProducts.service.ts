import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {loginCustomer} from "../classes/loginCustomer";
import {ProductsDetails, ProductsDetails2} from "../classes/productsDetails";
import {orderDetails, orderDetailsToAPI} from "../classes/orderDetails";

// interface orderAmount {
//   productName: string;
//   quantity: number;
//   total: number;
// }

@Injectable({
  providedIn: 'root'
})

export class OrderProductsService {
  private apiServerUrl ='http://localhost:8081/api/order';

  constructor(private http:HttpClient) { }
  orderDetails!:orderDetails;

  sendOrderDetails(orderDetails:orderDetails){
    this.orderDetails = orderDetails;
  }

  public getOrderBuyerDetails(customer_username:string):Observable<any>{
    let params = new HttpParams().append('customer_username',customer_username);
    return this.http.get<any>('http://localhost:8081/api/order/getBuyer',{params});
  }

  public registerCustomerOrder(orderDetails:orderDetailsToAPI):Observable<any>{
    const body=JSON.stringify(orderDetails);
    return this.http.post('http://localhost:8081/api/order/post',orderDetails);
  }



}
