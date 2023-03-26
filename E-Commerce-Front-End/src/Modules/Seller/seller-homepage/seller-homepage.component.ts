import { Component, OnInit } from '@angular/core';
import {seller_orderHistory} from "../../../classes/orderDetails";
import {SellerService} from "../../../service/seller-Services/seller.service";

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
  salesProfit:number=0;
  selectedValue = new Date('2017-01-25');

  constructor(private sellerService:SellerService) { }

  ngOnInit(): void {
    this.userAccountSession.username= sessionStorage.getItem('username');
    this.sellerService.getSellerOrderHistory(this.userAccountSession.username).subscribe(
      (response:seller_orderHistory[])=>{
        this.seller_orderPastList = response;
        this.numberOfSales= this.seller_orderPastList.length
        for(let i = 0; i < this.seller_orderPastList.length; i++) {
          let currentOrder = this.seller_orderPastList[i];
          this.salesProfit += currentOrder.order_priceamount;
        }
      }
    )
  }



  selectChange(select: Date): void {
    console.log(`Select value: ${select}`);
  }

}
