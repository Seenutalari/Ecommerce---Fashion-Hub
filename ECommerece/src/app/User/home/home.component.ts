import { Component, OnInit } from '@angular/core';
import { Category, Product } from '../../Models/models';
import { UserService } from '../Service/user.service';
import { NgToastService } from 'ng-angular-popup';
import { CartService } from '../CartService/cart.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{
  categories: Category[]= [];
  productsByCategory: { [key: number]: Product[] } = {};

  constructor(private auth:UserService, 
    private toast:NgToastService,
    private cartService: CartService){}

  ngOnInit() {
    this.getCategories();
  }
  
  
  getCategories() {
    this.auth.getCategories().subscribe((categories) => {
      this.categories = categories;
      console.log(categories);
      this.getProductsByCategory();
    });
  }
  getProductsByCategory() {
    this.categories.forEach((category) => {
      this.auth.getProductsByCategory(category.id).subscribe((products) => {
        this.productsByCategory[category.id] =products.map((product) => ({
          ...product,
          isAddedToCart: false // Initialize isAddedToCart to false
        }));
      });
    });
  }
  addToCart(product: Product) {
    const userEmail = this.auth.getUserEmail();
    console.log(userEmail); // Get the current user's email
    this.cartService.addToCart(product.id,product.quantity, userEmail)
    .subscribe({
      next: (response: any) => {
        console.log('Item added to cart:', response.message);
        product.isAddedToCart = true; // Update the product's isAddedToCart property
        this.toast.success({ detail: 'SUCCESS', summary: response.message, duration: 5000 });
      },
      error: (error) => {
        console.error('Error adding item to cart:', error);
        this.toast.error({ detail: 'ERROR', summary: 'Failed to add item to cart', duration: 5000 });
      }
    });
  }
}
