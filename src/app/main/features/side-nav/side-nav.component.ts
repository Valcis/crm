import {Component, Input, OnInit} from '@angular/core';


@Component({
  selector: 'side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss']
})
export class SideNavComponent implements OnInit {
  @Input() public isExpandedFlag: boolean = true;
  @Input() public userData: any;

  public isCollapsed = false;


  public menuList: Array<any> = [
    {
      descripcion: 'MENU_INICIO',
      config_link_pag: '/main',
      contenido: [],
      icono: 'fa fa-home',
      link_pag: '/main',
      tipo: 'MENU',
      id_menu_padre: '0',
      nivel: '1',
      subMenu: []
    }
  ];

// TODO: MOVER LOS ICONOS A UNA SOLA CARPETA
  constructor() {
    // this.menuIconMap = new Map();

  }

  async ngOnInit () {
    //console.log('userData', this.userData);
    await this.getList();
    // console.log('menu list', this.menuList);
  };

  // public async modifyName(item: any) {
  //   console.log('first', item.icono);
  //   if (item.icono='fa-hospital-o') {
  //     console.log('hosp', item.icono);
  //     item.icono = 'building';
  //   }
  //   if (item.icono.includes('fa-')) {
  //     item.icono = item.icono.split('fa-');
  //     item.icono =  item.icono[1];
  //     console.log('icono',  item.icono);
  //     return item.icono;
  //   } else {
  //     item.icono = 'share';
  //   }
  // }

  public async getList() {
    if (this.userData.menu) {
      //console.log('userData', this.userData);
      this.userData.menu.menuList.forEach((item: any) => { //TODO: Cambiar por modelo
        item.icono = 'fa ' + item.icono;
        this.menuList.push(item);
        return item;
      })
    }
  };

  // getIcon = (icon: string) => {
  //   return this.menuIconMap.get(icon) || this.crmIcon;
  // };

  itemAction = (argument:string) => {
    console.log(argument)
  };

  formatName = (menuName:string) => {
    return menuName.replaceAll('_', '.');
  };
}
