// Programmer Name 	: Mr. Lai Khai Meng , TP055753 , APU3F2209CS
// Program Name   	: E_Commerce_Front_END
// Description     	: To showcase unauthorized page to users who enter the page without the appropriate credentials

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
