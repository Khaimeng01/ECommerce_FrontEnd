import { Decimal } from 'decimal.js';


export class  orderBuyerDetails{
  private _order_Seller_Username!:string
  private _order_delivery_Address!:string
  private _order_Seller_ContactNumber!:string

}

export class  orderDetails{
  public product_id!:bigint;
  public productName!: string;
  public orderSellerUsername!:string;
  public quantity!: number;
  public productPrice!:Decimal;
  public total!: Decimal;
  public product_description!:string;
  public orderSellerAddress!:string;
}

export class orderDetailsToAPI{
  public product_id!:bigint;
  public order_date!:Date;
  public order_productquantity!:number
  public order_priceamount!:Decimal
  public order_buyer_username!:string
  public order_seller_username!:string
  public order_delivery_address!:string
  public order_buyer_contact_number!:string
  public order_description!:string
  public order_status!:string
  public order_transaction_record!:string
}

export class customer_orderPastHistory{

  public id_order!:number;
  public order_date!:Date;
  public product_id!:bigint;
  public order_priceamount!:Decimal
  public order_seller_username!:string
  public order_description!:string
  public order_status!:string
  public order_transaction_record!:string
}

export class seller_orderHistory{

  public id_order!:number;
  public order_date!:Date;
  public product_id!:bigint;
  public order_priceamount!:Decimal
  public order_seller_username!:string
  public order_description!:string
  public order_status!:string
  public order_transaction_record!:string
  public  order_buyer_username!:string
}




