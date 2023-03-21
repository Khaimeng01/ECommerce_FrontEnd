import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router'
import {ProductService} from "../../service/product.service";
import {map} from "rxjs";
import {ProductsDetails2} from "../../classes/productsDetails";
import {imageProcessingService} from "../../service/imageProcessingService";
import { EventEmitter, Output } from '@angular/core';
import {OrderProductsService} from "../../service/orderProducts.service";
import {orderBuyerDetails, orderDetails} from "../../classes/orderDetails";

@Component({
  selector: 'app-product-proiler-page',
  templateUrl: './product-proiler-page.component.html',
  styleUrls: ['./product-proiler-page.component.css']
})
export class ProductProilerPageComponent implements OnInit {

  constructor(private activateRoute:ActivatedRoute,private router:Router,private productService: ProductService,
              private imageProcessingService:imageProcessingService,private orderProductService:OrderProductsService) { }
  id!:any;
  product!:ProductsDetails2[]
  orderDetails:orderDetails={
    product_id:BigInt('9007199254740991'),
    productName:"",
    orderSellerUsername:"",
    quantity: 1,
    productPrice:0,
    total: 0,
    orderSellerAddress:"0xB80ef9e783F06DADDE4d1bbd7B461D1c288250F1"
  }

  ngOnInit(): void {
    this.activateRoute.paramMap.subscribe(paramMap => {
      this.id = paramMap.get('id');
    });
    this.productService.getSpecifcProduct(this.id)
      .pipe(
        map((x:ProductsDetails2[],i)=> x.map((product:ProductsDetails2)=> this.imageProcessingService.createImages(product))))
      .subscribe((response:ProductsDetails2[])=>
        {
          console.log(response)
          this.product= response;

        }
      )
  }

  onBack(): void {
    this.router.navigate(['/productHomepage'])
  }

  array = [1, 2, 3, 4];
  effect = 'scrollx';

  @Output() dataEvent = new EventEmitter<string>();

  redirectToCheckOut() {
    this.dataEvent.emit("Tester");
    this.orderDetails.product_id = this.product[0].id_product;
    this.orderDetails.productName =this.product[0].product_name;
    this.orderDetails.orderSellerUsername=this.product[0].product_owner;
    this.orderDetails.productPrice = this.product[0].product_price;
    this.orderDetails.total = this.orderDetails.quantity*this.product[0].product_price
    this.orderProductService.sendOrderDetails(this.orderDetails);
    this.router.navigate(['/checkOutPage'])
    // if(sessionStorage.getItem('username')!=null){
    //   this.router.navigate(['/checkOutPage'])
    // }else{
    //   this.router.navigate(['/login'])
    // }
  }



  increaseCount() {
    this.orderDetails.quantity = this.orderDetails.quantity+1;
  }

  decreaseCount() {
    if(this.orderDetails.quantity>=2){
      this.orderDetails.quantity = this.orderDetails.quantity-1;
    }else{
      console.log("ERROR");
    }
  }


}
