import { PipeTransform, Pipe } from '@angular/core';
import { Product } from '../product';

@Pipe({
    name: 'orderBy'
})
export class OrderByPipe implements PipeTransform {

    transform(value: Product[], args: string): Product[] { 
        if (args === 'pricelh') {
            return value.sort((a: any, b: any) => {
                if (a.price < b.price) {
                    return -1;
                } else if (a.price > b.price) {
                    return 1;
                } else {
                    return 0;
                }
            });

        } else if (args === 'pricehl') {
            return value.sort((a: any, b: any) => {
                if (a.price > b.price) {
                    return -1;
                } else if (a.price < b.price) {
                    return 1;
                } else {
                    return 0;
                }
            });
        }
        return value;
    }
}
