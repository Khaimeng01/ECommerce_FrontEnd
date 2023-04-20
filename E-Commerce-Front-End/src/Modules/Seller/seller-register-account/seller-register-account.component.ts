import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {manageSellerInfo} from "../../../classes/sellerClasses";
import {SellerService} from "../../../service/seller-Services/seller.service";
import {NzMessageService} from "ng-zorro-antd/message";
import {Router} from "@angular/router";
import {DataService} from "../../../service/data.service";

@Component({
  selector: 'app-seller-register-account',
  templateUrl: './seller-register-account.component.html',
  styleUrls: ['./seller-register-account.component.css']
})
export class SellerRegisterAccountComponent implements OnInit {

  sellerValidateForm!: FormGroup;

  constructor(private fb: FormBuilder,
              private sellerService:SellerService,
              private messageService: NzMessageService,
              private router:Router,private dataService:DataService) { }

  ngOnInit(): void {
    this.sellerValidateForm = this.fb.group({
      sellerUsername: [null, [Validators.required,this.dataService.noSpaceAtStart()]],
      sellerEmail: [null, [Validators.email, Validators.required]],
      sellerPassword: [null, [Validators.required]],
      sellerPhoneNumberPrefix: ['+60'],
      sellerPhoneNumber: [null, [
        Validators.required,
        Validators.pattern(/^\d{9}$/),
        Validators.min(1)
      ]],
      sellerAddress: [null, [Validators.required,this.dataService.noSpaceAtStart()]],
      sellerWalletAddress:[null,[Validators.required,this.dataService.noSpaceAtStart()]],
      // sellerAgree: [false]
    });
  }

  submitForm() {
    if(this.sellerValidateForm.valid){
      console.log("Inside");
      var sellerDetails:manageSellerInfo={
        seller_username:this.sellerValidateForm.value.sellerUsername,
        seller_password:this.sellerValidateForm.value.sellerPassword,
        seller_accountdetails:this.sellerValidateForm.value.sellerWalletAddress,
        seller_email:this.sellerValidateForm.value.sellerEmail,
        seller_address:this.sellerValidateForm.value.sellerAddress,
        seller_phonenumber:this.sellerValidateForm.value.sellerPhoneNumber
      }
      this.sellerService.registerSeller(sellerDetails).subscribe((response:any)=>
        {
          if(response==="Username has been used"){
            this.messageService.error('Username has been used. Try another username');
          }else if(response === "Email has been used"){
            this.messageService.error('Email has been used. Try updating password or login into your account');
          }
          else if(response === "Success"){
            this.router.navigate(['/login']);
          }
        }
      )
    }else{
      console.log("Error")
      Object.values(this.sellerValidateForm.controls).forEach(control => {
        control.markAsDirty();
        control.updateValueAndValidity({ onlySelf: true });
      });
    }
  }

  redirectToRegister() {
    this.router.navigate(['register']);
  }
}
