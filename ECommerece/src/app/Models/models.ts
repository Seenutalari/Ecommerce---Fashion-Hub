export interface Category{
  id : number;
  CategoryName: string;
  description: string;
  Products: [];
}
export interface Product {
  id: number;
  brand: string;
  productName: string;
  productDescription: string;
  price: number;
  imgUrl: string;
  quantity:number;
  categoryId: number;
category: Category;
cartItems: CartItem[];
isAddedToCart: boolean;
}
export interface AddCategoryDto {
  categoryName: string;
  description: string;
}
export interface AddProductDto{
  brand : string;
  productCode : number;
  productDescriptionc: string;
  price: number;
  categoryId : number;
  imgUrl:string;
}
export interface CartItem {
  id: number;
  cartId: number;
  cart: Cart;
  productId: number;
  product: Product;
  quantity: number;
  totalPrice: number;
}

export interface Cart {
  id: number;
  userId: number;
  user: User;
  items: CartItem[];
}

export interface User {
  id: number;
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  phone: string;
  city: string;
  createdDate: Date;
  cart: Cart;
}
export interface updateUser{
  name: string;
  email: string;
  phone: string;
  city: string;
}
export interface ResponseProductDto {
  id: number;
  brand: string;
  productCode: number;
  productDescription: string;
  price: number;
  imgUrl: string;
}

export interface RequestProductDto {
  brand: string;
  productCode: string;
  productDescription: string;
  price: number;
  imgUrl: string;
}
export interface CartItemDto {
  Id: number;
  ProductId: number;
  ProductDescription: string;
  ProductBrand: string;
  ProductPrice: number;
  Quantity: number;
  TotalPrice: number;
  ImageUrl: string;
}
export interface OrderItemDto {
  id: number;
  orderId: number;
  productId: number;
  productBrand: string;
  productDescription: string;
  productPrice: number;
  productImgUrl: string;
  quantity: number;
  totalPrice: number;
}
export interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
  city: string;
  createdDate: Date;
}
export class OrderDTO {
  id: number;
  userName: string;
  orderDate: Date;
  totalAmount: number;
  orderItems: OrderItemsDTO[];
}
export class OrderItemsDTO {
  productId: number;
  productBrand: string;
  quantity: number;
  totalPrice: number;
  orderDate: Date;
}



  