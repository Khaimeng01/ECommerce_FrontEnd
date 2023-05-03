// Programmer Name 	: Mr. Lai Khai Meng , TP055753 , APU3F2209CS
// Program Name   	: E_Commerce_Front_END
// Description     	: To allow user to register for a Product

import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {ProductsDetails} from "../../classes/productsDetails";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ProductService} from "../../service/product.service";
import {DomSanitizer, SafeUrl} from "@angular/platform-browser";
import {FileHandle} from "../../classes/fileHandle";
import {NzUploadChangeParam, NzUploadFile, NzUploadXHRArgs} from "ng-zorro-antd/upload";
import {NzMessageService} from "ng-zorro-antd/message";
import {Observable, Subscription} from 'rxjs';
import { of } from 'rxjs';
import {Router} from "@angular/router";
import {Decimal} from "decimal.js";
import {NzImage, NzImagePreviewOptions, NzImageService} from "ng-zorro-antd/image";
import {DataService} from "../../service/data.service";

@Component({
  selector: 'app-register-product',
  templateUrl: './register-product.component.html',
  styleUrls: ['./register-product.component.css']
})
export class RegisterProductComponent implements OnInit {

  registerProductStatus=false;
  price: Decimal = new Decimal(0.001);
  product:ProductsDetails={
    product_name:"",
    product_owner:"",
    product_quantity:0,
    product_price:this.price,
    product_category:"",
    product_description:"",
    productImages:[]
  }
  categoriesOption = [
    { label: 'Clothes', value: 'Clothes' },
    { label: 'Electronics', value: 'Electronics' },
    { label: 'Home & Living', value: 'Home & Living' },
    { label: 'Shoes', value: 'Shoes' },
  ];

  validateForm!: FormGroup;


  private uniqueFiles = new Set<string>();
  private insertedFiles = new Set<string>();
  private numFilesUploaded = 0;

  constructor(private fb: FormBuilder,private productService:ProductService,private sanitizer:DomSanitizer,
              private messageService: NzMessageService,private router: Router,private nzImageService: NzImageService,
              private dataService:DataService,private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.product.product_owner=sessionStorage.getItem('username');
    this.registerProductStatus=false;
    this.validateForm = this.fb.group({
      productName: [null, [Validators.required,this.dataService.noSpaceAtStart()]],
      productPrice: [null, [Validators.required, Validators.pattern(/^\d+(\.\d{1,4})?$/),
        Validators.min(0)]],
      productQuantity: [null, [
        Validators.required,
        Validators.pattern(/^[1-9]\d*$/),
        Validators.min(1)
      ]],
      productCategory: [null, [Validators.required]],
      productDesc: [null, [Validators.required,this.dataService.noSpaceAtStart(),Validators.maxLength(250),]],
    });
  }


  submitForm(): void {
    if (this.validateForm.valid) {
      if(this.numFilesUploaded <= 0){
        this.messageService.error('There is no Images for this Product');
      }else{
        this.product.product_name = this.validateForm.value.productName;
        this.product.product_quantity = this.validateForm.value.productQuantity;
        this.product.product_price = this.validateForm.value.productPrice;
        this.product.product_category = this.validateForm.value.productCategory;
        this.product.product_description= this.validateForm.value.productDesc;
        const productFormData = this.prepareFormData(this.product)
        this.productService.addProducts(productFormData).subscribe((productFormData)=>
          {console.warn(productFormData)}
        )
        this.registerProductStatus=true;
      }
    } else {
      Object.values(this.validateForm.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
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

  onFileSelected({ file, fileList }: NzUploadChangeParam) {
    const status = file.status;
    if (status !== 'uploading') {
      const uniqueKey = `${file.name}_${file.size}`;
      if (!this.uniqueFiles.has(uniqueKey)) {
        const fileHandler: FileHandle = {
          file: new File(
            [file.originFileObj as Blob],
            file.name,
            {type: file.type}
          ),
          url: this.sanitizer.bypassSecurityTrustUrl(
            window.URL.createObjectURL(
              file.originFileObj instanceof Blob ? file.originFileObj : new Blob([file.originFileObj ?? ''])
            )
          )
        };
        this.product.productImages.push(fileHandler)
        this.uniqueFiles.add(uniqueKey);
      }

    }

  }

  deleteImage(i: number) {

    const file = this.product.productImages[i].file;
    const uniqueKey = `${file.name}_${file.size}`;

    this.uniqueFiles.delete(uniqueKey);
    this.product.productImages.splice(i, 1);
    this.numFilesUploaded = (this.numFilesUploaded-1);
    this.cdr.detectChanges();
  }



  beforeUpload = (file: NzUploadFile): boolean => {
    const allowedExtensions = ['jpg', 'jpeg', 'png'];
    const extension = file.name?.split('.').pop()?.toLowerCase();
    const isAllowedExtension = extension ? allowedExtensions.includes(extension) : false;
    const uniqueKey = `${file.name}_${file.size}`;

    if (!isAllowedExtension) {
        this.messageService.error('Only JPEG and PNG files are allowed.');
        return false;
      } else if (this.uniqueFiles.has(uniqueKey)) {
          this.messageService.error('The image has already been uploaded.');
          return false;
      } else if (this.numFilesUploaded >= 4) {
          this.messageService.error('Only a maximum of 4 files can be uploaded.');
          return false;
      } else {
          this.numFilesUploaded++;
          return true;
      }
  }


  redirectToProductTable() {
    this.router.navigate(['sellerLayout/sellerProductTableView']);
  }


  redirectToRegisterProduct() {
    this.router.navigateByUrl('/dummy-route', { skipLocationChange: true }).then(() => {
      this.router.navigate(['/sellerLayout/registerProductComponent']);
    });
  }


}
