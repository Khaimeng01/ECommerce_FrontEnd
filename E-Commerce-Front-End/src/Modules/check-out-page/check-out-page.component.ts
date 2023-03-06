import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {loginCustomer} from "../../classes/loginCustomer";
import {OrderProductsService} from "../../service/orderProducts.service";

import {orderDetails, orderDetailsToAPI} from "../../classes/orderDetails";

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

  customerDatabase={
    _order_Seller_Username:"",
    _order_delivery_Address:"",
    _order_Seller_ContactNumber:""
  };
  orderDetails:orderDetails={
    product_Id:BigInt('9007199254740991'),
    productName:"",
    orderSellerUsername:"",
    quantity: 0,
    productPrice:0,
    total: 0
  }
  listOfData:Person[] = [
    {
      key: '1',
      name: 'John Brown',
      age: 32,
      address: 'New York No. 1 Lake Park'
    },
    {
      key: '2',
      name: 'Jim Green',
      age: 42,
      address: 'London No. 1 Lake Park'
    },
    {
      key: '3',
      name: 'Joe Black',
      age: 32,
      address: 'Sidney No. 1 Lake Park'
    }
  ];
  constructor(private fb: FormBuilder,private orderProductService:OrderProductsService) { }

  ngOnInit(): void {
    this.orderDetails = this.orderProductService.orderDetails
    this.customerUsername = sessionStorage.getItem('username');
    this.orderProductService.getOrderBuyerDetails(this.customerUsername).subscribe((response:any)=>{
        console.log(response.order_Seller_Username)
        this.customerDatabase._order_Seller_Username = response.order_Seller_Username;
        this.customerDatabase._order_Seller_ContactNumber = response.order_Seller_ContactNumber;
        this.customerDatabase._order_delivery_Address=response.order_delivery_Address;
    })
    this.validateForm = this.fb.group({
      username: [null, [Validators.required]],
      phoneNumber: [null, [Validators.required]],
      address: [null, [Validators.required]],
    });
  }

  submitForm(): void {
    if (this.validateForm.valid) {
      // var customerOrderDetails:orderDetailsToAPI={
      //   product_Id:,
      //   order_productquantity:,
      //   priceamount:,
      //   order_buyer_username:,
      //   order_seller_username:this.customerDatabase._order_Seller_Username,
      //   order_delivery_address:,
      //   order_buyer_contact_number:,
      //   order_description:"",
      //   order_status:"FALSE"
      // }
      var object_name:loginCustomer={
        id_customerlogin:100,
        customer_username:this.validateForm.value.username,
        customer_password:this.validateForm.value.password,
        customer_email:this.validateForm.value.email,
        customer_address:this.validateForm.value.address,
        customer_phonenumber:this.validateForm.value.phoneNumber
      }
      console.log(object_name);
    } else {
      Object.values(this.validateForm.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          // control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }

}
