// Programmer Name 	: Mr. Lai Khai Meng , TP055753 , APU3F2209CS
// Program Name   	: E_Commerce_Front_END
// Description     	: To allow sellers to view the registered product under their account

import { Component, OnInit } from '@angular/core';
import {FormBuilder} from "@angular/forms";
import {ProductService} from "../../../service/product.service";
import {DomSanitizer} from "@angular/platform-browser";
import {NzMessageService} from "ng-zorro-antd/message";
import {ProductsDetails, ProductsDetails2} from "../../../classes/productsDetails";
import {concatMap} from "rxjs";
import {HttpErrorResponse} from "@angular/common/http";
import {Router} from "@angular/router";
import Decimal from 'decimal.js';
interface ItemData {
  id: number;
  name: string;
  age: number;
  address: string;
}

@Component({
  selector: 'app-seller-product-table-view',
  templateUrl: './seller-product-table-view.component.html',
  styleUrls: ['./seller-product-table-view.component.css']
})
export class SellerProductTableViewComponent implements OnInit {
  checked = false;
  indeterminate = false;
  listOfCurrentPageData: readonly ItemData[] = [];
  listOfData: readonly ItemData[] = [];
  setOfCheckedId = new Set<number>();
  username: string =""
  product!:ProductsDetails2[];

  listOfColumn = [
    {
      title: 'Product ID',
      compare: (a:ProductsDetails2 , b: ProductsDetails2) => Number(a.id_product) - Number(b.id_product),
      priority: false
    },
    {
      title: 'ProductName',
      compare: (a:ProductsDetails2 , b: ProductsDetails2) => a.product_name.localeCompare(b.product_name),
      priority: false
    },
    {
      title: 'Product Category',
      compare: (a: ProductsDetails2, b: ProductsDetails2) => a.product_category.localeCompare(b.product_category),
      priority: 1
    },
    {
      title: 'Product Price',
      compare: (a: ProductsDetails2, b: ProductsDetails2) => new Decimal(a.product_price).cmp(new Decimal(b.product_price)),
      priority: 2
    },
    {
      title: 'Product Quantity',
      compare: (a: ProductsDetails2, b: ProductsDetails2) => a.product_quantity - b.product_quantity,
      priority: 3
    },
  ];

  constructor(private productService:ProductService,private router: Router) {}

  ngOnInit(): void {
    this.username = sessionStorage.getItem('username') || '';
    this.productService.getSpecificProductFromSeller(this.username).subscribe(
      (response:ProductsDetails2[])=>{
        this.product= response;
        console.log(this.product);
        console.log(this.product[0].product_category);
      }
    )
    this.listOfData = new Array(200).fill(0).map((_, index) => ({
      id: index,
      name: `Edward King ${index}`,
      age: 32,
      address: `London, Park Lane no. ${index}`
    }));
  }

  updateCheckedSet(id: number, checked: boolean): void {
    if (checked) {
      this.setOfCheckedId.add(id);
    } else {
      this.setOfCheckedId.delete(id);
    }
  }

  onItemChecked(id: number, checked: boolean): void {
    this.updateCheckedSet(id, checked);
    this.refreshCheckedStatus();
  }



  onAllChecked(value: boolean): void {
    this.listOfCurrentPageData.forEach(item => this.updateCheckedSet(item.id, value));
    this.refreshCheckedStatus();
  }

  onCurrentPageDataChange($event: readonly ProductsDetails[]): void {
    this.refreshCheckedStatus();
  }

  refreshCheckedStatus(): void {
    this.checked = this.listOfCurrentPageData.every(item => this.setOfCheckedId.has(item.id));
    this.indeterminate = this.listOfCurrentPageData.some(item => this.setOfCheckedId.has(item.id)) && !this.checked;
  }




  deleteSelectedProduct(i: bigint){
    let selectedProduct_Id = i;
    this.productService.deleteProduct(selectedProduct_Id).subscribe((response:any)=>{
        if(response="Success"){
          this.productService.getSpecificProductFromSeller(this.username).subscribe(
            (response:ProductsDetails2[])=>{
              this.product= response;
            }
          )
        }
      }
    )
  }

  redirectToEdit(i: bigint) {
    let productId = Number(i);
    this.router.navigate(['sellerLayout/sellerEditProduct'],
      { queryParams: { productId: productId }});
  }
}
