import {FileHandle} from "./fileHandle";
import { Decimal } from 'decimal.js';

export interface ProductsDetails{
  product_name:string,
  product_owner:string| null,
  product_price: Decimal,
  product_quantity:number
  product_category:string,
  product_description:string,
  productImages:FileHandle[]
}

export interface ProductsDetails2{
  id_product:bigint,
  product_name:string,
  product_owner:string,
  product_price: Decimal,
  product_quantity:number
  product_category:string,
  product_description:string,
  productImages:FileHandle[]
}


