import {Component, EventEmitter, Output} from '@angular/core';

@Component({
  selector: 'top-nav',
  templateUrl: './top-nav.component.html',
  styleUrls: ['./top-nav.component.scss']
})
export class TopNavComponent {
  @Output() expander: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor() {
  }

  onExpander = (currentValue:boolean) => this.expander.emit(!currentValue);
}
