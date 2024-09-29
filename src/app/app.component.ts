import { Component, inject, OnInit } from '@angular/core';
import { MainService } from './main/main.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  mainService: MainService = inject(MainService);

  ngOnInit(): void {
    
  }
}
