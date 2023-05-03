// Programmer Name 	: Mr. Lai Khai Meng , TP055753 , APU3F2209CS
// Program Name   	: E_Commerce_Front_END
// Description     	: The header located ontop at each page

import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {HeaderService} from "../../../service/header.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private router:Router,private headerService: HeaderService) { }
  userAccountSession:any={
    username:"",
    userRole:""
  }
  loggedIn:boolean = false;

  ngOnInit(): void {
    if(sessionStorage.getItem('username')!=null){
      this.loggedIn = true;
      this.userAccountSession.username= sessionStorage.getItem('username');
      this.userAccountSession.userRole= sessionStorage.getItem('role');
    }else{
      this.loggedIn = false;
    }
    this.headerService.reloadHeader$.subscribe(() => {
      if(sessionStorage.getItem('username') != null){
        this.loggedIn = true;
        this.userAccountSession.username = sessionStorage.getItem('username');
        this.userAccountSession.userRole = sessionStorage.getItem('role');
      } else {
        this.loggedIn = false;
      }
    });
  }

  loggedOut() {
    sessionStorage.clear();
    this.loggedIn = false;
    this.router.navigateByUrl('/homepage', { skipLocationChange: false, replaceUrl: true }).then(() => {
      window.location.reload();
    });
  }

  async checkAccountStatus(): Promise<void>{
    if(sessionStorage.getItem('username')!=null){
      this.loggedIn = true;
      this.userAccountSession.username= sessionStorage.getItem('username');
      this.userAccountSession.userRole= sessionStorage.getItem('role');
    }else{
      this.loggedIn = false;
    }
  }



}
