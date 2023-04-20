import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router'
import {ProductService} from "../../service/product.service";
import {map} from "rxjs";
import {ProductsDetails2} from "../../classes/productsDetails";
import {imageProcessingService} from "../../service/imageProcessingService";
import { EventEmitter, Output } from '@angular/core';
import {OrderProductsService} from "../../service/orderProducts.service";
import {orderBuyerDetails, orderDetails} from "../../classes/orderDetails";
import {NzNotificationService} from "ng-zorro-antd/notification";
import {Decimal} from "decimal.js";
import {NzMessageService} from "ng-zorro-antd/message";

interface ColorOption {
  label: string;
  value: string;
  color: string;
}
@Component({
  selector: 'app-product-proiler-page',
  templateUrl: './product-proiler-page.component.html',
  styleUrls: ['./product-proiler-page.component.css']
})
export class ProductProilerPageComponent implements OnInit {

  constructor(private activateRoute:ActivatedRoute,private router:Router,private productService: ProductService,
              private imageProcessingService:imageProcessingService,private orderProductService:OrderProductsService,
              private notification: NzNotificationService,private message: NzMessageService) { }
  id!:any;
  price: Decimal = new Decimal(0.001);
  product!:ProductsDetails2[];
  selectedColor: string | null = null;
  outOfStock:boolean =false;
  orderDetails:orderDetails={
    product_id:BigInt('9007199254740991'),
    productName:"",
    orderSellerUsername:"",
    quantity: 1,
    productPrice:this.price,
    total: this.price,
    product_description:"",
    orderSellerAddress:"0xB80ef9e783F06DADDE4d1bbd7B461D1c288250F1"
  }
  colorOptions: ColorOption[] = [
    { label: 'Red', value: 'red', color: '#ff4d4f' },
    { label: 'Green', value: 'green', color: '#52c41a' },
    { label: 'Blue', value: 'blue', color: '#1890ff' },
    { label: 'Yellow', value: 'yellow', color: '#fadb14' }
  ];


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
          if(this.product[0].product_quantity == 0){
            this.outOfStock=true;
          }

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
    if(this.outOfStock == false){
      if(sessionStorage.getItem('username') == null) {
        this.notification.create(
          'error',
          'You are not logged in',
          'Please create an account to Continue'
        );
      }else{
        this.dataEvent.emit("Tester");
        this.orderDetails.product_id = this.product[0].id_product;
        this.orderDetails.productName =this.product[0].product_name;
        this.orderDetails.orderSellerUsername=this.product[0].product_owner;
        this.orderDetails.productPrice = this.product[0].product_price;
        this.orderDetails.total = new Decimal(this.orderDetails.quantity).times(this.product[0].product_price);
        console.log(this.selectedColor);
        if (this.selectedColor != null) {
          this.orderDetails.product_description = this.selectedColor;
          if(this.orderDetails.quantity > this.product[0].product_quantity){
            this.notification.create(
              'error',
              'You have bought more than the available stock',
              'Please decrease your selected quantity'
            );
          }else{
            console.log(this.orderDetails);
            this.orderProductService.sendOrderDetails(this.orderDetails);
            this.router.navigate(['/checkOutPage'])
          }
        }else{
          this.message.error('Please select a colour');
        }
      }
    }else{
      this.notification.create(
        'error',
        'The Product is Out of Stock',
        'Please revisit the product in a future date.'
      );
    }
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
