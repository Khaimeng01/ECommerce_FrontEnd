// Programmer Name 	: Mr. Lai Khai Meng , TP055753 , APU3F2209CS
// Program Name   	: E_Commerce_Front_END
// Description     	: The homepage for Sellers

import { Component, OnInit } from '@angular/core';
import {seller_orderHistory} from "../../../classes/orderDetails";
import {SellerService} from "../../../service/seller-Services/seller.service";
import {Decimal} from "decimal.js";

@Component({
  selector: 'app-seller-homepage',
  templateUrl: './seller-homepage.component.html',
  styleUrls: ['./seller-homepage.component.css']
})
export class SellerHomepageComponent implements OnInit {

  userAccountSession:any={
    username:""
  };
  seller_orderPastList!:seller_orderHistory[];
  numberOfSales:number = 0
  salesProfit:Decimal= new Decimal(0.000);
  salesProfit2:string=""
  selectedValue = new Date('2017-01-25');

  constructor(private sellerService:SellerService) { }

  async ngOnInit(): Promise<void> {
    this.userAccountSession.username= sessionStorage.getItem('username');
    await this.getSellerOrderHistory(this.userAccountSession.username);
  }

  async getSellerOrderHistory(userName:string):Promise<void>{
    this.sellerService.getSellerOrderHistory(userName).subscribe(
      (response:seller_orderHistory[])=>{
        this.seller_orderPastList = response;
        this.numberOfSales= this.seller_orderPastList.length
        for(let i = 0; i < this.seller_orderPastList.length; i++) {
          let currentOrder = this.seller_orderPastList[i];
          this.salesProfit = this.salesProfit.plus(currentOrder.order_priceamount);
        }
        this.salesProfit2=this.salesProfit.toString();
      }
    )
  }



}
