import { Component, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductsResponse } from 'src/app/models/product-response.model';
import { MainService } from '../main.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  mainService: MainService = inject(MainService);
  products: Observable<ProductsResponse> = this.mainService.getAllProducts();
  serachedProducts: Observable<ProductsResponse> = this.mainService.searchProducts();
}
