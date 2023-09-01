// Programmer Name 	: Mr. Lai Khai Meng , TP055753 , APU3F2209CS
// Program Name   	: E_Commerce_Front_END
// Description     	: To allow users to check out and purchase their desired products

import {Component, Input, OnInit} from '@angular/core';
import {OrderProductsService} from "../../service/orderProducts.service";
import {orderDetails, orderDetailsToAPI} from "../../classes/orderDetails";
import {TransactionService} from "../../service/transaction.service";
import {Decimal} from "decimal.js";
import {Router} from "@angular/router";
import {NzMessageService} from "ng-zorro-antd/message";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-check-out-page',
  templateUrl: './check-out-page.component.html',
  styleUrls: ['./check-out-page.component.css']

})
export class CheckOutPageComponent implements OnInit {

  customerUsername!:any;
  validateForm!: FormGroup;
  walletStatus:Boolean=false;
  price: Decimal = new Decimal(0.001);
  listOfData: orderDetails[] = [];
  checkOutStatus=false;
  checkOutStatus_2=false;
  private formData = { addressTo: '', amount: '', keyword: '', message: '' };
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
    productPrice:this.price,
    total: this.price,
    product_description:"",
    orderSellerAddress:"0xB80ef9e783F06DADDE4d1bbd7B461D1c288250F1"
  }

  constructor(private fb: FormBuilder,private orderProductService:OrderProductsService,
              private transactionService:TransactionService,private router:Router,
              private message: NzMessageService) { }

  async ngOnInit(): Promise<void> {
    this.validateForm = this.fb.group({
      username: [{value: '', disabled: true}, [Validators.required]],
      phoneNumberPrefix: ['+60'],
      phoneNumber: [null, [Validators.required]],
      address: [null, [Validators.required]],
    });
    await  this.obtainOrderData()
    this.customerUsername = sessionStorage.getItem('username');
    this.walletStatus = this.transactionService.checkIfAccountConnect();
    await this.obtainOrderBuyerDetails(this.customerUsername)
  }


  async obtainOrderData(): Promise<void>{
    this.orderDetails = this.orderProductService.orderDetails;
    console.log(this.orderDetails);
    this.listOfData[0]=this.orderDetails
  }


  async submitForm(): Promise<void>  {
    if (this.validateForm.valid) {
      this.checkOutStatus_2=true;
      this.walletStatus = await this.transactionService.connectWallet();
      var customerOrderDetails:orderDetailsToAPI={
        product_id:this.orderDetails.product_id,
        order_date:new Date(),
        order_productquantity:this.orderDetails.quantity,
        order_priceamount:this.orderDetails.total,
        order_buyer_username:this.customerUsername,
        order_seller_username:this.orderDetails.orderSellerUsername,
        order_delivery_address:this.validateForm.value.address,
        order_buyer_contact_number:this.validateForm.value.phoneNumber,
        order_description:this.orderDetails.product_description,
        order_status:"FALSE",
        order_transaction_record:""
      }
      this.formData.addressTo=this.orderDetails.orderSellerAddress;
      this.formData.amount= String(this.orderDetails.total);
      this.formData.keyword="test"
      this.formData.message="test"
      let transactionLink = await this.transactionService.sendTransaction(this.formData);
      customerOrderDetails.order_transaction_record=transactionLink;
      customerOrderDetails.order_status="TRUE";
      this.orderProductService.registerCustomerOrder(customerOrderDetails).subscribe();
      this.checkOutStatus_2=false;
      this.checkOutStatus=true;
    } else {
      this.message.error('Please insert the order details');
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

  onBack(): void {
    this.router.navigate(['/productProfilePage/'+this.orderDetails.product_id])
  }


}
