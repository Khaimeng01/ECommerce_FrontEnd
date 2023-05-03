// Programmer Name 	: Mr. Lai Khai Meng , TP055753 , APU3F2209CS
// Program Name   	: E_Commerce_Front_END
// Description     	: To allow users to login into the website


import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {DataService} from "../../service/data.service";
import {HttpErrorResponse} from "@angular/common/http";
import {Router} from "@angular/router";
import {NzMessageService} from "ng-zorro-antd/message";
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public responseValue!:string;
  validateForm!: FormGroup;
  switchValue:number = 0;
  messageValue:string = 'error';
  options = ['Buyer', 'Seller'];

  constructor(private fb: FormBuilder,
              private dataService:DataService,
              private router:Router,
              private message: NzMessageService) { }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      userName: [null, [Validators.required]],
      password: [null, [Validators.required]],
    });
  }

  handleIndexChange(switchValue: number): void {
    this.switchValue=switchValue;
  }

  submitForm(){
    if (this.validateForm.valid) {
      if(this.switchValue==0){
        this.dataService.getLoginDetails(this.validateForm.value.userName,this.validateForm.value.password).subscribe(
          (response:any)=> {
            this.responseValue = response;
            if (this.responseValue.match("Authenticated User")) {
              sessionStorage.setItem('username', this.validateForm.value.userName);
              sessionStorage.setItem('role', "Buyer");
              this.router.navigateByUrl('/homepage', {skipLocationChange: false, replaceUrl: true}).then(() => {
                window.location.reload();
              });
              return Promise.resolve(true);
            }
            if (this.responseValue.match("Incorrect Password")) {
              this.message.error('The Username / Password is Incorrect');
              return Promise.resolve(true);
            }
            if (this.responseValue.match("No user is found with this Username")) {
              this.message.error('No user is found with this Username');
              return Promise.resolve(true);
            }
            return Promise.resolve(true);
          },(error:HttpErrorResponse)=>{
            alert(error.message);

          }
        )
      }else{
        this.dataService.getSellerLoginDetails(this.validateForm.value.userName,this.validateForm.value.password).subscribe(
          (response:any)=>{
            this.responseValue=response;
            if(this.responseValue.match("Authenticated User")) {
              sessionStorage.setItem('username',this.validateForm.value.userName);
              sessionStorage.setItem('role',"Seller");
              this.router.navigateByUrl('/sellerLayout', { skipLocationChange: false, replaceUrl: true }).then(() => {
                window.location.reload();
              });
              return Promise.resolve(true);
            }else{
              this.message.create(this.messageValue, `The Username / Password is Incorrect`);
              return Promise.resolve(false);
            }
          },(error:HttpErrorResponse)=>{
            alert(error.message);
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

  redirectToRegister() {
    if(this.switchValue==0){
      this.router.navigate(['register']);
    }else{
      this.router.navigate(['sellerRegisterAccount']);
    }
  }
}
