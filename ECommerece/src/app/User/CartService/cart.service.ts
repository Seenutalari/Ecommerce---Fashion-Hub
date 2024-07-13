import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserService } from '../Service/user.service';
import { Observable } from 'rxjs';
import { CartItemDto } from '../../Models/models';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private cartUrl = 'https://localhost:7097/api/Cart/';
  private userUrl = 'https://localhost:7097/api/User/';

  constructor(private http: HttpClient,private auth:UserService) { }
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.auth.getToken() 
    })
  };
  
  addToCart(productId: number, quantity: number, userEmail: string): Observable<string> {
    return this.http.post<string>(`${this.cartUrl}AddItemToCart/${productId}/${quantity}/${userEmail}`, {}, this.httpOptions);
  }
  getAllCartItems(userEmail: string): Observable<CartItemDto[]> {
    return this.http.get<CartItemDto[]>(`${this.cartUrl}GetAllCartItems/${userEmail}`, this.httpOptions);
  }
  clearCart(userEmail: string): Observable<{ message: string }> {
    return this.http.delete<{ message: string }>(`${this.cartUrl}ClearCart/${userEmail}`, this.httpOptions);
  }
  removeCartItem(userEmail: string, productId: number): Observable<void> {
    return this.http.delete<void>(`${this.cartUrl}RemoveItemFromCart/${productId}/${userEmail}`, this.httpOptions);
  }
  buyNow(userEmail:string) {
    return this.http.post<any>(`${this.userUrl}CheckOut/${userEmail}`, {}, this.httpOptions);
  }
}
