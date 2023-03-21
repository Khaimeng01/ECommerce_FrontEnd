import { Component, OnInit } from '@angular/core';
import {BuyerService} from "../../service/buyer-Services/buyer.service";
import {customer_orderPastHistory} from "../../classes/orderDetails";
import {loginCustomer2} from "../../classes/loginCustomer";

interface Person {
  key: string;
  name: string;
  age: number;
  address: string;
}

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
  constructor(private buyerService:BuyerService) { }

  ngOnInit(): void {
    this.userAccountSession.username= sessionStorage.getItem('username');
    this.buyerService.getCustomerOrderPastHistory(this.userAccountSession.username).subscribe(
      (response:customer_orderPastHistory[])=>{
        console.log(response[0]);
        this.customer_orderPastHistoryList = response
        console.log(this.customer_orderPastHistoryList[0].order_date);
      }
    )
  }

  listOfData: Person[] = [
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

  openWebsite(webAddress:string) {
    window.open('https://goerli.etherscan.io/tx/'+webAddress, '_blank');
  }
}
