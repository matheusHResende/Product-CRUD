import { Product } from './../../../models/product.model';
import { ProductService } from './../../../services/product.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-product-table',
  templateUrl: './product-table.component.html',
  styleUrls: ['./product-table.component.css']
})
export class ProductTableComponent implements OnInit {
  products : Product[];
  columnsToDisplay = ['id', 'name', 'price', 'discount', 'finalPrice', 'description', 'actions']

  actualPage : number;

  constructor(private productService : ProductService) { }

  ngOnInit(): void {
    this.actualPage = 1;
    this.loadPage();
  }
  
  loadPage() : void {
    this.productService.readPage(this.actualPage, 5).subscribe(products => {
      this.products = products;
    });
  }

  nextPage() : void {
    this.actualPage++;
    this.loadPage();
  }

  lastPage() : void {
    if(this.actualPage != 1){
      this.actualPage--;
      this.loadPage();
    }
  }
}
