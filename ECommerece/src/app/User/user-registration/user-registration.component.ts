import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../Service/user.service';
import { NgToastService } from 'ng-angular-popup';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-registration',
  templateUrl: './user-registration.component.html',
  styleUrl: './user-registration.component.css'
})
export class UserRegistrationComponent implements OnInit{
  signUpForm!:FormGroup;
  constructor(private fb: FormBuilder,
     private auth: UserService,
     private toast:NgToastService,
     private router:Router) {}

     ngOnInit(): void {
      this.signUpForm = this.fb.group({
        name: ['', [Validators.required]],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6),Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).*')]],
        confirmPassword: ['', [Validators.required]],
        phone: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
        city: ['', [Validators.required]]
      }, {
        validators: this.passwordMatchValidator
      });
    }
  
    passwordMatchValidator(group: FormGroup) {
      const password = group.get('password')?.value;
      const confirmPassword = group.get('confirmPassword')?.value;
  
      return password === confirmPassword ? null : { passwordMismatch: true };
    }

  onSignUp(){
    if(this.signUpForm.valid){
      console.log(this.signUpForm.value)
      this.auth.signUp(this.signUpForm.value)
      .subscribe({
        next:(res)=>{
          this.signUpForm.reset();
          this.toast.success({detail:"SUCCESS", summary:"Registered Success",duration:5000});
          this.router.navigate(['/user/login']);
        },
        error:(err)=>{
          alert(err?.error.message);
          this.toast.error({detail:"Error", summary:"Registration Fail",duration:5000});
        }
      })
      
    }
    else{
        console.log("form is not valid");
    }
  }
}
