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
import {SelllerGuard} from "../guards/selller.guard";
import {UnauthorizedPageComponent} from "../Modules/unauthorized-page/unauthorized-page.component";
import {DummyComponentComponent} from "../Modules/Seller/dummy-component/dummy-component.component";
import {ForgetPasswordComponent} from "../Modules/forget-password/forget-password.component";
import {SuccesfullPageComponent} from "../Modules/succesfull-page/succesfull-page.component";


const routes: Routes = [
  {path:'',redirectTo:'/homepage',pathMatch:'full'},
  {path:'login',component:LoginComponent},
  {path:'register',component:RegisterComponent},
  {path:'homepage',component:HomepageComponent},
  {path:'forgetPassword',component:ForgetPasswordComponent},
  {path:'productHomepage',component:ProductHomepageComponent},
  {path:'productHomepage/:category',component:ProductHomepageComponent},
  {path:'productProfilePage/:id',component:ProductProilerPageComponent},
  {path:'registerProductComponent',component:RegisterProductComponent,canActivate:[SelllerGuard]},
  {path:'checkOutPage',component:CheckOutPageComponent,canActivate: [AuthGuardGuard]},
  {path:'sellerRegisterAccount',component:SellerRegisterAccountComponent},
  {path:'contactUs',component:ContactUsComponent},
  {path:'unauthorizedPage',component:UnauthorizedPageComponent},
  {path:'profileManagementLayout',component:ProfileManagementLayoutComponent,canActivate: [AuthGuardGuard],
    canActivateChild: [AuthGuardGuard],
  children:[
    { path:'accountManagement',component:ProfileAccountManagementComponent},
    {path:'pastOrderHistory',component:ProfilePastOrderHistoryComponent},
    {path:'successfulPage',component: SuccesfullPageComponent},
  ]},
  {path: 'sellerLayout', component: SellerLayoutComponent,canActivate: [SelllerGuard], canActivateChild: [SelllerGuard],
   children:[
     {path:'sellerHomepage',component:SellerHomepageComponent},
     {path:'accountManagement',component:ProfileAccountManagementComponent},
     {path:'registerProductComponent',component:RegisterProductComponent},
     {path:'sellerOrderHistory',component: SellerOrderHistoryComponent},
     {path:'sellerProductTableView',component: SellerProductTableViewComponent},
     {path:"sellerEditProduct",component: SellerEditProductComponent},
     {path:'dummy-route',component: DummyComponentComponent},
     {path:'successfulPage',component: SuccesfullPageComponent},
     { path: '**', redirectTo: 'sellerHomepage', pathMatch: 'full' },
   ]
  },
  { path: '**', redirectTo: '/unauthorizedPage', pathMatch: 'full' }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
