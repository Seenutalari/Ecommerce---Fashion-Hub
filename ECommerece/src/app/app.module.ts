import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AddCategoriesComponent } from './Admin/add-categories/add-categories.component';
import { NgToastModule } from 'ng-angular-popup';
import { AddProductsComponent } from './Admin/add-products/add-products.component';
import { AdminNavbarComponent } from './Admin/admin-navbar/admin-navbar.component';
import { AdminLoginComponent } from './Admin/admin-login/admin-login.component';
import { AdminDashboardComponent } from './Admin/admin-dashboard/admin-dashboard.component';
import { CategoryTableComponent } from './Admin/category-table/category-table.component';
import { EditProductComponent } from './Admin/edit-product/edit-product.component';
import { OrderDetailsComponent } from './Admin/order-details/order-details.component';
import { UserDetailsComponent } from './Admin/user-details/user-details.component';
import { MainNavComponent } from './main-nav/main-nav.component';
import { CartComponent } from './User/cart/cart.component';
import { HomeComponent } from './User/home/home.component';
import { OrderComponent } from './User/order/order.component';
import { UpdateUserComponent } from './User/update-user/update-user.component';
import { UserRegistrationComponent } from './User/user-registration/user-registration.component';
import { UserLoginComponent } from './User/user-login/user-login.component';
import { UserNavComponent } from './User/user-nav/user-nav.component';
import { JwtHelperService, JwtModule } from '@auth0/angular-jwt';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SearchbarComponent } from './User/searchbar/searchbar.component';

@NgModule({
  declarations: [
    AppComponent,
    AddCategoriesComponent,
    AddProductsComponent,
    AdminNavbarComponent,
    AdminLoginComponent,
    AdminDashboardComponent,
    CategoryTableComponent,
    EditProductComponent,
    OrderDetailsComponent,
    UserDetailsComponent,
    MainNavComponent,
    CartComponent,
    HomeComponent,
    OrderComponent,
    UpdateUserComponent,
    UserRegistrationComponent,
    UserLoginComponent,
    UserNavComponent,
    SearchbarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgToastModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: () => {
          return localStorage.getItem('token');
        },
        allowedDomains: ['localhost:7097'],
        disallowedRoutes: ['http://example.com/api/excluded']
      }
    })
  ],
  providers: [JwtHelperService],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
