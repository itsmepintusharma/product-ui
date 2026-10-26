import {
  Component,
  OnInit
} from '@angular/core';

import {
  CommonModule
} from '@angular/common';

import {
  RouterLink
} from '@angular/router';

import { Product }
from '../../../models/product';

import { ProductService }
from '../../../core/services/product.service';

import { AuthService }
from '../../../core/services/auth.service';

import { Navbar }
from '../../../shared/navbar/navbar';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    Navbar
  ],
  templateUrl: './product-list.html',
  styleUrl: './product-list.css'
})
export class ProductList
implements OnInit {

  products: Product[] = [];

  isAdmin = false;

  constructor(
    private productService: ProductService,
    private authService: AuthService
  ) {
  }

  ngOnInit(): void {

    this.isAdmin =
      this.authService.isAdmin();

    this.loadProducts();
  }

  loadProducts(): void {

    this.productService
      .getProducts()
      .subscribe({

        next: (response) => {

          this.products =
            response;
        },

        error: (err) => {

          console.log(err);
        }
      });
  }

  deleteProduct(
    id: number
  ): void {

    const result =
      confirm(
        'Are you sure you want to delete this product?'
      );

    if (!result) {
      return;
    }

    this.productService
      .deleteProduct(id)
      .subscribe({

        next: () => {

          alert(
            'Product Deleted Successfully'
          );

          this.loadProducts();
        },

        error: (err) => {

          console.log(err);

          alert(
            'Error while deleting product'
          );
        }
      });
  }
}