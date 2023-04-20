import { Component, OnInit } from '@angular/core';
import {BuyerService} from "../../service/buyer-Services/buyer.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {NzMessageService} from "ng-zorro-antd/message";
import {DataService} from "../../service/data.service";
import {SellerService} from "../../service/seller-Services/seller.service";

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.css']
})
export class ForgetPasswordComponent implements OnInit {

  switchValue:number = 0;
  currentValue:number=0;
  value: string=""
  validateForm!: FormGroup;
  updateValidateForm!: FormGroup;
  options = ['Buyer', 'Seller'];
  constructor(private buyerService:BuyerService,private fb: FormBuilder,private router:Router,
              private message: NzMessageService,private dataService:DataService,private sellerService:SellerService) { }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      userName: [null, [Validators.required,this.dataService.noSpaceAtStart()]]
    });
    this.updateValidateForm = this.fb.group({
      updatePassword: [null, [Validators.required,this.dataService.noSpaceAtStart()]]
    });
  }


  submitRequest() {
    if(this.validateForm.valid){
      if(this.switchValue ==0){
        this.buyerService.getCustomerStatus(this.validateForm.value.userName).subscribe((response:any)=>
          {
            if(response=="Account Does Exits"){
              console.log("Success");
              this.currentValue=1;
            }else{
              this.message.error('The Username does not exits. Try again and make sure you choose the correct user type');
            }
          }
        )
      }else{
        this.sellerService.getSellerStatus(this.validateForm.value.userName).subscribe((response:any)=>{
          if(response=="Account Does Exits"){
            console.log("Success");
            this.currentValue=1;
          }else{
            this.message.error('The Username does not exits. Try again and make sure you choose the correct user type');
          }
        })
      }

    }else{
      Object.values(this.validateForm.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
    // this.buyerService.getCustomerStatus(this.value).subscribe()
  }

  submitNewUpdate() {
    if(this.updateValidateForm.valid){
      if(this.switchValue ==0){
        this.buyerService.updatePassword(this.validateForm.value.userName,this.updateValidateForm.value.updatePassword).subscribe((response:any)=>
          {
            if(response=="Data save successfully"){
              this.router.navigate(['login']);
            }
          }

        )
      }else{
       this.sellerService.updatePassword(this.validateForm.value.userName,this.updateValidateForm.value.updatePassword).subscribe((response:any)=>
         {
           if(response=="Data save successfully"){
             this.router.navigate(['login']);
           }
         }
       )
      }
    }else{
      Object.values(this.validateForm.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }

  handleIndexChange(e: number): void {
    console.log(e);
    this.switchValue=e;
  }
}
