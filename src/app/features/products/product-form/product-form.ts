import {
  Component,
  OnInit
} from '@angular/core';

import { CommonModule }
from '@angular/common';

import { FormsModule }
from '@angular/forms';

import {
  Router,
  ActivatedRoute
} from '@angular/router';

import { ProductService }
from '../../../core/services/product.service';

import { AuthService }
from '../../../core/services/auth.service';

import { Navbar }
from '../../../shared/navbar/navbar';

@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    Navbar
  ],
  templateUrl: './product-form.html',
  styleUrl: './product-form.css'
})
export class ProductForm
implements OnInit {

  id = 0;

  isEditMode = false;

  name = '';

  description = '';

  price = 0;

  stock = 0;

  constructor(
    private productService: ProductService,
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService
  ) {
  }

  ngOnInit(): void {

    if (!this.authService.isAdmin()) {

      this.router.navigate([
        '/products'
      ]);

      return;
    }

    const id =
      this.route.snapshot
          .paramMap
          .get('id');

    if (id) {

      this.id =
        Number(id);

      this.isEditMode =
        true;

      this.loadProduct();
    }
  }

  loadProduct(): void {

    this.productService
      .getProduct(this.id)
      .subscribe({

        next: (product) => {

          this.name =
            product.name;

          this.description =
            product.description;

          this.price =
            product.price;

          this.stock =
            product.stock;
        },

        error: (err) => {

          console.log(err);
        }
      });
  }

  save(): void {

    const product = {

      name: this.name,

      description: this.description,

      price: this.price,

      stock: this.stock
    };

    if (this.isEditMode) {

      this.productService
        .updateProduct(
          this.id,
          product
        )
        .subscribe({

          next: () => {

            alert(
              'Product Updated Successfully'
            );

            this.router.navigate([
              '/products'
            ]);
          },

          error: (err) => {

            console.log(err);

            alert(
              'Error updating product'
            );
          }
        });

      return;
    }

    this.productService
      .createProduct(product)
      .subscribe({

        next: () => {

          alert(
            'Product Created Successfully'
          );

          this.router.navigate([
            '/products'
          ]);
        },

        error: (err) => {

          console.log(err);

          alert(
            'Error creating product'
          );
        }
      });
  }
}