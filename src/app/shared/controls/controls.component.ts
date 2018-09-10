import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { Data, AppService } from '../../app.service';
import { Product } from '../../app.models';

@Component({
  selector: 'app-controls',
  templateUrl: './controls.component.html',
  styleUrls: ['./controls.component.scss']
})
export class ControlsComponent implements OnInit {
  @Input() product: Product;
  @Input() type: string;
  @Output() onOpenProductDialog: EventEmitter<any> = new EventEmitter();
  @Output() onQuantityChange: EventEmitter<any> = new EventEmitter<any>();
  public count:number = 1;
  public align = 'center center';
  constructor(public appService: AppService, public snackBar: MatSnackBar) { }

  ngOnInit() {
    if (this.product) {
     // console.log(this.product);
    }
    this.layoutAlign();
  }

  public layoutAlign() {
    if (this.type == 'all') {
      this.align = 'space-between center';
    } else if (this.type == 'wish') {
      this.align = 'start center';
    } else {
      this.align = 'center center';
    }
  }



  public increment() {
    if (this.count < this.product.availibilityCount) {
      this.count++;
      let obj = {
        productId: this.product.id,
        soldQuantity: this.count,
        total: this.count * this.product.newPrice
      }
      this.changeQuantity(obj);
    } else {
      this.snackBar.open('Produto Esgotado. No estoque só tem ' + this.count + ' item(s).', '×', { panelClass: 'error', verticalPosition: 'top', duration: 3000 });
    }
  }

  public decrement() {
    if (this.count > 1) {
      this.count--;
      let obj = {
        productId: this.product.id,
        soldQuantity: this.count,
        total: this.count * this.product.newPrice
      }
      this.changeQuantity(obj);
    }
  }

  public addToCart(product: Product) {
    this.appService.addToCart(product);
  }

  public openProductDialog(event) {
    this.onOpenProductDialog.emit(event);
  }

  public changeQuantity(value) {
      this.onQuantityChange.emit(value);
  }

}