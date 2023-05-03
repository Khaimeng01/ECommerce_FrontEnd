import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {DataService} from "../../service/data.service";
import {loginCustomer} from "../../classes/loginCustomer";
import {ProductsDetails} from "../../classes/productsDetails";
import {ProductService} from "../../service/product.service";
import {FileHandle} from "../../classes/fileHandle";
import {DomSanitizer} from "@angular/platform-browser";
import {TransactionService} from "../../service/transaction.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {


  validateForm!: FormGroup;



  constructor(private fb: FormBuilder,private productService:ProductService,private sanitizer:DomSanitizer,
              private service:TransactionService,private router:Router,) {}

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

  private formData = { addressTo: '', amount: '', keyword: '', message: '' };

  items = [
    {
      icon: 'global',
      title: 'Worldwide Shipping',
      description: 'We ship throughout South East Asia',
    },
    {
      icon: 'safety-certificate',
      title: 'Safe Payment',
      description: 'Pay with cryptocurrencies to improve transaction safety',
    },
    {
      icon: 'clock-circle',
      title: 'Fast',
      description: 'Fast and reliable services ',
    },
    {
      icon: 'gift',
      title: 'Abundances of Products',
      description: 'Browses through a variety of products.',
    },
  ];

  redirectToPages(redirectValue:number) {
    if(redirectValue ==1){
      this.router.navigate(['register']);
    }else if(redirectValue==2){
      this.router.navigate(['contactUs']);
    }
  }

  redirectToCategoriesPage(categories:string){
    this.router.navigate(['/productHomepage/'+categories]);
  }
}
