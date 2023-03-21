import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {DataService} from "../../service/data.service";
import {HttpErrorResponse, HttpResponse} from "@angular/common/http";
import {first} from "rxjs";
import {loginCustomer} from "../../classes/loginCustomer";
import {NavigationExtras, Router} from "@angular/router";
import {NzMessageService} from "ng-zorro-antd/message";

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
  type:string = 'error';
  public navigationExtras: NavigationExtras = {
    skipLocationChange: false
  };
  options = ['Buyer', 'Selller'];



  constructor(private fb: FormBuilder,private dataService:DataService,private router:Router,private message: NzMessageService) { }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      userName: [null, [Validators.required]],
      password: [null, [Validators.required]],
      remember: [true]
    });
  }



  handleIndexChange(e: number): void {
    console.log(e);
    this.switchValue=e;
  }

  submitForm(){
    if (this.validateForm.valid) {
      console.log('submit', this.switchValue);
      if(this.switchValue==0){
        this.dataService.getLoginDetails(this.validateForm.value.userName,this.validateForm.value.password).subscribe(
          (response:any)=>{
            this.a2=response;
            if(this.a2.match("Authenticated User")) {
              console.log("Past_1");
              sessionStorage.setItem('username',this.validateForm.value.userName);
              sessionStorage.setItem('role',"Buyer");
              this.router.navigateByUrl('/homepage', { skipLocationChange: false, replaceUrl: true }).then(() => {
                window.location.reload();
              });
              return Promise.resolve(true);
            }else{
              this.message.create(this.type, `The Username / Password is Incorrect`);
              return Promise.resolve(false);
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
            if(this.a2.match("Authenticated User")) {
              sessionStorage.setItem('username',this.validateForm.value.userName);
              sessionStorage.setItem('role',"Seller");
              this.router.navigateByUrl('/sellerLayout', { skipLocationChange: false, replaceUrl: true }).then(() => {
                window.location.reload();
              });
              return Promise.resolve(true);
            }else{
              this.message.create(this.type, `The Username / Password is Incorrect`);
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

}
