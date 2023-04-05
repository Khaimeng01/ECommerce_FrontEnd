import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-unauthorized-page',
  templateUrl: './unauthorized-page.component.html',
  styleUrls: ['./unauthorized-page.component.css']
})
export class UnauthorizedPageComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  // redirectToHomepage() {
  //   const username = sessionStorage.getItem('username');
  //   const role = sessionStorage.getItem('role');
  //   if(role ==="Buyer"){
  //     this.router.navigate(['/homepage']);
  //   }else if (role==="Seller"){
  //     this.router.navigate(['/sellerLayout/sellerHomepage']);
  //   }else{
  //     this.router.navigate(['/homepage']);
  //   }
  // }
  redirectToHomepage(): void {
    const username = sessionStorage.getItem('username');
    const role = sessionStorage.getItem('role');

    const navigationRoutes: { [key: string]: string } = {
      Buyer: '/homepage',
      Seller: '/sellerLayout/sellerHomepage',
    };

    const defaultRoute = '/homepage';
    const route = navigationRoutes[role ?? ''] ?? defaultRoute;

    this.router.navigate([route]);
  }

}
