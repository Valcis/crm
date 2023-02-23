import {Component} from '@angular/core';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent {
  public isExpanded: boolean = true;

  onExpand = (currentValue: boolean) => this.isExpanded = !currentValue;

}
