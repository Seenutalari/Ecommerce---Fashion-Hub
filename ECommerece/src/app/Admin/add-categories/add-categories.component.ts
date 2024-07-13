import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgToastService } from 'ng-angular-popup';
import { AdminServiceService } from '../Service/admin-service.service';

@Component({
  selector: 'app-add-categories',
  templateUrl: './add-categories.component.html',
  styleUrl: './add-categories.component.css'
})
export class AddCategoriesComponent {
  addCategoryForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private adminService: AdminServiceService,
    private toast:NgToastService
  ) {
    this.addCategoryForm = this.formBuilder.group({
      categoryName: ['', Validators.required],
      description: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.addCategoryForm.valid) {
      this.adminService.addCategory(this.addCategoryForm.value).subscribe({
        next: (res) => {
          this.toast.success({ detail: "SUCCESS", summary: "Category Added", duration: 5000 });
          this.addCategoryForm.reset();
        },
        error: (err) => {
          console.log(err);
          this.toast.error({ detail: "ERROR", summary: "Something Went Wrong!", duration: 5000 });
        },
        complete: () => {
          this.addCategoryForm.reset();
        }
      });
    }
  }
}
