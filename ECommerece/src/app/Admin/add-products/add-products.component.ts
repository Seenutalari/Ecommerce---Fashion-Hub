import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdminServiceService } from '../Service/admin-service.service';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-add-products',
  templateUrl: './add-products.component.html',
  styleUrl: './add-products.component.css'
})
export class AddProductsComponent {
  addProductForm: FormGroup;
  constructor(
    private fb: FormBuilder,
    private adminService: AdminServiceService,
    private toast:NgToastService
  ) {
    this.addProductForm = this.fb.group({
      brand: ['', Validators.required],
      productCode: ['', Validators.required],
      productDescription: ['', Validators.required],
      price: ['', Validators.required],
      categoryId: ['', Validators.required],
      imgUrl: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.addProductForm.valid) {
      this.adminService.addProduct(this.addProductForm.value).subscribe({
        next: (res) => {
          this.toast.success({ detail: "SUCCESS", summary: "Product Added Sucessfully", duration: 5000 });
          this.addProductForm.reset();
        },
        error: (err) => {
          console.log(err);
          this.toast.error({ detail: "ERROR", summary: "Product already exists!", duration: 5000 });
        },
        complete: () => {
          this.addProductForm.reset();
        }
      });
    }
  }

}
