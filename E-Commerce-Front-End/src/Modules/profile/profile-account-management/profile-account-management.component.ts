import { Component, OnInit } from '@angular/core';
import {loginCustomer, loginCustomer2, loginCustomerSession} from "../../../classes/loginCustomer";
import {BuyerService} from "../../../service/buyer-Services/buyer.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {SellerService} from "../../../service/seller-Services/seller.service";
import {editSellerInfo, seller} from "../../../classes/sellerClasses";

@Component({
  selector: 'app-profile-account-management',
  templateUrl: './profile-account-management.component.html',
  styleUrls: ['./profile-account-management.component.css']
})
export class ProfileAccountManagementComponent implements OnInit {

  userAccountSession:any={
    username:"",
    userRole:""
  };

  buyerValidateForm!: FormGroup;
  sellerValidateForm!: FormGroup;
  buyerPersonalInformation!:loginCustomer2[]
  sellerPersonalInformation!:seller[];
  constructor(private buyerService:BuyerService,private fb: FormBuilder,private sellerService:SellerService) { }


  async ngOnInit(): Promise<void> {
    await this.obtainCustomerUsername_Role();
    await this.obtainCustomerPersonalInformation(this.userAccountSession.username);
    console.log("TEST_2")
    this.buyerValidateForm = this.fb.group({
      username: [null, [Validators.required]],
      email: [null, [Validators.email, Validators.required]],
      password: [null, [Validators.required]],
      phoneNumberPrefix: ['+60'],
      phoneNumber: [null, [Validators.required]],
      address: [null, [Validators.required]],
    });
    this.sellerValidateForm = this.fb.group({
      sellerUsername: [null, [Validators.required]],
      sellerEmail: [null, [Validators.email, Validators.required]],
      sellerPassword: [null, [Validators.required]],
      sellerPhoneNumberPrefix: ['+86'],
      sellerPhoneNumber: [null, [Validators.required]],
      sellerAddress: [null, [Validators.required]],
      sellerWalletAddress:[null,[Validators.required]],
    });
    console.log("TEST_3")


  }

  public async obtainCustomerPersonalInformation(username:string){
    console.log("LAI_3"+this.userAccountSession.userRole);
    if(this.userAccountSession.userRole == "Buyer"){
      this.buyerService.getCustomerPersonalInformation(username).subscribe(
        (response:loginCustomer2[])=>{
          console.log(response[0].customer_username);
          this.buyerPersonalInformation = response;
          console.log(this.buyerPersonalInformation[0].customer_username);
          console.log("TEST_1")
          this.buyerValidateForm.patchValue({
            username:this.buyerPersonalInformation[0].customer_username,
            password:this.buyerPersonalInformation[0].customer_password,
            email:this.buyerPersonalInformation[0].customer_email,
            phoneNumber:this.buyerPersonalInformation[0].customer_phonenumber,
            address:this.buyerPersonalInformation[0].customer_address
          })
        }
      )
    }else{
      this.sellerService.getSellerPersonalInformation(username).subscribe(
        (response:seller[])=>{
          console.log(response);
          this.sellerPersonalInformation = response;
          this.sellerValidateForm.patchValue({
            sellerUsername: this.sellerPersonalInformation[0].seller_username,
            sellerEmail: this.sellerPersonalInformation[0].seller_email,
            sellerPassword: this.sellerPersonalInformation[0].seller_password,
            sellerPhoneNumberPrefix: ['+86'],
            sellerPhoneNumber: this.sellerPersonalInformation[0].seller_phonenumber,
            sellerAddress: this.sellerPersonalInformation[0].seller_address,
            sellerWalletAddress:this.sellerPersonalInformation[0].seller_accountdetails
          })
        }
      )
    }

  }

  public async obtainCustomerUsername_Role(){
    console.log("LAI_0");
    this.userAccountSession.username= sessionStorage.getItem('username');
    console.log("LAI_1");
    this.userAccountSession.userRole= sessionStorage.getItem('role');
    console.log("LAI_2"+this.userAccountSession.userRole);
  }

  onBack(): void {
    console.log('onBack');
  }

  submitForm(): void {
      var editCustomerDetails:loginCustomer2={
        customer_username:this.buyerValidateForm.value.username,
        customer_password:this.buyerValidateForm.value.password,
        customer_email:this.buyerValidateForm.value.email,
        customer_address:this.buyerValidateForm.value.address,
        customer_phonenumber:this.buyerValidateForm.value.phoneNumber
      }
      this.buyerService.editDetails(editCustomerDetails,this.userAccountSession.username).subscribe();

  }

  //   username:this.buyerPersonalInformation[0].customer_username,
  //


  sellerSubmitForm() {
    var editSellerDetails:editSellerInfo={
      seller_username:this.sellerValidateForm.value.sellerUsername,
      seller_password:this.sellerValidateForm.value.sellerPassword,
      seller_address:this.sellerValidateForm.value.sellerAddress,
      seller_email:this.sellerValidateForm.value.sellerEmail ,
      seller_phonenumber:this.sellerValidateForm.value.sellerPhoneNumber,
      seller_accountdetails:this.sellerValidateForm.value.sellerWalletAddress
    }
    this.sellerService.editSellerPersonalInformation(editSellerDetails,this.userAccountSession.username).subscribe();
  }
}
