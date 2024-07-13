import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AddCategoryDto, Category, OrderDTO, RequestProductDto, ResponseProductDto, User } from '../../Models/models';

@Injectable({
  providedIn: 'root'
})
export class AdminServiceService {

  private baseUrl = 'https://localhost:7097/api/Admin/';

  constructor(private http: HttpClient, private router: Router) {}
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.getAdminToken() 
    })
  };

  addCategory(addCategoryDto: AddCategoryDto): Observable<any> {
    return this.http.post(`${this.baseUrl}CreateCategory`, addCategoryDto, this.httpOptions);
  }
  GetAllProducts(): Observable<ResponseProductDto[]> {
    const url = `${this.baseUrl}GetAllProducts`;
    return this.http.get<ResponseProductDto[]>(url);
  }
  adminLogIn(userName: string, password: string) {
    return this.http.post<any>(`${this.baseUrl}Login`, {userName, password}, { responseType: 'text' as 'json' })
  }
  adminSignOut(){
    localStorage.clear();
    this.router.navigate(['admin/login']);
  }
  addProduct(productData: any): Observable<any> {
    return this.http.post(`${this.baseUrl}AddProducts`, productData, this.httpOptions);
  }
  GetAllCategories(): Observable<Category[]> {
    const url = `${this.baseUrl}GetAllCategories`;
    return this.http.get<Category[]>(url, this.httpOptions);
  }
  UpdateProducts(id: number, product: RequestProductDto): Observable<ResponseProductDto> {
    const url = `${this.baseUrl}UpdateProducts/${id}`;
    return this.http.put<ResponseProductDto>(url, product, this.httpOptions);
  }
  DeleteProduct(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}DeleteProduct/${id}`, this.httpOptions);
  }
  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.baseUrl}GetAllUsers`, this.httpOptions);
  }
  getUserOrdersById(userId: number): Observable<OrderDTO[]> {
    return this.http.get<OrderDTO[]>(`${this.baseUrl}GetUserOrdersById/${userId}`);
  }
  storeAdminToken(tokenValue:string){
    localStorage.setItem('admintoken',tokenValue)
  }
  getAdminToken(){
    return localStorage.getItem('admintoken');
  }
}
