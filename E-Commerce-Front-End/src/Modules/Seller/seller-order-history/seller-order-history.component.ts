import { Component, OnInit } from '@angular/core';
import {customer_orderPastHistory, seller_orderHistory} from "../../../classes/orderDetails";
import {SellerService} from "../../../service/seller-Services/seller.service";
import {ProductsDetails2} from "../../../classes/productsDetails";

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


  listOfColumn = [
    {
      title: 'Order ID',
      compare: (a:seller_orderHistory , b:seller_orderHistory) => a.id_order - b.id_order,
      priority: false,
      width:'10px'
    },
    {
      title: 'Order Date',
      compare: (a: seller_orderHistory, b: seller_orderHistory) => new Date(a.order_date).toISOString().localeCompare(new Date(b.order_date).toISOString()),
      priority: 1,
      width:'10px'
    },
    {
      title: 'Product Id',
      compare: (a: seller_orderHistory, b: seller_orderHistory) => Number(a.product_id) - Number(b.product_id),
      priority: 2,
      width:'114px'
    },
    {
      title: 'Order Total',
      compare: (a: seller_orderHistory, b: seller_orderHistory) => a.order_priceamount - b.order_priceamount,
      priority: 3,
      width:'119px'
    },
    {
      title: 'Buyer Username',
      compare: (a: seller_orderHistory, b: seller_orderHistory) =>  a.order_buyer_username.localeCompare(b.order_buyer_username),
      priority: 4,
      width:'2px'
    },
    {
      title: 'Seller Username',
      compare: (a: seller_orderHistory, b: seller_orderHistory) =>  a.order_seller_username.localeCompare(b.order_seller_username),
      priority: 5,
      width:'100px'
    },
  ];



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
