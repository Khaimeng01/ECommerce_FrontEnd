// Programmer Name 	: Mr. Lai Khai Meng , TP055753 , APU3F2209CS
// Program Name   	: E_Commerce_Front_END
// Description     	: To allow user to edit and view their profile information


import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {loginCustomer, loginCustomer2, loginCustomerSession} from "../../../classes/loginCustomer";
import {BuyerService} from "../../../service/buyer-Services/buyer.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {SellerService} from "../../../service/seller-Services/seller.service";
import {editSellerInfo, seller} from "../../../classes/sellerClasses";
import {NavigationExtras, Router} from "@angular/router";
import {HeaderService} from "../../../service/header.service";
@Component({
  selector: 'app-profile-account-management',
  templateUrl: './profile-account-management.component.html',
  styleUrls: ['./profile-account-management.component.css']
})
export class ProfileAccountManagementComponent implements OnInit {

  editProfileStatus=false;

  userAccountSession:any={
    username:"",
    userRole:""
  };

  buyerValidateForm!: FormGroup;
  sellerValidateForm!: FormGroup;
  buyerPersonalInformation!:loginCustomer2[]
  sellerPersonalInformation!:seller[];
  constructor(private buyerService:BuyerService,private fb: FormBuilder,private sellerService:SellerService,
              private router:Router,private cdRef: ChangeDetectorRef,private headerService: HeaderService) { }


  async ngOnInit(): Promise<void> {
    this.editProfileStatus=false;
    this.buyerValidateForm = this.fb.group({
      username: [null, [Validators.required]],
      email: [null, [Validators.email, Validators.required]],
      password: [null, [Validators.required]],
      phoneNumberPrefix: ['+60'],
      phoneNumber: [null, [Validators.required,
        Validators.pattern(/^\d{9}$/),
        Validators.min(1)]],
      address: [null, [Validators.required]],
    });
    this.sellerValidateForm = this.fb.group({
      sellerUsername: [null, [Validators.required]],
      sellerEmail: [null, [Validators.email, Validators.required]],
      sellerPassword: [null, [Validators.required]],
      sellerPhoneNumberPrefix: ['+60'],
      sellerPhoneNumber: [null, [Validators.required,
        Validators.pattern(/^\d{9}$/),
        Validators.min(1)]],
      sellerAddress: [null, [Validators.required]],
      sellerWalletAddress:[null,[Validators.required]],
    });
    await this.obtainCustomerUsername_Role();
    await this.obtainCustomerPersonalInformation(this.userAccountSession.username);
  }

  public async obtainCustomerPersonalInformation(username:string){
    if(this.userAccountSession.userRole == "Buyer"){
      this.buyerService.getCustomerPersonalInformation(username).subscribe(
        (response:loginCustomer2[])=>{
          this.buyerPersonalInformation = response;
          this.buyerValidateForm.patchValue({
            username:this.buyerPersonalInformation[0].customer_username,
            password:this.buyerPersonalInformation[0].customer_password,
            email:this.buyerPersonalInformation[0].customer_email,
            phoneNumber:this.buyerPersonalInformation[0].customer_phonenumber,
            address:this.buyerPersonalInformation[0].customer_address,
            phoneNumberPrefix:'+60'
          })
        }
      )
    }else{
      this.sellerService.getSellerPersonalInformation(username).subscribe(
        (response:seller[])=>{
          this.sellerPersonalInformation = response;
          this.sellerValidateForm.patchValue({
            sellerUsername: this.sellerPersonalInformation[0].seller_username,
            sellerEmail: this.sellerPersonalInformation[0].seller_email,
            sellerPassword: this.sellerPersonalInformation[0].seller_password,
            sellerPhoneNumberPrefix:['+60'],
            sellerPhoneNumber: this.sellerPersonalInformation[0].seller_phonenumber,
            sellerAddress: this.sellerPersonalInformation[0].seller_address,
            sellerWalletAddress:this.sellerPersonalInformation[0].seller_accountdetails
          })
        }
      )
    }

  }

  public async obtainCustomerUsername_Role(){
    this.userAccountSession.username= sessionStorage.getItem('username');
    this.userAccountSession.userRole= sessionStorage.getItem('role');
  }


  submitForm(): void {
    if(this.buyerValidateForm.valid){
      var editCustomerDetails:loginCustomer2={
        customer_username:this.buyerValidateForm.value.username,
        customer_password:this.buyerValidateForm.value.password,
        customer_email:this.buyerValidateForm.value.email,
        customer_address:this.buyerValidateForm.value.address,
        customer_phonenumber:this.buyerValidateForm.value.phoneNumber
      }
      this.userAccountSession.username= sessionStorage.getItem('username');
      this.buyerService.editDetails(editCustomerDetails,this.userAccountSession.username).subscribe();
      sessionStorage.setItem('username', editCustomerDetails.customer_username);
      this.router.navigate(['/profileManagementLayout/successfulPage']).then(() => {
        this.headerService.triggerReload();
      });
    }
  }


  sellerSubmitForm() {
    if (this.sellerValidateForm.valid) {
      var editSellerDetails:editSellerInfo={
        seller_username:this.sellerValidateForm.value.sellerUsername,
        seller_password:this.sellerValidateForm.value.sellerPassword,
        seller_address:this.sellerValidateForm.value.sellerAddress,
        seller_email:this.sellerValidateForm.value.sellerEmail,
        seller_phonenumber:this.sellerValidateForm.value.sellerPhoneNumber,
        seller_accountdetails:this.sellerValidateForm.value.sellerWalletAddress
      }
      this.userAccountSession.username= sessionStorage.getItem('username');
      this.sellerService.editSellerPersonalInformation(editSellerDetails,this.userAccountSession.username).subscribe();
      sessionStorage.setItem('username', editSellerDetails.seller_username);
      this.router.navigate(['/sellerLayout/successfulPage']).then(() => {
        this.headerService.triggerReload();
      });
    }
  }
}
