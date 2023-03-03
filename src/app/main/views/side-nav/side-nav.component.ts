import {Component, Input, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss']
})
export class SideNavComponent {
  @Input() expanded: boolean = false; // inicializo el side-bar contraido por defecto


  constructor() {
  }


}
