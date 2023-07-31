import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { ProductService } from '../product.service';
import { Cart } from './Cart';

@Component({
    templateUrl: 'cart.component.html',
    styleUrls: ['cart.component.css']
})
export class CartComponent {
    pageTitle = 'My Cart';
    selectedProducts: any = [];
    imageWidth = 50;
    imageMargin = 2;
    grandTotal: any = 0;
    quantity: any = 0;
    submit: boolean;

    constructor(private productService: ProductService,
        private route: ActivatedRoute, private router: Router) {
        this.submit = true;
        this.selectedProducts = this.productService.selectedProducts;
        for (let selProducts of this.selectedProducts) {
            this.grandTotal += selProducts.totalPrice;
            this.quantity += selProducts.quantity;
        }
        sessionStorage.setItem('grandTotal', this.grandTotal);
        sessionStorage.setItem('selectedItems', this.quantity);
    }

    updateCart(product: Cart) {
        product.totalPrice = product.price * product.quantity;
        this.grandTotal = 0;
        this.quantity = 0;
        for (let selProducts of this.selectedProducts) {
            this.grandTotal += selProducts.totalPrice;
            this.quantity += selProducts.quantity;
        }
        sessionStorage.setItem('selectedProducts', JSON.stringify(this.selectedProducts));
        sessionStorage.setItem('grandTotal', this.grandTotal);
        sessionStorage.setItem('selectedItems', this.quantity);
    }

    remove(index: number) {
        this.selectedProducts.splice(index, 2);
        this.grandTotal = 0;
        this.quantity = 0;
        for (let selProducts of this.selectedProducts) {
            this.grandTotal += selProducts.totalPrice;
            this.quantity += selProducts.quantity;
        }
        sessionStorage.setItem('selectedProducts', JSON.stringify(this.selectedProducts));
        sessionStorage.setItem('grandTotal', this.grandTotal);
        sessionStorage.setItem('selectedItems', this.quantity);
    }

    onBack(): void {
        this.router.navigate(['/products', this.selectedProducts]);
    }

    checkout() {
        this.submit = false;
        this.productService.selectedProducts = [];
        sessionStorage.removeItem('selectedProducts');
    }

    gotoProducts() {
        sessionStorage.removeItem('grandTotal');
        sessionStorage.removeItem('selectedItems');
        this.router.navigate(['/products']);
    }
}
