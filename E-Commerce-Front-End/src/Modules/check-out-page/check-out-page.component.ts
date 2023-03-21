import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {loginCustomer} from "../../classes/loginCustomer";
import {OrderProductsService} from "../../service/orderProducts.service";

import {orderDetails, orderDetailsToAPI} from "../../classes/orderDetails";
import {TransactionService} from "../../service/transaction.service";

interface Person {
  key: string;
  name: string;
  age: number;
  address: string;
}

interface orderAmount {
  productName: string;
  quantity: number;
  total: number;
}


@Component({
  selector: 'app-check-out-page',
  templateUrl: './check-out-page.component.html',
  styleUrls: ['./check-out-page.component.css']

})
export class CheckOutPageComponent implements OnInit {

  customerUsername!:any;
  validateForm!: FormGroup;
  walletStatus:Boolean=false;
  customerDatabase={
    order_Buyer_Username:"",
    order_Delivery_Address:"",
    order_Buyer_ContactNumber:""
  };

  orderDetails:orderDetails={
    product_id:BigInt('9007199254740991'),
    productName:"",
    orderSellerUsername:"",
    quantity: 0,
    productPrice:0,
    total: 0,
    orderSellerAddress:"0xB80ef9e783F06DADDE4d1bbd7B461D1c288250F1"
  }



  private formData = { addressTo: '', amount: '', keyword: '', message: '' };

  constructor(private fb: FormBuilder,private orderProductService:OrderProductsService,
              private transactionService:TransactionService) { }

  async ngOnInit(): Promise<void> {
    this.orderDetails = this.orderProductService.orderDetails
    this.customerUsername = sessionStorage.getItem('username');
    this.walletStatus = this.transactionService.checkIfAccountConnect();
    await this.obtainOrderBuyerDetails(this.customerUsername)
    this.validateForm = this.fb.group({
      username: [null, [Validators.required]],
      phoneNumber: [null, [Validators.required]],
      address: [null, [Validators.required]],
    });
  }

  async submitForm(): Promise<void>  {
    if (this.validateForm.valid) {
      this.walletStatus = await this.transactionService.connectWallet();
      var customerOrderDetails:orderDetailsToAPI={
        product_id:this.orderDetails.product_id,
        order_date:new Date(),
        order_productquantity:this.orderDetails.quantity,
        order_priceamount:this.orderDetails.total,
        order_buyer_username:this.validateForm.value.username,
        order_seller_username:this.orderDetails.orderSellerUsername,
        order_delivery_address:this.validateForm.value.address,
        order_buyer_contact_number:this.validateForm.value.phoneNumber,
        order_description:"",
        order_status:"FALSE",
        order_transaction_record:""
      }
      this.formData.addressTo=this.orderDetails.orderSellerAddress;
      this.formData.amount= String(this.orderDetails.total);
      this.formData.keyword="test"
      this.formData.message="test"
      let transactionLink = await this.transactionService.sendTransaction(this.formData);
      customerOrderDetails.order_transaction_record=transactionLink;
      console.log("DATA"+customerOrderDetails);
      this.orderProductService.registerCustomerOrder(customerOrderDetails).subscribe();
    } else {
      Object.values(this.validateForm.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          // control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }

  async connectToMetamask() {
    this.walletStatus = await this.transactionService.connectWallet();
  }

  public async obtainOrderBuyerDetails(customerUsername:string){
    this.orderProductService.getOrderBuyerDetails(this.customerUsername).subscribe((response:any)=>{
      this.customerDatabase.order_Buyer_Username = response.order_Buyer_Username;
      this.customerDatabase.order_Buyer_ContactNumber = response.order_Buyer_ContactNumber;
      this.customerDatabase.order_Delivery_Address=response.order_Delivery_Address;
      this.validateForm.patchValue({
        username: this.customerDatabase.order_Buyer_Username,
        phoneNumber:this.customerDatabase.order_Buyer_ContactNumber,
        address: this.customerDatabase.order_Delivery_Address
      })
    })
  }


}
