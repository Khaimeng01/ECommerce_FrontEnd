import { Component, OnInit } from '@angular/core';
import {customer_orderPastHistory, seller_orderHistory} from "../../../classes/orderDetails";
import {SellerService} from "../../../service/seller-Services/seller.service";

@Component({
  selector: 'app-seller-order-history',
  templateUrl: './seller-order-history.component.html',
  styleUrls: ['./seller-order-history.component.css']
})
export class SellerOrderHistoryComponent implements OnInit {

  userAccountSession:any={
    username:""
  };
  seller_orderPastList!:seller_orderHistory[];


  constructor(private sellerService:SellerService) { }

  ngOnInit(): void {
    this.userAccountSession.username= sessionStorage.getItem('username');
    this.sellerService.getSellerOrderHistory(this.userAccountSession.username).subscribe(
      (response:seller_orderHistory[])=>{
        this.seller_orderPastList = response;
      }
    )

  }

  openWebsite(webAddress:string) {
    window.open('https://goerli.etherscan.io/tx/'+webAddress, '_blank');
  }

}
