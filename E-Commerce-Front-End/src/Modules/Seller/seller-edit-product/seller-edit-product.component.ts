import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {ProductService} from "../../../service/product.service";
import {map} from "rxjs";
import {ProductsDetails, ProductsDetails2} from "../../../classes/productsDetails";
import {imageProcessingService} from "../../../service/imageProcessingService";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {FileHandle} from "../../../classes/fileHandle";
import {DomSanitizer} from "@angular/platform-browser";
import {NzUploadChangeParam, NzUploadFile} from "ng-zorro-antd/upload";
import {NzMessageService} from "ng-zorro-antd/message";
import { Decimal } from 'decimal.js';
import {DataService} from "../../../service/data.service";

@Component({
  selector: 'app-seller-edit-product',
  templateUrl: './seller-edit-product.component.html',
  styleUrls: ['./seller-edit-product.component.css']
})
export class SellerEditProductComponent implements OnInit {

  editProductStatus=false;
  productId!:string;
  product!:ProductsDetails2[]
  test!:any[];
  validateForm!: FormGroup;
  price: Decimal = new Decimal(0.001);
  editedProduct:ProductsDetails={
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


  constructor(private route: ActivatedRoute,
              private productService:ProductService,
              private imageProcessingService:imageProcessingService,
              private fb: FormBuilder,
              private sanitizer:DomSanitizer,
              private messageService: NzMessageService,
              private router: Router,private dataService:DataService,private cdr: ChangeDetectorRef) { }


  ngOnInit(): void {
    this.editProductStatus=false;
    this.route.queryParams.subscribe(params => {
      const productId = params['productId'];
      this.productId = params['productId'];
    });
    this.productService.getSpecifcProduct(BigInt(this.productId))
      .pipe(
        map((x:ProductsDetails2[],i)=> x.map((product:ProductsDetails2)=> this.imageProcessingService.createImages(product))))
      .subscribe((response:ProductsDetails2[])=>
        {
          this.product= response;
          this.test=response;
          this.editedProduct=this.product[0];
          this.populateUniqueFiles(this.editedProduct.productImages); // Call the new method here
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
      productName: [null, [Validators.required,this.dataService.noSpaceAtStart()]],
      productPrice: [null, [Validators.required, Validators.pattern(/^\d+(\.\d{1,4})?$/),
        Validators.min(0)]],
      productQuantity: [null, [
        Validators.required,
        Validators.pattern(/^[1-9]\d*$/),
        Validators.min(1)
      ]],
      productCategory: [null, [Validators.required]],
      productDesc: [null, [Validators.required,this.dataService.noSpaceAtStart(),Validators.maxLength(250)]],
    });
  }

  submitForm(): void {
    if (this.validateForm.valid) {
      if(this.numFilesUploaded == 0){
        this.messageService.error('There is no Images for this Product');
      }else{

        this.editedProduct.product_name = this.validateForm.value.productName;
        this.editedProduct.product_quantity = this.validateForm.value.productQuantity;
        this.editedProduct.product_price = this.validateForm.value.productPrice;
        this.editedProduct.product_category = this.validateForm.value.productCategory;
        this.editedProduct.product_description= this.validateForm.value.productDesc;
        const productFormData = this.prepareFormData(this.editedProduct)
        let idProduct = BigInt(this.productId);
        this.productService.editProduct(productFormData,idProduct).subscribe((productFormData)=>
          {
            console.warn(productFormData)

          }
        );
        this.editProductStatus=true;
      }
    } else {
      Object.values(this.validateForm.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
        }
      });
    }
  }


  private uniqueFiles = new Set<string>();
  private numFilesUploaded = 0;

  prepareFormData(product:ProductsDetails):FormData{
    const formData = new FormData();
    formData.append('product',new Blob([JSON.stringify(product)],{type:'application/json'}));
    for(var i =0;i<product.productImages.length;i++){
      formData.append('imageFile',product.productImages[i].file,product.productImages[i].file.name);
    }
    return formData;
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


  onFileSelected({ file, fileList }: NzUploadChangeParam) {

    const status = file.status;
    if (status !== 'uploading') {
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
        this.editedProduct.productImages.push(fileHandler)
        this.uniqueFiles.add(uniqueKey);
      }

    }

  }





  deleteImage(i: number) {
    const file = this.editedProduct.productImages[i].file;
    const uniqueKey = `${file.name}_${file.size}`;

    this.uniqueFiles.delete(uniqueKey);
    this.editedProduct.productImages.splice(i, 1);
    this.numFilesUploaded = (this.numFilesUploaded-1);

    this.cdr.detectChanges();
  }

  onBack() {
    this.router.navigate(['sellerLayout/sellerProductTableView'])
  }

  redirectToProductTable() {
    this.router.navigate(['sellerLayout/sellerProductTableView']);
  }

  redirectToEditProduct() {
    this.router.navigateByUrl('/dummy-route', { skipLocationChange: true }).then(() => {
      this.router.navigate(['/sellerLayout/sellerEditProduct'],{ queryParams: { productId: this.productId }});
    });
  }
}
