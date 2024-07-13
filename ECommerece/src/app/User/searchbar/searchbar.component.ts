import { Component, OnInit } from '@angular/core';
import { Product, ResponseProductDto } from '../../Models/models';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../Service/user.service';
import { NgToastService } from 'ng-angular-popup';
import { CartService } from '../CartService/cart.service';

@Component({
  selector: 'app-searchbar',
  templateUrl: './searchbar.component.html',
  styleUrl: './searchbar.component.css'
})
export class SearchbarComponent implements OnInit{
  brandName: string = '';
  products: ResponseProductDto[] = [];


  constructor(
    private route: ActivatedRoute,
    private auth:UserService,
    private toast:NgToastService,
    private cartService: CartService
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.brandName = params['brandName'];
      this.searchByBrand();
    });
  }

  searchByBrand() {
    this.products = []; // Reset the products array to an empty array
    this.auth.searchbybrand(this.brandName)
      .subscribe({
        next: (data) => {
          this.products = data;
        },
        error: (error) => {
          console.error('Error searching by brand:', error);
        }
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
