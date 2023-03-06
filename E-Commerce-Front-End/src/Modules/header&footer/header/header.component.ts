import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor() { }
  userAccountSession:any={
    username:"",
    userRole:""
  }
  loggedIn:boolean = false;

  ngOnInit(): void {
    if(sessionStorage.getItem('username')!=null){
      console.log("First"+this.loggedIn);
      this.loggedIn = true;
      console.log("After"+this.loggedIn);
      this.userAccountSession.username= sessionStorage.getItem('username');
      this.userAccountSession.userRole= sessionStorage.getItem('role');
    }else{
      this.loggedIn = false;
    }
  }

}
