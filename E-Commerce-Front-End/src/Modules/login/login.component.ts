import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {DataService} from "../../service/data.service";
import {HttpErrorResponse, HttpResponse} from "@angular/common/http";
import {first} from "rxjs";
import {loginCustomer} from "../../classes/loginCustomer";

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
  switchValue = false;

  async submitForm(){
    if (this.validateForm.valid) {
      console.log('submit', this.validateForm.value);
      this.dataService.getLoginDetails(this.validateForm.value.userName,this.validateForm.value.password).subscribe(
        (response:any)=>{
          // this.a1 = response;
          this.a2=response;
          // console.log(this.a1);
          console.log(this.a2);
          if(this.a2.match("Authenticated User")) {
            console.log("Past_1");
            // return Promise.resolve(true);
          }else{
            // return Promise.resolve(false);
            // return false;
          }
        },(error:HttpErrorResponse)=>{
          alert(error.message);
          console.log(error.message);
        }
      )

      // const rankPromise = await this.getLoginDetails(this.validateForm.value.userName,this.validateForm.value.password);
      //
      // // const rank  = await rankPromise
      // if(rankPromise){
      //   console.log("Past");
      // }else{
      //   console.log("Fail");
      // }
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



  constructor(private fb: FormBuilder,private dataService:DataService) { }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      userName: [null, [Validators.required]],
      password: [null, [Validators.required]],
      remember: [true]
    });


  }

  public  getLoginDetails(username:string,password:string):boolean{
    this.dataService.getLoginDetails(username,password).subscribe(
      (response:any)=>{
       // this.a1 = response;
       this.a2=response;
       // console.log(this.a1);
        console.log(this.a2);
        if(this.a2.match("Authenticated User")) {
          console.log("Past_1");
          return Promise.resolve(true);
        }else{
          return Promise.resolve(false);
          // return false;
        }
      },(error:HttpErrorResponse)=>{
        alert(error.message);
        console.log(error.message);
      }
    )
    return false;
  }

}
