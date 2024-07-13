import { Component } from '@angular/core';
import { OrderDTO } from '../../Models/models';
import { ActivatedRoute } from '@angular/router';
import { AdminServiceService } from '../Service/admin-service.service';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrl: './order-details.component.css'
})
export class OrderDetailsComponent {
  userId: number;
  orders: OrderDTO[];

  constructor(
    private route: ActivatedRoute,
    private adminService: AdminServiceService
  ) {
    this.userId = this.route.snapshot.params['userId'];
    this.loadUserOrders();
  }
  loadUserOrders() {
    this.adminService.getUserOrdersById(this.userId)
      .subscribe(orders => this.orders = orders);
  }
}
