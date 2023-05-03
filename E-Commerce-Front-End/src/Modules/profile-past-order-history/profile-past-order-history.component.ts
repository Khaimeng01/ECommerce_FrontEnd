// Programmer Name 	: Mr. Lai Khai Meng , TP055753 , APU3F2209CS
// Program Name   	: E_Commerce_Front_END
// Description     	: To allow user to view their past order history

import { Component, OnInit } from '@angular/core';
import {BuyerService} from "../../service/buyer-Services/buyer.service";
import {customer_orderPastHistory, seller_orderHistory} from "../../classes/orderDetails";
import {loginCustomer2} from "../../classes/loginCustomer";


@Component({
  selector: 'app-profile-past-order-history',
  templateUrl: './profile-past-order-history.component.html',
  styleUrls: ['./profile-past-order-history.component.css']
})
export class ProfilePastOrderHistoryComponent implements OnInit {
  userAccountSession:any={
    username:""
  };
  customer_orderPastHistoryList!:customer_orderPastHistory[];
  listOfColumn = [
    {
      title: 'Order ID',
      compare: (a:customer_orderPastHistory , b:customer_orderPastHistory) => a.id_order - b.id_order,
      priority: false,
      width:'10px'
    },
    {
      title: 'Order Date',
      compare: (a: customer_orderPastHistory, b: customer_orderPastHistory) => new Date(a.order_date).toISOString().localeCompare(new Date(b.order_date).toISOString()),
      priority: 1,
      width:'10px'
    },
    {
      title: 'Product Name',
      compare: (a: customer_orderPastHistory, b: customer_orderPastHistory) => Number(a.product_id) - Number(b.product_id),
      priority: 2,
      width:'114px'
    },
    {
      title: 'Order Total',
      compare: (a: customer_orderPastHistory, b: customer_orderPastHistory) =>
        Number(a.order_priceamount.toString()) - Number(b.order_priceamount.toString()),
      priority: 3,
      width:'119px'
    },
    {
      title: 'Seller Username',
      compare: (a: customer_orderPastHistory, b: customer_orderPastHistory) =>  a.order_seller_username.localeCompare(b.order_seller_username),
      priority: 4,
      width:'2px'
    },
    {
      title: 'Order Status',
      compare: (a: customer_orderPastHistory, b: customer_orderPastHistory) =>  a.order_status.localeCompare(b.order_status),
      priority: 5,
      width:'100px'
    },
  ];


  constructor(private buyerService:BuyerService) { }

  ngOnInit(): void {
    this.userAccountSession.username= sessionStorage.getItem('username');
    this.buyerService.getCustomerOrderPastHistory(this.userAccountSession.username).subscribe(
      (response:customer_orderPastHistory[])=>{
        this.customer_orderPastHistoryList = response
      }
    )
  }

  openWebsite(webAddress:string) {
    window.open('https://goerli.etherscan.io/tx/'+webAddress, '_blank');
  }
}
