import {Component, Input, OnInit} from '@angular/core';
import {
  faShareNodes, faHome, faGamepad, faHospital, faShoppingCart, faGlobe, faCalendar,
  faChartBar, faHospitalAlt, faBriefcase, faHandshake, faTags, faBullhorn, faUsers, faBarChart, faFile, faLifeRing
} from "@fortawesome/free-solid-svg-icons";

import {IconProp} from "@fortawesome/fontawesome-svg-core";

@Component({
  selector: 'side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss']
})
export class SideNavComponent implements OnInit {
  @Input() public isExpandedFlag: boolean = true;
  @Input() public userData: any;

  crmIcon = faShareNodes;
  public isCollapsed = false;
  private menuIconMap: Map<string, IconProp>;


  public menuList: Array<any> = [
    {
      descripcion: 'MENU_INICIO',
      config_link_pag: '/main',
      contenido: [],
      icono: 'fa-home',
      link_pag: '#/main',
      tipo: 'MENU',
      id_menu_padre: '0',
      nivel: '1',
      subMenu: []
    }
  ];

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

  async ngOnInit () {
    await this.getList();
    console.log('menu list', this.menuList);
  };

  public async getList() {
    if (this.userData.menu) {
      this.userData.menu.menuList.forEach((item: any) => { //TODO: Cambiar por modelo
        this.menuList.push(item)
      })
    }
  };

  getIcon = (icon: string) => {
    return this.menuIconMap.get(icon) || this.crmIcon;
  };

  itemAction = (argument:string) => {
    console.log(argument)
  };

  formatName = (menuName:string) => {
    return menuName.replaceAll('_', '.');
  };
}
