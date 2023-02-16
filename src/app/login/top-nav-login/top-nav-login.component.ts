import { Component } from '@angular/core';
import { faImage } from '@fortawesome/free-solid-svg-icons';
import { NgbDropdown} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'top-nav-login',
  templateUrl: './top-nav-login.component.html',
  styleUrls: ['./top-nav-login.component.scss']
})
export class TopNavLoginComponent {
  faImage = faImage;
}
