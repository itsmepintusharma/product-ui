import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { Product }
from '../../models/product';

import { environment }
from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(
    private http: HttpClient
  ) {}

  getProducts():
  Observable<Product[]>
  {
    return this.http.get<Product[]>(
      `${environment.apiUrl}/products`
    );
  }

  getProduct(
    id: number
  ): Observable<Product>
  {
    return this.http.get<Product>(
      `${environment.apiUrl}/products/${id}`
    );
  }

  createProduct(
    product: any
  )
  {
    return this.http.post(
      `${environment.apiUrl}/products`,
      product
    );
  }

  updateProduct(
    id: number,
    product: any
  )
  {
    return this.http.put(
      `${environment.apiUrl}/products/${id}`,
      product
    );
  }

  deleteProduct(
    id: number
  )
  {
    return this.http.delete(
      `${environment.apiUrl}/products/${id}`
    );
  }
}
