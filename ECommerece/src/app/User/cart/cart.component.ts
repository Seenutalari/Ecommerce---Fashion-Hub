import { Component, OnInit } from '@angular/core';
import { CartItemDto } from '../../Models/models';
import { NgToastService } from 'ng-angular-popup';
import { Router } from '@angular/router';
import { UserService } from '../Service/user.service';
import { CartService } from '../CartService/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent implements OnInit{
  cartItems: CartItemDto[] = [];
  constructor(private auth: UserService,
    private cartService: CartService,
    private toast:NgToastService,
    private router:Router) {}

    ngOnInit() {
      this.getCartItems();
    }
  
    getCartItems() {
      const userEmail = this.auth.getUserEmail();
      this.cartService.getAllCartItems(userEmail)
        .subscribe((items) => {
          this.cartItems = items;
        });
    }
    clearCart() {
      const isdelete = confirm("Are you sure you want to clear cart?");
      if(isdelete){
      const userEmail = this.auth.getUserEmail();
      this.cartService.clearCart(userEmail)
        .subscribe({
          next:(response) => {
          console.log(response.message);
          this.toast.success({ detail: 'SUCCESS', summary: response.message, duration: 5000 });
          this.cartItems = [];
        }, 
        error:(error) => {
          console.log('Error clearing cart:', error);
          this.toast.error({ detail: 'ERROR', summary: error, duration: 5000 });
        }
      });
    }
    }
    
    removeFromCart(itemId: number) {
      const isdelete = confirm("Are you sure you want to delete?");
      if(isdelete){
        const userEmail = this.auth.getUserEmail();
      this.cartService.removeCartItem(userEmail, itemId)
        .subscribe({
          next:(res) => {
            this.toast.success({ detail: 'SUCCESS', summary: "Item Removed", duration: 5000 });
            this.getCartItems();
          },
          error:(error) => {
            console.log('Error removing item from cart:', error);
            this.toast.error({ detail: 'ERROR', summary: error, duration: 5000 });
          }
        });
      }
    }
    buyNow() {
      const userEmail = this.auth.getUserEmail();
      this.cartService.buyNow(userEmail).subscribe({
        next:(response) => {
          this.toast.success({ detail: 'SUCCESS', summary: "Order Placed Successfully", duration: 5000 });
          console.log(response);
          this.router.navigate(['/userOrders']);
        },
        error:(error) => {
          console.log(error);
          this.toast.error({ detail: 'ERROR', summary: error, duration: 5000 });
        }
    });
    }
}
