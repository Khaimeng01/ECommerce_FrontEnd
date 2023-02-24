import {FileHandle} from "./fileHandle";

export interface ProductsDetails{
  product_name:string,
  product_owner:string,
  product_price: number,
  product_quantity:string
  product_category:string,
  product_description:string,
  productImages:FileHandle[]
}


