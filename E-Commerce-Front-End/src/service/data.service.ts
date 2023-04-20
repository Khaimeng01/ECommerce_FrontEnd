import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {loginCustomer} from "../classes/loginCustomer";
import {AbstractControl, ValidationErrors} from "@angular/forms";

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private apiServerUrl ='http://localhost:8081/api/a1';

  constructor(private http:HttpClient) { }

  public getLoginDetails(userName:string,password:string):Observable<any>{
    let params = new HttpParams().append('customer_username',userName);
    params=params.append('customer_password',password);
    return this.http.get('http://localhost:8081/api/cs/dataman/get/userAuthentication',{params,responseType:'text'});
  }

  // public getLoginDetails2():Observable<any>{
  //   return this.http.get<any>('http://localhost:8081/api/a1/get25');
  // }

  public getSellerLoginDetails(userName:string,password:string):Observable<any>{
    let params = new HttpParams().append('seller_username',userName);
    params=params.append('seller_password',password);
    return this.http.get('http://localhost:8081/api/sell/dataman/get',{params,responseType:'text'});
  }

  public registerCustomer(editCustomerDetails:loginCustomer):Observable<any>{
    const headers = { 'content-type': 'application/json'}
    console.log(editCustomerDetails);
    const body=JSON.stringify(editCustomerDetails);
    return this.http.post('http://localhost:8081/api/cs/dataman/post',editCustomerDetails,{responseType:'text'});
  }

  public noSpaceAtStart(): ValidationErrors | null {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;
      if (value && value.length > 0 && value[0] === ' ') {
        return { spaceAtStart: true };
      }
      return null;
    };
  }
}
