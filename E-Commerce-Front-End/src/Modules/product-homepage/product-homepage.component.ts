import { Component, OnInit } from '@angular/core';
import {ProductService} from "../../service/product.service";
import {ProductsDetails} from "../../classes/productsDetails";
import {map} from "rxjs";
import {imageProcessingService} from "../../service/imageProcessingService";

@Component({
  selector: 'app-product-homepage',
  templateUrl: './product-homepage.component.html',
  styleUrls: ['./product-homepage.component.css']
})
export class ProductHomepageComponent implements OnInit {

  product!:ProductsDetails[]

  constructor(private productService:ProductService,private imageProcessingService:imageProcessingService) { }

  ngOnInit(): void {
    this.productService.getProducts()
      .pipe(
        map((x:ProductsDetails[],i)=> x.map((product:ProductsDetails)=> this.imageProcessingService.createImages(product))))
      .subscribe((response:ProductsDetails[])=>
      {
        this.product= response;
        console.log(this.product);
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

}
