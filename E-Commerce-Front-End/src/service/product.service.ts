// Programmer Name 	: Mr. Lai Khai Meng , TP055753 , APU3F2209CS
// Program Name   	: E_Commerce_Front_END
// Description     	: The service for Product related function/services (To communicate with Backend or other Components)


import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {loginCustomer} from "../classes/loginCustomer";
import {ProductsDetails, ProductsDetails2} from "../classes/productsDetails";

@Injectable({
  providedIn: 'root'
})

export class ProductService {

  private apiServerUrl ='http://localhost:8081/api/a1';

  constructor(private http:HttpClient) { }

  public addProducts(product:FormData):Observable<any>{
    return this.http.post<any>('http://localhost:8081/api/products/addNewProduct',product);
  }

  public getProducts():Observable<ProductsDetails2[]>{
    return this.http.get<ProductsDetails2[]>('http://localhost:8081/api/products/getAllProducts');
  }

  public getSpecifcProduct(productId:bigint):Observable<ProductsDetails2[]>{
    let params = new HttpParams().append('id_product',productId.toString());
     return this.http.get<ProductsDetails2[]>('http://localhost:8081/api/products/getProduct',{params});
  }

  public getSpecificProductFromSeller(sellerName:string):Observable<ProductsDetails2[]>{
    let params = new HttpParams().append('product_owner',sellerName);
    return  this.http.get<ProductsDetails2[]>('http://localhost:8081/api/products/getProduct/FS',{params});
  }

  public deleteProduct(id_product:bigint):Observable<any>{
    let params = new HttpParams().append('id_product',id_product.toString());
    return  this.http.delete('http://localhost:8081/api/products/deleteProduct',{params,responseType:'text'});
  }

  public editProduct(product: FormData, id_product: bigint): Observable<any> {
    let params = new HttpParams().append('id_product', id_product.toString());
    return this.http.put('http://localhost:8081/api/products/put', product, { params, responseType: 'text' });
  }

  public filterProductTable(product_category:string,product_priceSortingType:string):Observable<ProductsDetails2[]>{
    let params = new HttpParams().append('product_category', product_category);
    params=params.append('product_priceSortingType',product_priceSortingType);
    return this.http.get<ProductsDetails2[]>('http://localhost:8081/api/products/filterProductData',{params})
  }


}
