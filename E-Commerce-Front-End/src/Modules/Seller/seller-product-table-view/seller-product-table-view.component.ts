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
  listOfSelection = [
    {
      text: 'Select All Row',
      onSelect: () => {
        this.onAllChecked(true);
      }
    },
    {
      text: 'Select Odd Row',
      onSelect: () => {
        this.listOfCurrentPageData.forEach((data, index) => this.updateCheckedSet(data.id, index % 2 !== 0));
        this.refreshCheckedStatus();
      }
    },
    {
      text: 'Select Even Row',
      onSelect: () => {
        this.listOfCurrentPageData.forEach((data, index) => this.updateCheckedSet(data.id, index % 2 === 0));
        this.refreshCheckedStatus();
      }
    }
  ];
  checked = false;
  indeterminate = false;
  listOfCurrentPageData: readonly ItemData[] = [];
  listOfData: readonly ItemData[] = [];
  setOfCheckedId = new Set<number>();

  //Mine
  username: string =""
  product!:ProductsDetails2[];

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

  printer(){
    console.log(this.setOfCheckedId);
  }

  onAllChecked(value: boolean): void {
    this.listOfCurrentPageData.forEach(item => this.updateCheckedSet(item.id, value));
    this.refreshCheckedStatus();
  }

  onCurrentPageDataChange($event: readonly ProductsDetails[]): void {
    // this.listOfCurrentPageData = $event;
    this.refreshCheckedStatus();
  }

  refreshCheckedStatus(): void {
    this.checked = this.listOfCurrentPageData.every(item => this.setOfCheckedId.has(item.id));
    this.indeterminate = this.listOfCurrentPageData.some(item => this.setOfCheckedId.has(item.id)) && !this.checked;
  }

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

  // deleteSelectedProduct(i:number){
  //   console.log(i)
  //   let selectedProduct_Id = this.product[i].id_product;
  //   this.productService.deleteProduct(selectedProduct_Id).subscribe((
  //     response:any)=>{
  //       console.log(response);
  //     }
  //   );
  //   // this.productService.getSpecificProductFromSeller(this.username).subscribe(
  //   //   (response:ProductsDetails2[])=>{
  //   //     console.log("DYLAN"+response);
  //   //     this.product= response;
  //   //     console.log("DYLAN"+this.product);
  //   //     console.log("DYLAN"+this.product[0]);
  //   //     console.log(this.product[0].product_category);
  //   //   }
  //   // )
  //   // location.reload();
  // }

  deleteSelectedProduct(i: bigint){
    let selectedProduct_Id = i;
    this.productService.deleteProduct(selectedProduct_Id).subscribe(
      (response:any)=>{
        console.log("RESPONSE IS HERE"+response);
        if(response="Success"){
          this.productService.getSpecificProductFromSeller(this.username).subscribe(
            (response:ProductsDetails2[])=>{
              console.log("DYLAN"+response);
              this.product= response;
              console.log("DYLAN"+this.product);
              console.log("DYLAN"+this.product[0]);
              console.log(this.product[0].product_category);
            }
          )
        }
      }
    )
  }

  constructor(private productService:ProductService,private router: Router) {}

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
    // {
    //   title: 'Action',
    //   compare: (a: ProductsDetails2, b: ProductsDetails2) => a.product_quantity - b.product_quantity,
    //   priority: 4
    // }

  ];


  redirectToEdit(i: bigint) {
    console.log(i);
    // const number =
    // console.log(number);
    let productId = Number(i);
    this.router.navigate(['sellerLayout/sellerEditProduct'],
      { queryParams: { productId: productId }});
  }
}
