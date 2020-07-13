import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-product-dialog',
  templateUrl: './product-dialog.component.html',
  styleUrls: ['./product-dialog.component.css']
})
export class ProductDialogComponent implements OnInit {
  
  output = {
    True : true,
    False : false
  }

  constructor(public dialogRef : MatDialogRef<ProductDialogComponent>, @Inject(MAT_DIALOG_DATA) public data : string) { }

  ngOnInit(): void {
  }

  approve(approved :boolean = true) : void{
    this.dialogRef.close(approved);
  }
}
