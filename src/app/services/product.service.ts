import { Product } from './../models/product.model';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar'
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class ProductService {

  baseURL = 'http://localhost:3001/products';

  constructor(private snackBar: MatSnackBar, private http: HttpClient) { }

  isValid(product : Product) : boolean {
    return Math.floor(product.discount/100) == 0;
  }

  create(product : Product) : Observable<Product>{
    return this.http.post<Product>(this.baseURL, product)
  }

  readAll() : Observable<Product[]>{
    return this.http.get<Product[]>(this.baseURL);
  }

  readPage(page : number, limit : number = 10) : Observable<Product[]>{
    const url = `${this.baseURL}?_page=${page}&_limit=${limit}`;
    return this.http.get<Product[]>(url);
  }

  readOne(id : string) : Observable<Product>{
    const url = `${this.baseURL}/${id}`;
    return this.http.get<Product>(url);
  }

  update(product : Product) : Observable<Product>{
    const url = `${this.baseURL}/${product.id}`;
    return this.http.put<Product>(url, product);
  }

  delete(id : number) : Observable<Product>{
    const url = `${this.baseURL}/${id}`;
    return this.http.delete<Product>(url);
  }

  showMessage(message : string) : void{
    this.snackBar.open(message, 'X', {
      duration: 3000,
      horizontalPosition: 'right',
      verticalPosition: 'top',
    })
  }

}
