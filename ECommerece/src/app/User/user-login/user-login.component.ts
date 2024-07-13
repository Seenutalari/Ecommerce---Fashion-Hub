import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../Service/user.service';
import { NgToastService } from 'ng-angular-popup';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrl: './user-login.component.css'
})
export class UserLoginComponent implements OnInit{
  loginForm!:FormGroup;
  constructor(private fb: FormBuilder, 
    private auth: UserService,
    private toast:NgToastService,
    private router:Router) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email:['', [Validators.required, Validators.email]],
      password:['',[Validators.required, Validators.minLength(6)]]
    })
  }

  onLogin(){
    if(this.loginForm.valid){
      const { email, password } = this.loginForm.value;
      console.log(this.loginForm.value)
      this.auth.logIn(email, password)
      .subscribe({
        next:(res)=>{
          console.log(res);
          this.loginForm.reset();
          this.auth.storeToken(res);
          this.toast.success({detail:"SUCCESS", summary:"Login Success",duration:5000});
          this.router.navigate(['dashboard']);
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
