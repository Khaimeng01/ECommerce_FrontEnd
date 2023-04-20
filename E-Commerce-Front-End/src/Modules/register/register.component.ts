import { Component, OnInit } from '@angular/core';
import {NzFormTooltipIcon} from "ng-zorro-antd/form";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {loginCustomer} from "../../classes/loginCustomer";
import {DataService} from "../../service/data.service";
import {NzMessageService} from "ng-zorro-antd/message";
import {Router} from "@angular/router";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

    validateForm!: FormGroup;


  constructor(private fb: FormBuilder,private dataService:DataService,
              private messageService: NzMessageService,private router:Router) {}

  ngOnInit(): void {
      this.validateForm = this.fb.group({
        username: [null, [Validators.required,this.dataService.noSpaceAtStart()]],
        email: [null, [Validators.email, Validators.required]],
        password: [null, [Validators.required]],
        phoneNumberPrefix: ['+60'],
        phoneNumber: [null, [
          Validators.required,
          Validators.pattern(/^\d{9}$/),
          Validators.min(1)
        ]],
        address: [null, [Validators.required,this.dataService.noSpaceAtStart()]]
        // agree: [false]
      });
    }



  submitForm(): void {
    if (this.validateForm.valid) {
      var object_name:loginCustomer={
        id_customerlogin:100,
        customer_username:this.validateForm.value.username,
        customer_password:this.validateForm.value.password,
        customer_email:this.validateForm.value.email,
        customer_address:this.validateForm.value.address,
        customer_phonenumber:this.validateForm.value.phoneNumber
      }
      console.log(object_name);
      this.dataService.registerCustomer(object_name).subscribe((response:any)=>
        {
          if(response==="Username has been used"){
            this.messageService.error('Username has been used. Try another username');
          }else if (response==="Email has been used"){
            this.messageService.error('Email has been used. Try updating password or login into your account');
          } else if(response === "Success"){
            this.router.navigate(['/login']);
          }
        }
      )

    } else {
      console.log("Failure")
      Object.values(this.validateForm.controls).forEach(control => {
        control.markAsDirty();
        control.updateValueAndValidity({ onlySelf: true });
      });
    }
  }

  redirectToRegister() {
    this.router.navigate(['sellerRegisterAccount']);
  }



}
