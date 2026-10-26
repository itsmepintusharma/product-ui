import { Routes } from '@angular/router';

import { Login }
from './features/auth/login/login';

import { ProductList }
from './features/products/product-list/product-list';

import { ProductForm }
from './features/products/product-form/product-form';

import { authGuard }
from './core/guards/auth-guard';
export const routes: Routes = [

  {
    path: '',
    component: Login
  },

  {
    path: 'products',
    component: ProductList,
    canActivate: [authGuard]
  },

  {
    path: 'products/create',
    component: ProductForm,
    canActivate: [authGuard]
  },

  {
    path: 'products/edit/:id',
    component: ProductForm,
    canActivate: [authGuard]
  },

  {
    path: '**',
    redirectTo: ''
  }

];