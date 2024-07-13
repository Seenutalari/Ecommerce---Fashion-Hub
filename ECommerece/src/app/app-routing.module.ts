import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminLoginComponent } from './Admin/admin-login/admin-login.component';
import { MainNavComponent } from './main-nav/main-nav.component';
import { UserLoginComponent } from './User/user-login/user-login.component';
import { OrderDetailsComponent } from './Admin/order-details/order-details.component';
import { UserRegistrationComponent } from './User/user-registration/user-registration.component';
import { HomeComponent } from './User/home/home.component';
import { userGuardGuard } from './User/Guard/user-guard.guard';
import { adminGuard } from './Admin/Admin-guard/admin.guard';
import { AdminDashboardComponent } from './Admin/admin-dashboard/admin-dashboard.component';
import { AddProductsComponent } from './Admin/add-products/add-products.component';
import { AddCategoriesComponent } from './Admin/add-categories/add-categories.component';
import { CartComponent } from './User/cart/cart.component';
import { OrderComponent } from './User/order/order.component';
import { UserDetailsComponent } from './Admin/user-details/user-details.component';
import { UpdateUserComponent } from './User/update-user/update-user.component';
import { SearchbarComponent } from './User/searchbar/searchbar.component';

const routes: Routes = [
  {
    path: 'admin/login',
    component:AdminLoginComponent
  },
  {
    path: '',
    component:MainNavComponent
  },
  {
    path: 'user/login',
    component:UserLoginComponent
  },  
  { 
    path: 'orders/:userId', 
    component: OrderDetailsComponent 
  },
  {
    path: 'user/register',
    component:UserRegistrationComponent
  },
  {
    path: 'dashboard',
    component:HomeComponent, 
    canActivate:[userGuardGuard]
  },
  {
    path: 'dashboard',
    redirectTo: 'user/login',
    pathMatch: 'full'
  },
  {
    path:'admindashboard',
    component:AdminDashboardComponent,
    canActivate:[adminGuard]
  },
  {
    path:'addproducts',
    component:AddProductsComponent,
    canActivate:[adminGuard]
  },
  {
    path:'addcategories',
    component:AddCategoriesComponent,
    canActivate:[adminGuard]
  },
  {
    path:'cartItems',
    component:CartComponent,
    canActivate:[userGuardGuard]
  },
  {
    path:'userOrders',
    component:OrderComponent,
    canActivate:[userGuardGuard]
  },
  {
    path:'userDetails',
    component:UserDetailsComponent,
    canActivate:[adminGuard]
  },
  { 
    path: 'profile/edit',
    component: UpdateUserComponent,
    canActivate:[userGuardGuard]
  },
  { path: 'search', 
    component: SearchbarComponent,
    canActivate:[userGuardGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
