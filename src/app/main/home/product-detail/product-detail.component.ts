import { Component, inject } from '@angular/core';
import { MainService } from '../../main.service';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/models/product.model';
import { Observable, concatMap } from 'rxjs';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent {

  mainService: MainService = inject(MainService);
  activatedRoute: ActivatedRoute = inject(ActivatedRoute);
  
  product: Observable<Product> = this.activatedRoute.paramMap.pipe(concatMap((param) => {
    const id = param.get('id');
    return this.mainService.getProduct(Number(id));
  }));

}
