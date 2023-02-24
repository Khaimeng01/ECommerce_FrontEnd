import { Component, OnInit } from '@angular/core';
import {ProductsDetails} from "../../classes/productsDetails";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ProductService} from "../../service/product.service";
import {DomSanitizer} from "@angular/platform-browser";
import {FileHandle} from "../../classes/fileHandle";

@Component({
  selector: 'app-register-product',
  templateUrl: './register-product.component.html',
  styleUrls: ['./register-product.component.css']
})
export class RegisterProductComponent implements OnInit {

  validateForm!: FormGroup;
  product:ProductsDetails={
    product_name:"",
    product_owner:"",
    product_quantity:"",
    product_price:0,
    product_category:"",
    product_description:"",
    productImages:[]
  }

  submitForm(): void {
    console.log("Test_0");
    if (this.validateForm.valid) {
      console.log("Test_1"+this.validateForm.value.productCategory);
      this.product.product_name = this.validateForm.value.productName;
      this.product.product_owner = this.validateForm.value.productOwner;
      this.product.product_quantity = this.validateForm.value.productQuantity;
      this.product.product_price = this.validateForm.value.productPrice;
      this.product.product_category = this.validateForm.value.productCategory;
      this.product.product_description= this.validateForm.value.productDesc;
      const productFormData = this.prepareFormData(this.product)
      this.productService.addProducts(productFormData).subscribe((productFormData)=>
        {console.warn(productFormData)}
      )
    } else {
      Object.values(this.validateForm.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          // control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }

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
      productPrice: [null, [Validators.required]],
      productQuantity: [null, [Validators.required]],
      productCategory: [null, [Validators.required]],
      productDesc: [null, [Validators.required]],
    });
  }

  selectedValue = 'lucy';
  categoriesOption = [
    { label: 'Clothes', value: 'Clothes' },
    { label: 'Electronics', value: 'Electronics' },
    { label: 'Home & Living', value: 'Home & Living' },
    { label: 'Shoes', value: 'Shoes' },
  ];


  onFileSelected(event: any){
    if(event.target.files){
      const file = event.target.files[0];

      const fileHandler:FileHandle = {
        file:file,
        url:this.sanitizer.bypassSecurityTrustUrl(
          window.URL.createObjectURL(file)
        )
      }
      this.product.productImages.push(fileHandler);
    }
  }

}
