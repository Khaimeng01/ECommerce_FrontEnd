import { Component, OnInit } from '@angular/core';
import {ProductService} from "../../service/product.service";
import {ProductsDetails, ProductsDetails2} from "../../classes/productsDetails";
import {map} from "rxjs";
import {imageProcessingService} from "../../service/imageProcessingService";
import {Router} from "@angular/router";

@Component({
  selector: 'app-product-homepage',
  templateUrl: './product-homepage.component.html',
  styleUrls: ['./product-homepage.component.css']
})
export class ProductHomepageComponent implements OnInit {

  product!:ProductsDetails2[]
  test!:any[];

  constructor(private productService:ProductService,
              private imageProcessingService:imageProcessingService,
              private router:Router) { }

  ngOnInit(): void {
    this.productService.getProducts()
      .pipe(
        map((x:ProductsDetails2[],i)=> x.map((product:ProductsDetails2)=> this.imageProcessingService.createImages(product))))
      .subscribe((response:ProductsDetails2[])=>
      {
        console.log(response)
        this.product= response;
        this.test=response;

      }
    )
  }

  selectedValue = 'lucy';
  categoriesOption = [
    { label: 'Clothes', value: 'Clothes' },
    { label: 'Electronics', value: 'Electronics' },
    { label: 'Home & Living', value: 'Home & Living' },
    { label: 'Shoes', value: 'Shoes' },
  ];

  priceOption = [
    { label: 'Price: Low to High', value: 'Price: Low to High' },
    { label: 'Price: High to Low', value: 'Price: High to Low' },
  ];

  productProfilePage(product_ID: bigint){
    console.log(product_ID);
    this.router.navigate(['/productProfilePage'])
    // this.router.navigate('/123', { state: { product_ID: product_ID } });
  }

}
