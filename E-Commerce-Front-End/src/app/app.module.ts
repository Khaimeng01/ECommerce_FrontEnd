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
  ],
  providers: [{ provide: NZ_I18N, useValue: en_US },DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
