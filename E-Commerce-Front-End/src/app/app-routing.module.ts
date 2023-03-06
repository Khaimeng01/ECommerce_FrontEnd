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

const routes: Routes = [
  // {path:'',redirectTo:'/',pathMatch:'full'}
  {path:'',redirectTo:'/homepage',pathMatch:'full'},
  {path:'login',component:LoginComponent},
  {path:'register',component:RegisterComponent},
  {path:'homepage',component:HomepageComponent},
  {path:'productHomepage',component:ProductHomepageComponent},
  {path:'registerProductComponent',component:RegisterProductComponent},
  {path:'productProfilePage/:id',component:ProductProilerPageComponent},
  {path:'checkOutPage',component:CheckOutPageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
