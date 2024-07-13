import { Component, OnInit } from '@angular/core';
import { ResponseProductDto } from '../../Models/models';
import { AdminServiceService } from '../Service/admin-service.service';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.css'
})
export class AdminDashboardComponent implements OnInit{
  products: ResponseProductDto[];
  selectedProduct: ResponseProductDto;
  showEditModal = false;

  constructor( private adminService : AdminServiceService,
    private toast:NgToastService){

  }
  ngOnInit() {
    this.getProducts();
  }

  getProducts() {
    this.adminService.GetAllProducts().subscribe({
      next:(res)=>{
        this.products = res;
      },
      error:(err)=>{ 
        console.error('Error fetching products:', err);
      }
    });
  }
  editProduct(product: ResponseProductDto) {
    this.selectedProduct = product;
    this.showEditModal = true;
  }
  closeModal() {
    this.showEditModal = false;
  }
  onProductUpdated() {
    this.getProducts();
  }
  deleteProduct(id: number) {
    const isdelete = confirm('Are you sure you want to delete the product?');
    if (isdelete){
      this.adminService.DeleteProduct(id).subscribe({
        next: (response) => {
          console.log('Product deleted successfully:', response);
          this.toast.success({ detail: "SUCCESS", summary: "Product deleted successfully", duration: 5000 });
          this.getProducts();
        },
        error: (error) => {
          console.log('Error deleting product:', error);
          this.toast.error({ detail: "ERROR", summary: "Error deleting product", duration: 5000 });
        }
      });
    }
    
  }
}
