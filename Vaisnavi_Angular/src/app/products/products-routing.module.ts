import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { CartComponent } from './cart/cart.component';
import { AuthGuardService } from './auth-guard.service';

const routes: Routes = [
  {
    path: '',
    children: [
      { path: '', component: ProductListComponent },
      { path: 'cart', component: CartComponent },
      { path: ':id', component: ProductDetailComponent }
    ],
    canActivate: [AuthGuardService]
  }];

@NgModule({
  imports: [RouterModule.forChild(routes),  FormsModule, ReactiveFormsModule ],
  exports: [RouterModule]
})
export class ProductsRoutingModule { }
