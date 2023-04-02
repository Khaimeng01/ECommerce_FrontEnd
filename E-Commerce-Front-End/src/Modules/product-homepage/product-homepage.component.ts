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
  categoriesOption = [
    { label: 'Clothes', value: 'Clothes' },
    { label: 'Electronics', value: 'Electronics' },
    { label: 'Home & Living', value: 'Home & Living' },
    { label: 'Shoes', value: 'Shoes' },
  ];

  selectedPriceOption = '';
  priceOption = [
    { label: 'Price: Low to High', value: 'ASCENDING' },
    { label: 'Price: High to Low', value: 'DESCENDING' },
  ];

  categoriesParam!:any;

  constructor(private productService:ProductService,
              private imageProcessingService:imageProcessingService,
              private router:Router,
              private fb: FormBuilder,
              private activateRoute:ActivatedRoute) { }

  ngOnInit():void{
    this.activateRoute.paramMap.subscribe(paramMap => {
      // Get the category parameter from the URL
      this.categoriesParam = paramMap.get('category');

      // Call a function to update the component data or state
      this.updateComponent();
    });
    // await this.obtainCategoriesParam();
    // if(this.categoriesParam==null){
    //   console.log("Inside");
    //   this.productService.getProducts()
    //     .pipe(
    //       map((x:ProductsDetails2[],i)=> x.map((product:ProductsDetails2)=> this.imageProcessingService.createImages(product))))
    //     .subscribe((response:ProductsDetails2[])=>
    //       {
    //         console.log(response)
    //         this.product= response;
    //       }
    //     )
    // }else{
    //   this.selectedCategoriesOption=this.categoriesParam;
    //   this.filterTable();
    // }
  }

  private updateComponent() {
    if (this.categoriesParam == null) {
      this.productService.getProducts()
        .pipe(
          map((x: ProductsDetails2[]) => x.map((product: ProductsDetails2) => this.imageProcessingService.createImages(product)))
        )
        .subscribe((response: ProductsDetails2[]) => {
          this.product = response;
          console.log(response);
        });
    } else {
      this.selectedCategoriesOption = this.categoriesParam;
      this.filterTable();
    }
  }


  productProfilePage(product_ID: bigint){
    console.log(product_ID);
    this.router.navigate(['/productProfilePage'])
    // this.router.navigate('/123', { state: { product_ID: product_ID } });
  }

  filterTable() {
    console.log(this.selectedPriceOption);
    console.log(this.selectedCategoriesOption);
    this.productService.filterProductTable(this.selectedCategoriesOption,this.selectedPriceOption)
      .pipe(
        map((x:ProductsDetails2[],i)=> x.map((product:ProductsDetails2)=> this.imageProcessingService.createImages(product))))
      .subscribe(
      (response:ProductsDetails2[])=>
      {
        console.log(response)
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
          console.log(response)
          this.product= response;
        }
      )
  }

  // redirectToRegister() {
  //   if(this.switchValue==0){
  //     this.router.navigate(['register']);
  //   }else{
  //     this.router.navigate(['sellerRegisterAccount']);
  //   }
  // }
}
