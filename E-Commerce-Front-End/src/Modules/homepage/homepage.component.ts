import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {DataService} from "../../service/data.service";
import {loginCustomer} from "../../classes/loginCustomer";
import {ProductsDetails} from "../../classes/productsDetails";
import {ProductService} from "../../service/product.service";
import {FileHandle} from "../../classes/fileHandle";
import {DomSanitizer} from "@angular/platform-browser";

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {

  // constructor() { }

  // ngOnInit(): void {
  // }

  validateForm!: FormGroup;

  test29!:ProductsDetails[];



  prepareFormData(product:ProductsDetails):FormData{
    const formData = new FormData();
    formData.append('product',new Blob([JSON.stringify(product)],{type:'application/json'}));

    for(var i =0;i<product.productImages.length;i++){
      formData.append('imageFile',product.productImages[i].file,product.productImages[i].file.name);
    }

    return formData;
  }

  constructor(private fb: FormBuilder,private productService:ProductService,private sanitizer:DomSanitizer) {}

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      productName: [null, [Validators.required]],
      productOwner: [null, [Validators.required]],
      productQuantity: [null, [Validators.required]],
    });
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

  array = [1, 2, 3, 4];



}
