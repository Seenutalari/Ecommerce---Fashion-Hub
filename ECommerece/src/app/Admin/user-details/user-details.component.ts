import { Component, OnInit } from '@angular/core';
import { User } from '../../Models/models';
import { AdminServiceService } from '../Service/admin-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrl: './user-details.component.css'
})
export class UserDetailsComponent implements OnInit{
  users: User[];

  constructor(private adminService: AdminServiceService,
    private router:Router) { }

  ngOnInit(): void {
    this.getUsers();
  }
  viewUserOrders(userId: number) {
    this.router.navigate(['orders/', userId]);
  }

  getUsers(): void {
    this.adminService.getAllUsers().subscribe({
      next:
      (users) => {
        this.users = users;
      },
      error:(error) => {
        console.error('Error fetching users:', error);
      }
  });
  }
}
