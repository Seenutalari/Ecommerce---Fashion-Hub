import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdminServiceService } from '../Service/admin-service.service';
import { NgToastService } from 'ng-angular-popup';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrl: './admin-login.component.css'
})
export class AdminLoginComponent implements OnInit{
  passwordInputType: string = 'password';
  passwordVisibilityIcon: string = 'fas fa-eye-slash';
  adminloginForm!:FormGroup;
  constructor(private fb: FormBuilder, 
    private auth: AdminServiceService,
    private toast:NgToastService,
    private router:Router) {}

  ngOnInit(): void {
    this.adminloginForm = this.fb.group({
      userName:['',Validators.required],
      password:['',Validators.required]
    })
  }
  togglePasswordVisibility() {
    this.passwordInputType = this.passwordInputType === 'password' ? 'text' : 'password';
    this.passwordVisibilityIcon = this.passwordInputType === 'password' ? 'fas fa-eye-slash' : 'fas fa-eye';
  }
  onLogin(){
    if(this.adminloginForm.valid){
      const { userName, password } = this.adminloginForm.value;
      console.log(this.adminloginForm.value)
      this.auth.adminLogIn(userName, password)
      .subscribe({
        next:(res)=>{
          console.log(res)
          this.adminloginForm.reset();
          this.auth.storeAdminToken(res);
          this.toast.success({detail:"SUCCESS", summary:"Login Success",duration:5000});
          this.router.navigate(['/admindashboard']);
        },
        error:(err)=>{ 
          this.toast.error({detail:"ERROR", summary:"Invalid Email and Password!",duration:5000});
        }
      })
    }
    else{
        console.log("form is not valid");
    }
  }

}
