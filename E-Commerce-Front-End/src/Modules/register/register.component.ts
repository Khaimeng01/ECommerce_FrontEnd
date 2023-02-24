import { Component, OnInit } from '@angular/core';
import {NzFormTooltipIcon} from "ng-zorro-antd/form";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {loginCustomer} from "../../classes/loginCustomer";
import {DataService} from "../../service/data.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  validateForm!: FormGroup;
  captchaTooltipIcon: NzFormTooltipIcon = {
    type: 'info-circle',
    theme: 'twotone'
  };

  submitForm(): void {
    if (this.validateForm.valid) {
      console.log('submit', this.validateForm.value);
      console.log('submit_2', this.validateForm.value.phoneNumber);
      var object_name:loginCustomer={
        id_customerlogin:100,
        customer_username:this.validateForm.value.username,
        customer_password:this.validateForm.value.password,
        customer_email:this.validateForm.value.email,
        customer_address:this.validateForm.value.address,
        customer_phonenumber:this.validateForm.value.phoneNumber
      }
      console.log(object_name);

      this.dataService.registerCustomer(object_name).subscribe((object_name)=>
        {console.warn(object_name)}
      )



    } else {
      Object.values(this.validateForm.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          // control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }

  // updateConfirmValidator(): void {
  //   /** wait for refresh value */
  //   Promise.resolve().then(() => this.validateForm.controls['checkPassword'].updateValueAndValidity());
  // }
  //
  // confirmationValidator = (control: FormControl): { [s: string]: boolean } => {
  //   if (!control.value) {
  //     return { required: true };
  //   } else if (control.value !== this.validateForm.controls['password'].value) {
  //     return { confirm: true, error: true };
  //   }
  //   return {};
  // };



  constructor(private fb: FormBuilder,private dataService:DataService) {}

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      username: [null, [Validators.required]],
      email: [null, [Validators.email, Validators.required]],
      password: [null, [Validators.required]],
      phoneNumberPrefix: ['+86'],
      phoneNumber: [null, [Validators.required]],
      address: [null, [Validators.required]],
      agree: [false]
    });
  }

}
