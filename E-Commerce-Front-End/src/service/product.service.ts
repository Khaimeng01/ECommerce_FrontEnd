import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {loginCustomer} from "../classes/loginCustomer";
import {ProductsDetails} from "../classes/productsDetails";

@Injectable({
  providedIn: 'root'
})

export class ProductService {

  private apiServerUrl ='http://localhost:8081/api/a1';

  constructor(private http:HttpClient) { }

  public addProducts(product:FormData):Observable<any>{
    // const headers = { 'content-type': 'application/json'}
    // console.log(customerDetails);
    // const body=JSON.stringify(customerDetails);
    return this.http.post<any>('http://localhost:8081/api/products/addNewProduct',product);
  }

  public getProducts():Observable<ProductsDetails[]>{
    return this.http.get<ProductsDetails[]>('http://localhost:8081/api/products/getAllProducts');
  }

}
