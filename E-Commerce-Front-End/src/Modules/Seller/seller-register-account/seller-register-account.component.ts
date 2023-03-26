import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {manageSellerInfo} from "../../../classes/sellerClasses";
import {SellerService} from "../../../service/seller-Services/seller.service";

@Component({
  selector: 'app-seller-register-account',
  templateUrl: './seller-register-account.component.html',
  styleUrls: ['./seller-register-account.component.css']
})
export class SellerRegisterAccountComponent implements OnInit {

  sellerValidateForm!: FormGroup;

  constructor(private fb: FormBuilder,
              private sellerService:SellerService) { }

  ngOnInit(): void {
    this.sellerValidateForm = this.fb.group({
      sellerUsername: [null, [Validators.required]],
      sellerEmail: [null, [Validators.email, Validators.required]],
      sellerPassword: [null, [Validators.required]],
      sellerPhoneNumberPrefix: ['+60'],
      sellerPhoneNumber: [null, [Validators.required]],
      sellerAddress: [null, [Validators.required]],
      sellerWalletAddress:[null,[Validators.required]],
      sellerAgree: [false]
    });
  }

  submitForm() {
    if(this.sellerValidateForm.valid){
      var sellerDetails:manageSellerInfo={
        seller_username:this.sellerValidateForm.value.sellerUsername,
        seller_password:this.sellerValidateForm.value.sellerPassword,
        seller_accountdetails:this.sellerValidateForm.value.sellerWalletAddress,
        seller_email:this.sellerValidateForm.value.sellerEmail,
        seller_address:this.sellerValidateForm.value.sellerAddress,
        seller_phonenumber:(this.sellerValidateForm.value.sellerPhoneNumberPrefix+
          this.sellerValidateForm.value.sellerPhoneNumber)
      }
      this.sellerService.registerSeller(sellerDetails).subscribe()
    }
  }
}
