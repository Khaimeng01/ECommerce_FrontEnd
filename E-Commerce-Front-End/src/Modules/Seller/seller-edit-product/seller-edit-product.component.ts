import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {ProductService} from "../../../service/product.service";
import {map} from "rxjs";
import {ProductsDetails, ProductsDetails2} from "../../../classes/productsDetails";
import {imageProcessingService} from "../../../service/imageProcessingService";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {FileHandle} from "../../../classes/fileHandle";
import {DomSanitizer} from "@angular/platform-browser";
import {NzUploadFile} from "ng-zorro-antd/upload";
import {NzMessageService} from "ng-zorro-antd/message";

@Component({
  selector: 'app-seller-edit-product',
  templateUrl: './seller-edit-product.component.html',
  styleUrls: ['./seller-edit-product.component.css']
})
export class SellerEditProductComponent implements OnInit {

  productId!:string;
  product!:ProductsDetails2[]
  test!:any[];
  validateForm!: FormGroup;
  editedProduct:ProductsDetails={
    product_name:"",
    product_owner:"",
    product_quantity:0,
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


  constructor(private route: ActivatedRoute,
              private productService:ProductService,
              private imageProcessingService:imageProcessingService,
              private fb: FormBuilder,
              private sanitizer:DomSanitizer,
              private messageService: NzMessageService,
              private router: Router) { }


  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      const productId = params['productId'];
      this.productId = params['productId'];
      console.log(productId); // Output: 123
    });
    this.productService.getSpecifcProduct(BigInt(this.productId))
      .pipe(
        map((x:ProductsDetails2[],i)=> x.map((product:ProductsDetails2)=> this.imageProcessingService.createImages(product))))
      .subscribe((response:ProductsDetails2[])=>
        {
          console.log(response)
          this.product= response;
          this.test=response;
          this.editedProduct=this.product[0];
          this.validateForm.patchValue({
            productName:this.editedProduct.product_name,
            productPrice:this.editedProduct.product_price,
            productQuantity:this.editedProduct.product_quantity,
            productCategory:this.editedProduct.product_category,
            productDesc:this.editedProduct.product_description
          })

        }
      )
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
      if(this.numFilesUploaded == 0){
        this.messageService.error('There is no Images for this Product');
      }else{
        console.log("Test_1"+this.validateForm.value.productCategory);
        console.log("Test_2");
        this.editedProduct.product_name = this.validateForm.value.productName;
        this.editedProduct.product_quantity = this.validateForm.value.productQuantity;
        this.editedProduct.product_price = this.validateForm.value.productPrice;
        this.editedProduct.product_category = this.validateForm.value.productCategory;
        this.editedProduct.product_description= this.validateForm.value.productDesc;
        const productFormData = this.prepareFormData(this.editedProduct)
        // Change to Edit
        console.log("EDITING");
        let idProduct = BigInt(this.productId);
        this.productService.editProduct(productFormData,idProduct).subscribe((productFormData)=>
          {console.warn(productFormData)}
        );
      }
      // addProducts(productFormData).subscribe((productFormData)=>
      //   {console.warn(productFormData)}
      // )
      // this.registerProductStatus=true;
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

  private uniqueFiles = new Set<string>();

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
            this.editedProduct.productImages.push(fileHandler);
          }
        }
      }
    }
  }

  private numFilesUploaded = 0;

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

  deleteImage(i:number) {
    this.editedProduct.productImages.splice(i,1);
    this.numFilesUploaded--;
  }

  onBack() {
    this.router.navigate(['sellerLayout/sellerProductTableView'])
  }
}
