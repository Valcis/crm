import {AfterViewInit, Component, Input, OnInit, Output} from '@angular/core';
import {
  faShareNodes, faHome, faGamepad, faHospital, faShoppingCart, faGlobe, faCalendar,
  faChartBar, faHospitalAlt, faBriefcase, faHandshake, faTags, faBullhorn, faUsers, faBarChart, faFile, faLifeRing
} from "@fortawesome/free-solid-svg-icons";
import { NgbAccordionModule} from "@ng-bootstrap/ng-bootstrap";

import {IconProp} from "@fortawesome/fontawesome-svg-core";

@Component({
  selector: 'side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss']
})
export class SideNavComponent implements OnInit, AfterViewInit {
  @Input() public isExpandedFlag: boolean = true;
  @Input() userData: any;

  crmIcon = faShareNodes;
  public isCollapsed = false;
  private menuIconMap: Map<string, IconProp>;


  menuList: Array<any> = [];

// TODO: MOVER LOS ICONOS A UNA SOLA CARPETA
  constructor() {
    this.menuIconMap = new Map();
    this.menuIconMap.set("fa-share-nodes", faShareNodes)
    this.menuIconMap.set("fa-home", faHome)
    this.menuIconMap.set("fa-gamepad", faGamepad)
    this.menuIconMap.set("fa-hospital", faHospital)
    this.menuIconMap.set("fa-shopping-cart", faShoppingCart)
    this.menuIconMap.set("fa-globe", faGlobe)
    this.menuIconMap.set("fa-calendar", faCalendar)
    this.menuIconMap.set("fa-chart-bar", faChartBar)
    this.menuIconMap.set("fa-calendar", faHospitalAlt)
    this.menuIconMap.set("fa-hospital-o", faBriefcase)
    this.menuIconMap.set("fa-handshake", faHandshake)
    this.menuIconMap.set("fa-tags", faTags)
    this.menuIconMap.set("fa-bullhorn", faBullhorn)
    this.menuIconMap.set("fa-users", faUsers)
    this.menuIconMap.set("fa-bar-chart", faBarChart)
    this.menuIconMap.set("fa-file", faFile)
    this.menuIconMap.set("fa-life-ring", faLifeRing)
  }

  ngOnInit = () => {
    console.log("-- SIDE NAV COMPONENT DATA---", this.userData);
    if (this.userData) {
      console.log(' this.menuList', this.menuList)
    } else {
    }
  };

  ngAfterViewInit = () => {
    this.getList();
  };

  getList = () => {
    if (this.userData) {
      this.userData.menu.menuList.forEach((item:any) => {
        this.menuList.push(item);
      });
    } else {
    }
  };

  // getSectionInfo = (sectionData: any) => "hola";

  getIcon = (icon: string) => this.menuIconMap.get(icon) || this.crmIcon

}
