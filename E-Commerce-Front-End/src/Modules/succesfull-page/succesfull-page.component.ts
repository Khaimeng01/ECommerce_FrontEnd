// Programmer Name 	: Mr. Lai Khai Meng , TP055753 , APU3F2209CS
// Program Name   	: E_Commerce_Front_END
// Description     	: To show the successful page after Editing Profile


import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-succesfull-page',
  templateUrl: './succesfull-page.component.html',
  styleUrls: ['./succesfull-page.component.css']
})
export class SuccesfullPageComponent implements OnInit {

  userAccountSession:any={
    username:"",
    userRole:""
  };

  constructor(private router:Router) { }

  async ngOnInit(): Promise<void> {
    await this.obtainCustomerUsername_Role();
  }

  public async obtainCustomerUsername_Role(){
    this.userAccountSession.username= sessionStorage.getItem('username');
    this.userAccountSession.userRole= sessionStorage.getItem('role');
  }

  public redirect(){
    if(this.userAccountSession.userRole=="Buyer"){
      this.router.navigate(["/profileManagementLayout/accountManagement"]);
    }else{
      this.router.navigate(["/sellerLayout/accountManagement"]);
    }
  }

}
