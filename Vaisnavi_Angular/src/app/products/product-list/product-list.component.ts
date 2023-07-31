import { AfterViewInit, Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';

import { ProductService } from '../product.service';
import { Cart } from '../cart/Cart';
import { Product } from '../product';
import { LoginService } from 'src/app/login/login.service';

@Component({
    templateUrl: 'product-list.component.html',
    styleUrls: ['product-list.component.css']
})
export class ProductListComponent implements OnInit, AfterViewInit {
    chkman: any = [];
    rate: number = 0;
    pageTitle = 'Vaisnavi\'s Grocery Mart';
    imageWidth = 80;
    imageHeight = 120;
    imageMargin = 12;
    showImage = false;
    listFilter: string = '';
   
    
    price_range = [{ 'id': '0-50', 'checked': false },
    { 'id': '50-100', 'checked': false },
    { 'id': '100-150', 'checked': false },
    { 'id': '150-1000', 'checked': false }];
    errorMessage: string = '';
    products: any = [];
    selectedItems: any = 0;
    cart!: Cart;
    total = 0;
    orderId = 0;

    selectedPrice: string[] = [];
    checkedPrice: any[] = [];
    sub: any;
    i = 0;
    sortoption = '';
    chkmanosprice: any = [];

    @ViewChild('loginEl')
    loginVal!: ElementRef;
    @ViewChild('welcomeEl')
    welcomeVal!: ElementRef;

    constructor(private productService: ProductService, private loginService: LoginService, private renderer: Renderer2) {
    }
    ngAfterViewInit() {
        this.loginVal = this.loginService.loginElement;
        this.welcomeVal = this.loginService.welcomeElement;    

        this.renderer.setProperty(this.loginVal.nativeElement, 'innerText', 'Logout');
       this.renderer.setStyle(this.welcomeVal.nativeElement, 'display', 'inline');
        let welcomeText="Welcome "+this.loginService.username+ "  "; 
        this.renderer.setProperty(this.welcomeVal.nativeElement, 'innerText', welcomeText);
       this.renderer.setStyle(this.welcomeVal.nativeElement, 'color', '#ff0080');

    }
    ngOnInit() {

        this.orderId++;

        this.productService.getProducts()
            .subscribe({
                next:products => {
                    this.productService.products = products;
                    this.products = this.productService.products; 
                    this.chkmanosprice =this.products
                },
                error:error => this.errorMessage = error});

        if (this.productService.selectedProducts.length > 0) {
            this.selectedItems = Number(sessionStorage.getItem('selectedItems'));
            this.total = Number(sessionStorage.getItem('grandTotal'));
        }
    }

    checkPrices(checkedPrice: any[], chkmanosprice: any[], chkmanos: any[]) {

        if (checkedPrice.length > 0) {

            for (let checkPrice of checkedPrice) {
                for (let chkmanfos of chkmanos) {
                    if (checkPrice === '0-50') {
                        if (chkmanfos.price >= 0 && chkmanfos.price <= 50) {
                            this.chkmanosprice.push(chkmanfos);
                        }
                    }
                    if (checkPrice === '50-100') {
                        if (chkmanfos.price > 50 && chkmanfos.price <= 100) {
                            this.chkmanosprice.push(chkmanfos);
                        }
                    }
                    if (checkPrice === '100-150') {
                        if (chkmanfos.price > 100 && chkmanfos.price <= 150) {
                            this.chkmanosprice.push(chkmanfos);
                        }
                    }
                    if (checkPrice === '150-1000') {
                        if (chkmanfos.price > 150 && chkmanfos.price <= 1000) {
                            this.chkmanosprice.push(chkmanfos);
                        }
                    }


                }
            }
        } else {

            this.chkmanosprice = chkmanos;
           
        }
    }
    filter(name: any) {      
        let checkedProducts: any[];
        this.chkman = [];
        this.chkmanosprice = [];
        const index = 0;
        checkedProducts = this.productService.products;     
      
        name.checked = (name.checked) ? false : true;    
        
        this.checkedPrice = this.price_range.filter(product => product.checked).map(product => product.id);
      
        this.chkman = checkedProducts;
        
        this.checkPrices(this.checkedPrice, this.chkmanosprice, this.chkman);
        this.products = this.chkmanosprice;
    }

    addCart(id: number) {
        this.cart = new Cart();
        this.selectedItems += 1;

        const product = this.productService.products.filter((currProduct: any) => currProduct.productId === id)[0];
        this.total += product.price;
        sessionStorage.setItem('selectedItems', this.selectedItems);
        const sp = this.productService.selectedProducts.filter((currProduct: any) => currProduct.productId === id)[0];
        if (sp) {
            const index = this.productService.selectedProducts.findIndex((currProduct: any) => currProduct.productId === id);
            this.productService.selectedProducts[index].quantity += 1;
            this.productService.selectedProducts[index].totalPrice += product.price;
        } else {
            this.cart.orderId = 'ORD_' + this.orderId;
            this.cart.productId = id;
            this.cart.userId = sessionStorage.getItem('username') + '';
            this.cart.productName = product.productName;
            this.cart.price = product.price;
            this.cart.quantity = 1;
            this.cart.dateOfPurchase = new Date().toString();
            this.cart.totalPrice = product.price * this.cart.quantity;
            this.productService.selectedProducts.push(this.cart);
            sessionStorage.setItem('selectedProducts', JSON.stringify(this.productService.selectedProducts));
            this.orderId++;
        }
    }

    searchtext() {
        this.products = this.productService.products;
        if (this.listFilter.length > 0) {
            this.products = this.products.filter((product: Product) =>
                product.productName.toLowerCase().indexOf(this.listFilter) !== -1);
        }
    }

    tabselect(producttype: string) {
        
        this.price_range = [{ 'id': '0-50', 'checked': false },
        { 'id': '50-100', 'checked': false },
        { 'id': '100-150', 'checked': false },
        { 'id': '150-1000', 'checked': false }];


        this.products = [];
        this.productService.producttype = producttype;
        this.productService.getProducts().subscribe({
            next: products => {        
                this.products = products;
                this.sortoption='';
            },
            error: error => this.errorMessage = error
        });
      
    }

    onChange(value: string) {
        this.sortoption = value;
    }
}


