import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ResponseProductDto, updateUser } from '../../Models/models';
import { UserService } from '../Service/user.service';
import { NgToastService } from 'ng-angular-popup';
import { Router } from '@angular/router';
import { SearchbarComponent } from '../searchbar/searchbar.component';

@Component({
  selector: 'app-user-nav',
  templateUrl: './user-nav.component.html',
  styleUrl: './user-nav.component.css'
})
export class UserNavComponent {
  @ViewChild(SearchbarComponent) searchbarComponent: SearchbarComponent;
  brandName: string = '';
  updateUserForm: FormGroup;
  user: updateUser;


  name:string = this.auth.getUserName();
  constructor(private auth:UserService,
    private formBuilder: FormBuilder,
    private toast:NgToastService, 
    private route:Router,){}   

    getGreetingMessage(): string {
      const currentHour = new Date().getHours();
      if (currentHour < 12) {
        return 'Good Morning';
      } else if (currentHour < 18) {
        return 'Good Afternoon';
      } else {
        return 'Good Evening';
      }
    }

  logout(){
    this.auth.userSignOut();
    this.toast.success({detail:"SUCCESS", summary:"Successfully Logged Out",duration:5000});
    this.route.navigate(['']);
  }
  navigateToSearch() {
    this.route.navigate(['/search'], { queryParams: { brandName: this.brandName } })
      .then(() => {
        // Call the searchByBrand() method in the SearchbarComponent
        this.searchbarComponent.searchByBrand();
      });
  }
}
