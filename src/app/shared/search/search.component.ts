import { Component, inject } from '@angular/core';
import { MainService } from 'src/app/main/main.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {

  mainService: MainService = inject(MainService);

  onChangeSearch(searchValue: string): void {
    this.mainService.productSearchSubject.next(searchValue);
  }
}
