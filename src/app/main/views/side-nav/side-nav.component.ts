import {Component, Input, Output, EventEmitter, OnChanges} from '@angular/core';
import {NavTogglerService} from "../../../shared/services/navToggler/nav-toggler.service";

@Component({
  selector: 'side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss']
})
export class SideNavComponent {
  @Input() public isExpandedFlag: boolean = true;

  constructor() {

    console.log('Constructor de SIDENAV', this)
  }


}
