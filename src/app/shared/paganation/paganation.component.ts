import { Component, inject, Input } from '@angular/core';
import { MainService } from 'src/app/main/main.service';
import { PaginationType } from '../types/pagination.type';

@Component({
  selector: 'app-paganation',
  templateUrl: './paganation.component.html',
  styleUrls: ['./paganation.component.css']
})
export class PaganationComponent {

  mainService: MainService = inject(MainService);
  currentSkip: number = 0;
  maxPage: number = 1;
  // @Input({required: true}) productsTotal: number = 0;

  previous(): void {
    const currentSkipValue: PaginationType = { ...this.mainService.productPaginationSubject.value }
    this.currentSkip = currentSkipValue.skip - 12;
    this.maxPage = Math.ceil(this.currentSkip/12);
    this.mainService.productPaginationSubject.next({
      ...currentSkipValue,
      skip: this.currentSkip 
    });
  }

  next(): void {
    const currentSkipValue: PaginationType = { ...this.mainService.productPaginationSubject.value }
    this.currentSkip = currentSkipValue.skip + 12;
    this.maxPage = Math.ceil(this.currentSkip/12);
    this.mainService.productPaginationSubject.next({
      ...currentSkipValue,
      skip: this.currentSkip
    });
    console.log(this.currentSkip);
  }
}
