import { Component, OnInit } from '@angular/core';
import { AdminServiceService } from '../Service/admin-service.service';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-admin-navbar',
  templateUrl: './admin-navbar.component.html',
  styleUrl: './admin-navbar.component.css'
})
export class AdminNavbarComponent implements OnInit{
  showModal = false;
  
  constructor(private auth:AdminServiceService, private toast:NgToastService,){}


  ngOnInit() {
    
  }
  logout(){
    this.auth.adminSignOut();
    this.toast.success({detail:"SUCCESS", summary:"Successfully Logged Out",duration:5000});
  }
  showCategoryTable() {
    this.showModal = true;
  }

}
