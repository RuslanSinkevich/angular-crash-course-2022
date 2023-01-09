import { Component } from '@angular/core';
import { ModalService } from 'src/app/services/modal.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.scss']
})
export class ProductPageComponent {

  loading = false
  //product$: Observable<IProduct[]>
  term = ''


  constructor(
    public productService: ProductService,
    public modalServices: ModalService) {
  }

  ngOnInit(): void {
    this.loading = true

    this.productService.getAll().subscribe(
      () => this.loading = false)

    //this.product$ = this.productService.getAll().pipe(
    //tap(() => this.loading = false))
  }


  title = 'angular-crash-course-2022';

  // products: IProduct[] = []
}
