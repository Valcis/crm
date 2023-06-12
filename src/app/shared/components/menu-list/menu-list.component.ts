import {AfterContentChecked, AfterContentInit, AfterViewInit, Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-menu-list',
  templateUrl: './menu-list.component.html',
  styleUrls: ['./menu-list.component.scss']
})
export class MenuListComponent implements AfterViewInit, AfterContentInit {

  @Input() menuList: Array<any> = [];
  @Input() test: any;

  ngAfterViewInit() {
    console.log(this.test)
  }


  ngAfterContentInit() {
    console.log(this.menuList);
  }

}
