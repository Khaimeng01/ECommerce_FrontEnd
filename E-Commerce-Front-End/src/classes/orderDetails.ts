export class  orderBuyerDetails{
  private _order_Seller_Username!:string
  private _order_delivery_Address!:string
  private _order_Seller_ContactNumber!:string

}

export class  orderDetails{
  public product_Id!:bigint;
  public productName!: string;
  public orderSellerUsername!:string;
  public quantity!: number;
  public productPrice!:number;
  public total!: number;
}

export class orderDetailsToAPI{
  private product_Id!:number
  private order_productquantity!:number
  private priceamount!:number
  private order_buyer_username!:string
  private order_seller_username!:string
  private order_delivery_address!:string
  private order_buyer_contact_number!:string
  private order_description!:string
  private order_status!:string
}




