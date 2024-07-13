import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { updateUser } from '../../Models/models';
import { UserService } from '../Service/user.service';
import { NgToastService } from 'ng-angular-popup';
import { Router } from '@angular/router';

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrl: './update-user.component.css'
})
export class UpdateUserComponent implements OnInit{
  updateUserForm: FormGroup;
  user: updateUser;
  name:string = this.auth.getUserName();

  constructor(private auth:UserService,
    private fb: FormBuilder,
    private toast:NgToastService,
    private router:Router){}

    ngOnInit(): void {
      const userEmail = this.auth.getUserEmail();
      this.auth.getUserDetails(userEmail).subscribe((userDetails: updateUser) => {
        this.user = userDetails;
        this.updateUserForm = this.fb.group({
          name: [this.user.name, Validators.required],
          email: [this.user.email, [Validators.required, Validators.email]],
          phone: [this.user.phone, Validators.required],
          city: [this.user.city, Validators.required]
        });
      });
    }
    onDeleteAccount() {
      const isdelete = confirm('Are you sure you want to delete your account?');
      if(isdelete){
        const userEmail = this.auth.getUserEmail();
      this.auth.deleteAccount(userEmail).subscribe({
        next:(res) => {
          localStorage.clear();
          this.toast.success({detail:"SUCCESS", summary:"Account Deleted successfully",duration:5000});
        this.router.navigate(['']);
      }
    });
      }
      
    }

    onUpdateProfile() {
      if (this.updateUserForm.valid) {
        const userEmail = this.auth.getUserEmail();
        if (confirm("Are you sure you want to update your account?")) {
          this.auth.updateUser(userEmail, this.user).subscribe({
            next: (res) => {
              localStorage.clear();
              this.toast.success({ detail: "SUCCESS", summary: "Updated successfully", duration: 5000 });
              this.router.navigate(['/profile/edit']);
            },
            error: (error) => {
              this.toast.error({ detail: 'ERROR', summary: 'Something Went Wrong', duration: 5000 });
            }
          });
        }
    }
  }
}
