import { Component, OnInit } from '@angular/core';
import {ProductsDetails} from "../../classes/productsDetails";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ProductService} from "../../service/product.service";
import {DomSanitizer} from "@angular/platform-browser";
import {FileHandle} from "../../classes/fileHandle";
import {NzUploadFile, NzUploadXHRArgs} from "ng-zorro-antd/upload";
import {NzMessageService} from "ng-zorro-antd/message";
import {Observable, Subscription} from 'rxjs';
import { of } from 'rxjs';

@Component({
  selector: 'app-register-product',
  templateUrl: './register-product.component.html',
  styleUrls: ['./register-product.component.css']
})
export class RegisterProductComponent implements OnInit {

  registerProductStatus=false;

  product:ProductsDetails={
    product_name:"",
    product_owner:"",
    product_quantity:"",
    product_price:0,
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

  fileList: NzUploadFile[] = [];

  private uniqueFiles = new Set<string>();
  acceptedFileTypes: string = 'image/jpeg,image/png';
  private numFilesUploaded = 0;

  constructor(private fb: FormBuilder,private productService:ProductService,private sanitizer:DomSanitizer,private messageService: NzMessageService) {}

  ngOnInit(): void {
    this.product.product_owner=sessionStorage.getItem('username');
    this.registerProductStatus=false;
    this.validateForm = this.fb.group({
      productName: [null, [Validators.required]],
      productPrice: [null, [Validators.required]],
      productQuantity: [null, [Validators.required]],
      productCategory: [null, [Validators.required]],
      productDesc: [null, [Validators.required]],
    });
  }


  submitForm(): void {
    console.log("Test_0");
    if (this.validateForm.valid) {
      console.log("Test_1"+this.validateForm.value.productCategory);
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


  customRequestHandler = (args: NzUploadXHRArgs): Subscription => {
    const file = args.file;

    // Check if the file type is JPEG or PNG
    if (file.type === 'image/jpeg' || file.type === 'image/png') {
      // Process the file here
      // If you need to upload the file, you can use args.action (URL), args.headers (headers), and args.file (file) properties

      // Since we are not uploading the file in this example, we need to manually trigger the onSuccess callback
      if (args.onSuccess) {
        args.onSuccess({}, args.file, new ProgressEvent(''));
      }
    } else {
      // Show an error message using NzMessageService
      this.messageService.error('Only JPEG and PNG files are allowed.');

      // Trigger the onError callback
      if (args.onError) {
        args.onError(new Error('Unsupported file type'), args.file);
      }
    }

    // Return an empty Subscription object
    return new Subscription();
  };

  onFileSelected(event: any) {
    // Check if the event has a 'fileList' property
    if (event && event.fileList) {
      // Iterate through the fileList
      for (const fileItem of event.fileList) {
        // Check if the fileItem has the 'originFileObj' property
        if (fileItem.originFileObj) {
          // Get the original file from the fileItem
          const file = fileItem.originFileObj;

          // Create a unique key based on the file's name and lastModified property
          const uniqueKey = `${file.name}_${file.lastModified}`;

          // Check if the uniqueFiles Set already contains the uniqueKey
          if (!this.uniqueFiles.has(uniqueKey)) {
            // Add the uniqueKey to the uniqueFiles Set
            this.uniqueFiles.add(uniqueKey);

            // Create a FileHandle object
            const fileHandler: FileHandle = {
              file: file,
              url: this.sanitizer.bypassSecurityTrustUrl(
                window.URL.createObjectURL(file)
              )
            };

            // Push the FileHandle object into the product.productImages array
            this.product.productImages.push(fileHandler);
          }
        }
      }
    }
  }

  deleteImage(i:number) {
    this.product.productImages.splice(i,1);
    this.numFilesUploaded--;
  }

  beforeUpload = (file: NzUploadFile): boolean => {
    const allowedExtensions = ['jpg', 'jpeg', 'png'];
    const extension = file.name?.split('.').pop()?.toLowerCase();
    const isAllowedExtension = extension ? allowedExtensions.includes(extension) : false;

    if (!isAllowedExtension) {
      // Display an error message to the user
      this.messageService.error('Only JPEG and PNG files are allowed.');
      return false;
    } else if (this.numFilesUploaded >= 4) {
      // Display an error message to the user
      this.messageService.error('Only a maximum of 4 files can be uploaded.');
      return false;
    } else {
      this.numFilesUploaded++;
      return true;
    }
  }

  // beforeUpload = (file: NzUploadFile): boolean => {
  //   const allowedExtensions = ['jpg', 'jpeg', 'png'];
  //   const extension = file.name?.split('.').pop()?.toLowerCase();
  //   const isAllowedExtension = extension ? allowedExtensions.includes(extension) : false;
  //   if (!isAllowedExtension) {
  //     // Display an error message to the user
  //     this.messageService.error('Only JPEG and PNG files are allowed.');
  //   }
  //   return isAllowedExtension;
  // }


}
