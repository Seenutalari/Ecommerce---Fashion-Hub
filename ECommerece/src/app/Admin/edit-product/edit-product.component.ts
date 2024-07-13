import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ResponseProductDto } from '../../Models/models';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdminServiceService } from '../Service/admin-service.service';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrl: './edit-product.component.css'
})
export class EditProductComponent implements OnInit{
  @Input() product: ResponseProductDto;
  @Output() closeModal = new EventEmitter<void>();
  @Output() productUpdated = new EventEmitter<void>();

  editProductForm: FormGroup;
  constructor(private formBuilder: FormBuilder, 
    private adminService: AdminServiceService,
    private toast:NgToastService){
    
  }
  ngOnInit() {
    this.initForm();
  }
  initForm() {
    this.editProductForm = this.formBuilder.group({
      brand: [this.product.brand, Validators.required],
      productCode: [this.product.productCode, Validators.required],
      productDescription: [this.product.productDescription, Validators.required],
      price: [this.product.price, Validators.required],
      imgUrl: [this.product.imgUrl, Validators.required]
    });
  }

  onSubmit() {
    if (this.editProductForm.valid) {
      const updatedProduct = this.editProductForm.value;
      this.adminService.UpdateProducts(this.product.id, updatedProduct)
      .subscribe({next:(response) => {
        console.log('Product updated successfully:', response);
        this.toast.success({detail:"SUCCESS", summary:"Product updated successfully",duration:5000});
        this.closeModal.emit();
        this.productUpdated.emit();
      },
       error: (error) => {
          console.log('Error updating product:', error);
          this.toast.error({detail:"ERROR", summary:"Error updating product",duration:5000});
        }
    });
    }
  }
}
