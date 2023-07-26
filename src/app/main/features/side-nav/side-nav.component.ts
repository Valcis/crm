import {Component, Input, OnInit} from '@angular/core';
import {CookiesService} from "../../../shared/services/cookies/cookies.service";
import {UserService} from "../../../shared/services/api/user/user.service";
import {Router} from "@angular/router";


@Component({
  selector: 'side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss']
})
export class SideNavComponent implements OnInit {
  @Input() public isExpandedFlag: boolean = true;
  @Input() public userData: any;

  protected isOpen:any = null;
  public isCollapsed = false;

  //TODO: Mover a objeto externo
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

  constructor(private _cookie: CookiesService,
              private _user: UserService,
              private _router: Router)
  {

  }

  async ngOnInit () {
    //console.log('userData', this.userData);
    await this.getList();
  };

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

  // itemAction = (argument:string) => {
  //   console.log(argument)
  // };

  formatName = (menuName:string) => {
    return menuName.replaceAll('_', '.');
  };

  logOut() {
    if (this._user) {
      this._cookie.deleteSessionId();
    }
    this._router.navigate(['/login'])
  }
  toggleOpen(item: any){
    if(this.isOpen === item){
      this.isOpen=null;
    }else{
      this.isOpen=item;
    }

  }
}
