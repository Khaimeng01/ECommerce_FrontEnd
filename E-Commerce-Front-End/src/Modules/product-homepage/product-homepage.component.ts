// Programmer Name 	: Mr. Lai Khai Meng , TP055753 , APU3F2209CS
// Program Name   	: E_Commerce_Front_END
// Description     	: To show user the table filled with products

import { Component, OnInit } from '@angular/core';
import {ProductService} from "../../service/product.service";
import {ProductsDetails, ProductsDetails2} from "../../classes/productsDetails";
import {map} from "rxjs";
import {imageProcessingService} from "../../service/imageProcessingService";
import {ActivatedRoute, Router} from "@angular/router";
import {TransactionService} from "../../service/transaction.service";
import {FormBuilder, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-product-homepage',
  templateUrl: './product-homepage.component.html',
  styleUrls: ['./product-homepage.component.css']
})
export class ProductHomepageComponent implements OnInit {

  product!:ProductsDetails2[]
  validateForm!: FormGroup;
  selectedCategoriesOption = '';
  categoriesParam!:any;
  selectedPriceOption = '';

  categoriesOption = [
    { label: 'Clothes', value: 'Clothes' },
    { label: 'Electronics', value: 'Electronics' },
    { label: 'Home & Living', value: 'Home & Living' },
    { label: 'Shoes', value: 'Shoes' },
  ];
  priceOption = [
    { label: 'Price: Low to High', value: 'ASCENDING' },
    { label: 'Price: High to Low', value: 'DESCENDING' },
  ];



  constructor(private productService:ProductService,
              private imageProcessingService:imageProcessingService,
              private router:Router,
              private fb: FormBuilder,
              private activateRoute:ActivatedRoute) { }

  ngOnInit():void{
    this.activateRoute.paramMap.subscribe(paramMap => {
      this.categoriesParam = paramMap.get('category');
      this.updateComponent();
    });
  }

  private updateComponent() {
    if (this.categoriesParam == null) {
      this.productService.getProducts()
        .pipe(
          map((x: ProductsDetails2[]) => x.map((product: ProductsDetails2) => this.imageProcessingService.createImages(product)))
        )
        .subscribe((response: ProductsDetails2[]) => {
          this.product = response;
        });
    } else {
      this.selectedCategoriesOption = this.categoriesParam;
      this.filterTable();
    }
  }


  productProfilePage(product_ID: bigint){
    this.router.navigate(['/productProfilePage'])
  }

  filterTable() {
    this.productService.filterProductTable(this.selectedCategoriesOption,this.selectedPriceOption)
      .pipe(
        map((x:ProductsDetails2[],i)=> x.map((product:ProductsDetails2)=> this.imageProcessingService.createImages(product))))
      .subscribe(
      (response:ProductsDetails2[])=>
      {
        this.product= response;
      }
    )
  }

  resetFilter() {
    this.selectedPriceOption=""
    this.selectedCategoriesOption=""
    this.productService.getProducts()
      .pipe(
        map((x:ProductsDetails2[],i)=> x.map((product:ProductsDetails2)=> this.imageProcessingService.createImages(product))))
      .subscribe((response:ProductsDetails2[])=>
        {
          this.product= response;
        }
      )
  }

}
