import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Category } from '../../Models/models';
import { AdminServiceService } from '../Service/admin-service.service';

@Component({
  selector: 'app-category-table',
  templateUrl: './category-table.component.html',
  styleUrl: './category-table.component.css'
})
export class CategoryTableComponent implements OnInit{
  categories: Category[];
  @Output() closeModal = new EventEmitter<void>();
  constructor(private adminService:AdminServiceService){

  }
  ngOnInit() {
    this.getCategories();
  }

  getCategories() {
    this.adminService.GetAllCategories().subscribe({
      next:(response) => {
        this.categories = response;
      },
      error:(error) => {
        console.error('Error fetching categories:', error);
      }
    });
  }

  closeModalWindow() {
    this.closeModal.emit();
  }
}
