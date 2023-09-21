import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NavTogglerService {
  hideSideNav: boolean = false;

  constructor() {

  }

  toggleSideNav(): void {
    this.hideSideNav = !this.hideSideNav;
    console.log('sidenav-value', this.hideSideNav)
  }
}
