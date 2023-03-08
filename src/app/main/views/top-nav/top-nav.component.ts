import {Component, EventEmitter, Output} from '@angular/core';


@Component({
  selector: 'top-nav',
  templateUrl: './top-nav.component.html',
  styleUrls: ['./top-nav.component.scss']
})
export class TopNavComponent {
  @Output() expander: EventEmitter<boolean> = new EventEmitter<boolean>();


  constructor() {
    console.log("constructor TOPNAV", this)
  }

  onExpander = () => this.expander.emit();


}
