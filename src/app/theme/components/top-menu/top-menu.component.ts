import { Component, OnInit } from '@angular/core';
import { Data, AppService } from '../../../app.service';

@Component({
  selector: 'app-top-menu',
  templateUrl: './top-menu.component.html'
})
export class TopMenuComponent implements OnInit {

  constructor(public appService: AppService) { }

  ngOnInit() {
  }

}
