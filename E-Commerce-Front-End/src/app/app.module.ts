import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { en_US } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from '../Modules/login/login.component';
import {NzLayoutModule} from "ng-zorro-antd/layout";
import {NzGridModule} from "ng-zorro-antd/grid";
import {NzInputModule} from "ng-zorro-antd/input";
import {NzButtonModule} from "ng-zorro-antd/button";
import {DataService} from "../service/data.service";
import { RegisterComponent } from '../Modules/register/register.component';
import {NzFormModule} from "ng-zorro-antd/form";
import {NzSelectModule} from "ng-zorro-antd/select";
import {NzCheckboxModule} from "ng-zorro-antd/checkbox";
import { HomepageComponent } from '../Modules/homepage/homepage.component';
import {NzCardModule} from "ng-zorro-antd/card";
import { ProductBoxComponent } from '../Modules/homepage/product-box/product-box.component';
import { ProductHomepageComponent } from '../Modules/product-homepage/product-homepage.component';
import {NzCarouselModule} from "ng-zorro-antd/carousel";
import { RegisterProductComponent } from '../Modules/register-product/register-product.component';
import {NzDividerModule} from "ng-zorro-antd/divider";
import {NzSwitchModule} from "ng-zorro-antd/switch";
import {NzRadioModule} from "ng-zorro-antd/radio";
import { ProductProilerPageComponent } from '../Modules/product-proiler-page/product-proiler-page.component';
import {NzPageHeaderModule} from "ng-zorro-antd/page-header";
import { CheckOutPageComponent } from '../Modules/check-out-page/check-out-page.component';
import {NzSegmentedModule} from "ng-zorro-antd/segmented";
import {NzTableModule} from "ng-zorro-antd/table";
import { HeaderComponent } from '../Modules/header&footer/header/header.component';
import { FooterComponent } from '../Modules/header&footer/footer/footer.component';
import {NzBreadCrumbModule} from "ng-zorro-antd/breadcrumb";
import {NzMenuModule} from "ng-zorro-antd/menu";
import {NzIconModule} from "ng-zorro-antd/icon";
import { ProfileManagementLayoutComponent } from '../Modules/profile-management-layout/profile-management-layout.component';
import { ProfileAccountManagementComponent } from '../Modules/profile/profile-account-management/profile-account-management.component';
import { ProfilePastOrderHistoryComponent } from '../Modules/profile-past-order-history/profile-past-order-history.component';
import {NzDropDownModule} from "ng-zorro-antd/dropdown";
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzMessageModule } from 'ng-zorro-antd/message';
import { SellerLayoutComponent } from '../Modules/Seller/layout/seller-layout/seller-layout.component';
import { SellerHomepageComponent } from '../Modules/Seller/seller-homepage/seller-homepage.component';
import {NzStatisticModule} from "ng-zorro-antd/statistic";
import {NzUploadModule} from "ng-zorro-antd/upload";
import { SellerProductTableViewComponent } from '../Modules/Seller/seller-product-table-view/seller-product-table-view.component';
import {NzPopconfirmModule} from "ng-zorro-antd/popconfirm";
import {NzResultModule} from "ng-zorro-antd/result";
import { SellerOrderHistoryComponent } from '../Modules/Seller/seller-order-history/seller-order-history.component';
import { SellerEditProductComponent } from '../Modules/Seller/seller-edit-product/seller-edit-product.component';
import { SellerRegisterAccountComponent } from '../Modules/Seller/seller-register-account/seller-register-account.component';
import {NzCalendarModule} from "ng-zorro-antd/calendar";
import {NzAlertModule} from "ng-zorro-antd/alert";
import {LazyLoadImageModule} from 'ng-lazyload-image'


registerLocaleData(en);

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomepageComponent,
    ProductBoxComponent,
    ProductHomepageComponent,
    RegisterProductComponent,
    ProductProilerPageComponent,
    CheckOutPageComponent,
    HeaderComponent,
    FooterComponent,
    ProfileManagementLayoutComponent,
    ProfileAccountManagementComponent,
    ProfilePastOrderHistoryComponent,
    SellerLayoutComponent,
    SellerHomepageComponent,
    SellerProductTableViewComponent,
    SellerOrderHistoryComponent,
    SellerEditProductComponent,
    SellerRegisterAccountComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NzLayoutModule,
    NzGridModule,
    NzInputModule,
    ReactiveFormsModule,
    NzButtonModule,
    NzFormModule,
    NzSelectModule,
    NzCheckboxModule,
    NzCardModule,
    NzCarouselModule,
    NzDividerModule,
    NzSwitchModule,
    NzRadioModule,
    NzPageHeaderModule,
    NzSegmentedModule,
    NzTableModule,
    NzBreadCrumbModule,
    NzMenuModule,
    NzIconModule,
    NzDropDownModule,
    NzMessageModule,
    NzStatisticModule,
    NzUploadModule,
    NzPopconfirmModule,
    NzResultModule,
    NzCalendarModule,
    NzAlertModule,
    LazyLoadImageModule
  ],
  providers: [{ provide: NZ_I18N, useValue: en_US },DataService,NzMessageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
