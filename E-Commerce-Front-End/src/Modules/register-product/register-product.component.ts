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

  // fileList: NzUploadFile[] = [];

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
    console.log("Test_0");
    if (this.validateForm.valid) {
      console.log("Test_0 I MADE IT");
      console.log(this.numFilesUploaded);
      if(this.numFilesUploaded <= 0){
        this.messageService.error('There is no Images for this Product');
      }else{
        console.log("Test_1 I MADE IT");
        this.product.product_name = this.validateForm.value.productName;
        this.product.product_quantity = this.validateForm.value.productQuantity;
        this.product.product_price = this.validateForm.value.productPrice;
        this.product.product_category = this.validateForm.value.productCategory;
        this.product.product_description= this.validateForm.value.productDesc;
        const productFormData = this.prepareFormData(this.product)
        // this.productService.addProducts(productFormData).subscribe((productFormData)=>
        //   {console.warn(productFormData)}
        // )
        // this.registerProductStatus=true;
      }
    } else {
      console.log("Failure");
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
      console.log(file, fileList);
      const uniqueKey = `${file.name}_${file.size}`;
      if (!this.uniqueFiles.has(uniqueKey)) {
        const fileHandler: FileHandle = {
          file: new File(
            [file.originFileObj as Blob],
            file.name,
            { type: file.type }
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
    if (status === 'done') {
      console.log(`${file.name} file uploaded successfully.`);
    } else if (status === 'error') {
      console.log(`${file.name} file upload failed.`);
    }

    // Check if the event has a 'fileList' property
    // const target = event.target as HTMLInputElement;
    // const file: File = (target.files as FileList)[0];
    // console.log('Event data:', event);
    // const status = file.status;
    // if (status === 'done') {
    //   console.log('Done');
    //   const file = fileList[0];
    //   console.log('Files:', file);
    // }

    // let files: any = event.target.files[0];

    // if (event && event.target && event.target.files) {
    //   console.log('Enter');
    //   const file = event.target.files;
    //
    //
    //     // Check if the fileItem has the 'originFileObj' property
    //
    //       // Get the original file from the fileItem
    //
    //
    //       console.log('Before Unique Files:', this.uniqueFiles);
    //
    //
    //       // Create a unique key based on the file's name and lastModified property
    //       const uniqueKey = `${file.name}_${file.size}`;
    //
    //         if (!this.uniqueFiles.has(uniqueKey)) {
    //           // Add the uniqueKey to the uniqueFiles Set
    //           this.uniqueFiles.add(uniqueKey);
    //           console.log('After Unique Files:', this.uniqueFiles);
    //
    //           // Create a FileHandle object
    //           const fileHandler: FileHandle = {
    //             file: file,
    //             url: this.sanitizer.bypassSecurityTrustUrl(
    //               window.URL.createObjectURL(file)
    //             )
    //           };
    //
    //           console.log('Before splice:', this.product.productImages.length);
    //           // Push the FileHandle object into the product.productImages array
    //           this.product.productImages.push(fileHandler)
    //           console.log('After splice:', this.product.productImages.length);
    //           this.insertedFiles.add(uniqueKey);
    //         }else{
    //           console.log('Fail');
    //         }
    // }else{
    //   console.log("Soorya");
    // }
  }

  // onFileSelected(event: any) {
  //   // Check if the event has a 'fileList' property
  //   console.log('Event data:', event);
  //   if (event && event.fileList) {
  //     // Iterate through the fileList
  //
  //     for (const fileItem of event.fileList) {
  //       // Check if the fileItem has the 'originFileObj' property
  //       if (fileItem.originFileObj) {
  //         // Get the original file from the fileItem
  //         const file = fileItem.originFileObj;
  //
  //         console.log('Before Unique Files:', this.uniqueFiles);
  //
  //
  //         // Create a unique key based on the file's name and lastModified property
  //         const uniqueKey = `${file.name}_${file.size}`;
  //
  //         // this.insertedFiles.clear()
  //         // for(const fileKey of this.insertedFiles){
  //         //   for(const fileKey2 of this.uniqueFiles){
  //         //     if(fileKey2 == uniqueKey){
  //         //       this.insertedFiles.add(fileKey2);
  //         //     }
  //         //   }
  //         // }
  //
  //         // Check if the uniqueFiles Set already contains the uniqueKey
  //         if(!this.insertedFiles.has(uniqueKey)){
  //           if (!this.uniqueFiles.has(uniqueKey)) {
  //             // Add the uniqueKey to the uniqueFiles Set
  //             this.uniqueFiles.add(uniqueKey);
  //             console.log('After Unique Files:', this.uniqueFiles);
  //
  //             // Create a FileHandle object
  //             const fileHandler: FileHandle = {
  //               file: file,
  //               url: this.sanitizer.bypassSecurityTrustUrl(
  //                 window.URL.createObjectURL(file)
  //               )
  //             };
  //
  //             console.log('Before splice:', this.product.productImages.length);
  //             // Push the FileHandle object into the product.productImages array
  //             this.product.productImages.push(fileHandler)
  //             console.log('After splice:', this.product.productImages.length);
  //             this.insertedFiles.add(uniqueKey);
  //           }else{
  //             console.log('Fail');
  //           }
  //         }else{
  //           console.log('Before Unique Files:', this.uniqueFiles);
  //           if (!this.uniqueFiles.has(uniqueKey)) {
  //             console.log('Sucess');
  //             this.uniqueFiles.add(uniqueKey);
  //             console.log('After Unique Files:', this.uniqueFiles);
  //           }else{
  //             console.log('Fail2');
  //           }
  //         }
  //
  //       }
  //     }
  //   }
  // }











  // onFileSelected(event: any) {
  //   // Check if the event has a 'fileList' property
  //   if (event && event.fileList) {
  //     // Iterate through the fileList
  //     for (const fileItem of event.fileList) {
  //       // Check if the fileItem has the 'originFileObj' property
  //       if (fileItem.originFileObj) {
  //         // Get the original file from the fileItem
  //         const file = fileItem.originFileObj;
  //
  //         // Create a unique key based on the file's name and lastModified property
  //         const uniqueKey = `${file.name}_${file.size}`;
  //
  //         // Check if the uniqueFiles Set already contains the uniqueKey
  //         this.messageService.error("Number"+this.uniqueFiles.size.toString());
  //         if (!this.uniqueFiles.has(uniqueKey)) {
  //           // Add the uniqueKey to the uniqueFiles Set
  //           this.uniqueFiles.add(uniqueKey);
  //
  //           // Create a FileHandle object
  //           const fileHandler: FileHandle = {
  //             file: file,
  //             url: this.sanitizer.bypassSecurityTrustUrl(
  //               window.URL.createObjectURL(file)
  //             )
  //           };
  //
  //           // Push the FileHandle object into the product.productImages array
  //           this.product.productImages.push(fileHandler);
  //         }
  //       }
  //     }
  //   }
  // }





  deleteImage(i: number) {
    // Get the unique key for the image being deleted
    const file = this.product.productImages[i].file;
    const uniqueKey = `${file.name}_${file.size}`;

    console.log('Before Deleting:', this.uniqueFiles);
    this.uniqueFiles.delete(uniqueKey);
    console.log('After deleting unique key:', this.uniqueFiles);

    // Remove the image from the product.productImages array

    this.messageService.error("Before splice"+this.product.productImages.length.toString());
    // console.log('Before splice:', this.product.productImages.length);
    this.product.productImages.splice(i, 1);
    this.messageService.error("After splice"+this.product.productImages.length.toString());
    // this.populateUniqueFiles(this.product.productImages); // Call the new method here
    // Remove the unique key from the uniqueFiles Set

    this.messageService.error("Delete"+this.numFilesUploaded.toString());
    // Update the numFilesUploaded counter
    this.numFilesUploaded = (this.numFilesUploaded-1);
    this.messageService.error("Final"+this.numFilesUploaded.toString());


    this.cdr.detectChanges();
  }


  // deleteImage(i: number) {
  //   // Get the unique key for the image being deleted
  //   const file = this.product.productImages[i].file;
  //   const uniqueKey = `${file.name}_${file.lastModified}`;
  //
  //   // Remove the unique key from the uniqueFiles Set
  //   this.uniqueFiles.delete(uniqueKey);
  //
  //   // Remove the image from the product.productImages array
  //   this.product.productImages.splice(i, 1);
  //
  //   // Decrement the numFilesUploaded counter
  //   this.numFilesUploaded--;
  // }

  beforeUpload = (file: NzUploadFile): boolean => {
    const allowedExtensions = ['jpg', 'jpeg', 'png'];
    const extension = file.name?.split('.').pop()?.toLowerCase();
    const isAllowedExtension = extension ? allowedExtensions.includes(extension) : false;
    const uniqueKey = `${file.name}_${file.size}`;



    if (!isAllowedExtension) {
      // Display an error message to the user
      this.messageService.error('Only JPEG and PNG files are allowed.');
      return false;
    } else if (this.uniqueFiles.has(uniqueKey)) {
      // Display an error message to the user
      this.messageService.error('The image has already been uploaded.');
      return false;
    } else if (this.numFilesUploaded >= 4) {
      // Display an error message to the user
      this.messageService.error('Only a maximum of 4 files can be uploaded.');
      return false;
    } else {
      this.numFilesUploaded++;
      this.messageService.error(this.numFilesUploaded.toString());
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

  private populateUniqueFiles(images: FileHandle[]): void {
    this.uniqueFiles.clear();
    this.numFilesUploaded = 0;

    for (const image of images) {
      const uniqueKey = `${image.file.name}_${image.file.size}`;
      this.uniqueFiles.add(uniqueKey);
      this.numFilesUploaded++;
    }
  }

}
