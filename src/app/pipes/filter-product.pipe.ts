import { Pipe, PipeTransform } from '@angular/core';
import { IProduct } from '../models/product';

@Pipe({
  name: 'filterProduct'
})
export class FilterProductPipe implements PipeTransform {

  transform(product: IProduct[], serch: string): IProduct[] {
    if(serch.length === 0) return product
    return product.filter(x => x.title.toLowerCase().includes(serch.toLowerCase()))
  }

}
