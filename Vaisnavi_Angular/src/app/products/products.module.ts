import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ProductsRoutingModule } from './products-routing.module';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { CartComponent } from './cart/cart.component';
import { OrderByPipe } from './product-list/orderby.pipe';
import { ProductService } from './product.service';
import { AuthGuardService } from './auth-guard.service';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ProductsRoutingModule, FormsModule, ReactiveFormsModule
    
  ],
  declarations: [ProductListComponent, ProductDetailComponent, CartComponent, OrderByPipe],
  providers: [ProductService, AuthGuardService]
})
export class ProductsModule { }
