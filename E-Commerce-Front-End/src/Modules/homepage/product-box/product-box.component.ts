import {Component, Input, OnInit} from '@angular/core';
import {ProductsDetails} from "../../../classes/productsDetails";
import {FileHandle} from "../../../classes/fileHandle";
import {DomSanitizer} from "@angular/platform-browser";

@Component({
  selector: 'app-product-box',
  templateUrl: './product-box.component.html',
  styleUrls: ['./product-box.component.css']
})
export class ProductBoxComponent implements OnInit {

  @Input() productList!:ProductsDetails;
  constructor(private sanitizer:DomSanitizer) { }

  ngOnInit(): void {
  }

  // public createImages(product:ProductsDetails){
  //   const productImages:any[] = product.productImages;
  //
  //   const productImagesToFileHandle:FileHandle[]=[];
  //
  //   for(let i =0;i< productImages.length;i++){
  //     const imagesFileData = productImages[i];
  //     const imageBlob = this.dataURItoBlob(imagesFileData.picByte,imagesFileData.type);
  //
  //     const imageFile = new File([imageBlob],imagesFileData.name,{type:imagesFileData.type});
  //
  //     const finalFileHandle:FileHandle={
  //       file:imageFile,
  //       url:this.sanitizer.bypassSecurityTrustUrl(window.URL.createObjectURL(imageFile))
  //     };
  //
  //     productImagesToFileHandle.push(finalFileHandle);
  //   }
  //
  //   product.productImages = productImagesToFileHandle;
  //   return product
  // }
  //
  // public dataURItoBlob(picBytes:any,imageType:any){
  //     const byteString = window.atob(picBytes);
  //     const arrayBuffer = new ArrayBuffer(byteString.length);
  //     const int8Array = new Uint8Array(arrayBuffer);
  //
  //     for(let i =0;i<byteString.length;i++){
  //       int8Array[i] = byteString.charCodeAt(i);
  //     }
  //
  //     const blob = new Blob([int8Array],{type:imageType});
  //     return blob;
  //
  // }

}
