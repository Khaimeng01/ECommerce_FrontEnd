import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {DataService} from "../../service/data.service";
import {HttpErrorResponse, HttpResponse} from "@angular/common/http";
import {first} from "rxjs";
import {loginCustomer} from "../../classes/loginCustomer";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  // public a1!:any;
  public a2!:string;
  private isPresent!:boolean;
  validateForm!: FormGroup;
  switchValue:number = 0;

  submitForm(){
    if (this.validateForm.valid) {
      console.log('submit', this.validateForm.value);
      if(this.switchValue==0){
        this.dataService.getLoginDetails(this.validateForm.value.userName,this.validateForm.value.password).subscribe(
          (response:any)=>{
            this.a2=response;
            if(this.a2.match("Authenticated User")) {
              console.log("Past_1");
              sessionStorage.setItem('username',this.validateForm.value.userName);
              sessionStorage.setItem('role',"Buyer");
              this.router.navigate(['/homepage'])
            }else{
              // return Promise.resolve(false);
              // return false;
            }
          },(error:HttpErrorResponse)=>{
            alert(error.message);
            console.log(error.message);
          }
        )
      }else{
        this.dataService.getSellerLoginDetails(this.validateForm.value.userName,this.validateForm.value.password).subscribe(
          (response:any)=>{
            this.a2=response;
            console.log(this.a2);
            if(this.a2.match("Authenticated User")) {
              console.log("Past_1");
              sessionStorage.setItem('username',this.validateForm.value.userName);
              sessionStorage.setItem('role',"Seller");
              this.router.navigate(['/productProfilePage'])
              return Promise.resolve(true);
            }else{
              return Promise.resolve(false);
            }
          },(error:HttpErrorResponse)=>{
            alert(error.message);
            console.log(error.message);
          }
        )
      }

    } else {
      Object.values(this.validateForm.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
    return true;
  }

  constructor(private fb: FormBuilder,private dataService:DataService,private router:Router) { }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      userName: [null, [Validators.required]],
      password: [null, [Validators.required]],
      remember: [true]
    });


  }

  // public  getLoginDetails(username:string,password:string):boolean{
  //
  //   if(this.switchValue=0){
  //     this.dataService.getLoginDetails(username,password).subscribe(
  //       (response:any)=>{
  //         this.a2=response;
  //         console.log(this.a2);
  //         if(this.a2.match("Authenticated User")) {
  //           console.log("Past_1");
  //           sessionStorage.setItem('username',username);
  //           sessionStorage.setItem('role',"Buyer");
  //           this.router.navigate(['/productProfilePage'])
  //           return Promise.resolve(true);
  //         }else{
  //           return Promise.resolve(false);
  //         }
  //       },(error:HttpErrorResponse)=>{
  //         alert(error.message);
  //         console.log(error.message);
  //       }
  //     )
  //   }else{
  //     this.dataService.getSellerLoginDetails(username, password).subscribe(
  //       (response:any)=>{
  //         this.a2=response;
  //         console.log(this.a2);
  //         if(this.a2.match("Authenticated User")) {
  //           console.log("Past_1");
  //           sessionStorage.setItem('username',username);
  //           sessionStorage.setItem('role',"Seller");
  //           this.router.navigate(['/productProfilePage'])
  //           return Promise.resolve(true);
  //         }else{
  //           return Promise.resolve(false);
  //         }
  //       },(error:HttpErrorResponse)=>{
  //         alert(error.message);
  //         console.log(error.message);
  //       }
  //     )
  //   }
  //   return false;
  // }

  options = ['Buyer', 'Selller'];
  handleIndexChange(e: number): void {
    console.log(e);
    this.switchValue=e;
  }

}
