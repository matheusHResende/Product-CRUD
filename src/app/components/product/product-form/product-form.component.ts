import { ProductDialogComponent } from './../product-dialog/product-dialog.component';
import { Router, ActivatedRoute } from '@angular/router';
import { ProductService } from '../../../services/product.service';
import { Component, OnInit, Input } from '@angular/core';
import { Product } from '../../../models/product.model';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})


export class ProductFormComponent implements OnInit {
  @Input() Type : string;

  title: string = "";
  button: string = "";
  buttoncolor: string = "";
  disable: boolean = false;

  product : Product = {
    name: '',
    price: null,
    description: '',
    discount: null,
    finalPrice: null
  };

  constructor(private productService : ProductService, private router : Router,private  route : ActivatedRoute, private dialog : MatDialog) {
    
  }

  setupNames() : void {
    const values = {
      "creator": {
        title: "Novo Produto",
        button: "Cadastrar",
        buttoncolor: "primary",
        disable: false
      },
      "updater": {
        title: "Atualizar Produto",
        button: "Atualizar",
        buttoncolor: "warn",
        disable: false
      },
      "deleter": {
        title: "Excluir Produto",
        button: "Excluir",
        buttoncolor: "warn",
        disable: true
      }
    };
    
    this.title = values[this.Type].title;
    this.button = values[this.Type].button;
    this.buttoncolor = values[this.Type].buttoncolor;
    this.disable = values[this.Type].disable;
  }

  setupValues() : void {
    const id = this.route.snapshot.paramMap.get('id');
    this.productService.readOne(id).subscribe( product => {
      this.product = product;
    });
  }

  ngOnInit() : void {
    if (this.Type !== "creator") {
      this.setupValues();  
    }
    this.setupNames();
  }

  calculateFinalPrice() : void {
    this.product.finalPrice = this.product.price * (100 - this.product.discount) / 100;
  }

  submitProduct() : void {
    const actions = {
      "creator": () => {
        const submit = () => {
          this.productService.create(this.product).subscribe(() => {
            this.productService.showMessage('Produto criado com sucesso')
            this.router.navigate(['/products']);
          });
        }
        if (this.product.discount == 100){
          const ref = this.dialog.open(ProductDialogComponent, {
            width: '300px',
            data: 'O produto está com 100% de desconto. Deseja confirmar aoperação?'
          })
          ref.afterClosed().subscribe(result => {
            if(result){
              submit()
            }
          });
        }
        else{
          submit();
        }
      },
      "updater": () => {
        const submit = () => {
          this.productService.update(this.product).subscribe(() => {
            this.productService.showMessage('Produto atualizado com sucesso')
            this.router.navigate(['/products']);
          });
        }
        if (this.product.discount == 100){
          const ref = this.dialog.open(ProductDialogComponent, {
            width: '300px',
            data: 'O produto está com 100% de desconto. Deseja confirmar aoperação?'
          })
          ref.afterClosed().subscribe(result => {
            if(result){
              submit();
            }
          });
        }
        else{
          submit();
        }
      },
      "deleter": () => {
        this.productService.delete(this.product.id).subscribe(() => {
          this.productService.showMessage('Produto excluido com sucesso');
          this.router.navigate(['/products']);
        })
      }
    }
    
    actions[this.Type]();
  }

  cancel() : void {
    this.router.navigate(['/products'])
  }
}
