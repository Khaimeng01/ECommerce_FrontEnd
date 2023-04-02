import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from "../Modules/login/login.component";
import {RegisterComponent} from "../Modules/register/register.component";
import {HomepageComponent} from "../Modules/homepage/homepage.component";
import {ProductHomepageComponent} from "../Modules/product-homepage/product-homepage.component";
import {RegisterProductComponent} from "../Modules/register-product/register-product.component";
import {ProductProilerPageComponent} from "../Modules/product-proiler-page/product-proiler-page.component";
import {CheckOutPageComponent} from "../Modules/check-out-page/check-out-page.component";
import {AuthGuardGuard} from "../guards/auth-guard.guard";

import {ProfileManagementLayoutComponent} from "../Modules/profile-management-layout/profile-management-layout.component";
import {
  ProfileAccountManagementComponent
} from "../Modules/profile/profile-account-management/profile-account-management.component";
import {
  ProfilePastOrderHistoryComponent
} from "../Modules/profile-past-order-history/profile-past-order-history.component";
import {SellerLayoutComponent} from "../Modules/Seller/layout/seller-layout/seller-layout.component";
import {SellerHomepageComponent} from "../Modules/Seller/seller-homepage/seller-homepage.component";
import {
  SellerProductTableViewComponent
} from "../Modules/Seller/seller-product-table-view/seller-product-table-view.component";
import {SellerOrderHistoryComponent} from "../Modules/Seller/seller-order-history/seller-order-history.component";
import {SellerEditProductComponent} from "../Modules/Seller/seller-edit-product/seller-edit-product.component";
import {
  SellerRegisterAccountComponent
} from "../Modules/Seller/seller-register-account/seller-register-account.component";
import {ContactUsComponent} from "../Modules/contact-us/contact-us.component";


const routes: Routes = [
  // {path:'',redirectTo:'/',pathMatch:'full'}
  {path:'',redirectTo:'/homepage',pathMatch:'full'},
  {path:'login',component:LoginComponent},
  {path:'register',component:RegisterComponent},
  {path:'homepage',component:HomepageComponent},
  {path:'productHomepage',component:ProductHomepageComponent},
  {path:'productHomepage/:category',component:ProductHomepageComponent},
  {path:'productProfilePage/:id',component:ProductProilerPageComponent},
  {path:'registerProductComponent',component:RegisterProductComponent},
  {path:'checkOutPage',component:CheckOutPageComponent},
  {path:'sellerRegisterAccount',component:SellerRegisterAccountComponent},
  {path:'contactUs',component:ContactUsComponent},
  {path:'profileManagementLayout',component:ProfileManagementLayoutComponent,
  children:[
    { path:'accountManagement',component:ProfileAccountManagementComponent},
    {path:'pastOrderHistory',component:ProfilePastOrderHistoryComponent}
  ]},
  {path: 'sellerLayout', component: SellerLayoutComponent,
   children:[
     {path:'sellerHomepage',component:SellerHomepageComponent},
     {path:'accountManagement',component:ProfileAccountManagementComponent},
     {path:'registerProductComponent',component:RegisterProductComponent},
     {path:'sellerOrderHistory',component: SellerOrderHistoryComponent},
     {path:'sellerProductTableView',component: SellerProductTableViewComponent},
     {path:"sellerEditProduct",component: SellerEditProductComponent},
     {path:'',component: SellerHomepageComponent},
   ]
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
