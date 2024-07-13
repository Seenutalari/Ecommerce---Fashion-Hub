import { Component, OnInit } from '@angular/core';
import { OrderItemDto } from '../../Models/models';
import { UserService } from '../Service/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrl: './order.component.css'
})
export class OrderComponent implements OnInit{
  orders: OrderItemDto[];

  constructor(private auth: UserService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getOrders();
  }

  getOrders(): void {
    const userEmail = this.auth.getUserEmail();
    this.auth.getOrdersByUserId(userEmail).subscribe({
      next:
      (orders) => {
        this.orders = orders;
      },
      error:(error) => {
        console.error('Error fetching orders:', error);
      }
  });
  }

  navigateToHome(){
    this.router.navigate(['/dashboard']);
  }
}
