// Programmer Name 	: Mr. Lai Khai Meng , TP055753 , APU3F2209CS
// Program Name   	: E_Commerce_Front_END
// Description     	: The footer of each page

import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  constructor(private router:Router) { }
  userAccountSession:any={
    username:"",
    userRole:""
  }

  ngOnInit(): void {
    if(sessionStorage.getItem('role')==null){
      this.userAccountSession.userRole="Buyer"
    }else{
      this.userAccountSession.userRole= sessionStorage.getItem('role');
    }
  }


}
