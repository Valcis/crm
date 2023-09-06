import {Component, HostListener, Input, OnInit} from '@angular/core';
import {CookiesService} from "../../../shared/services/cookies/cookies.service";
import {UserService} from "../../../shared/services/api/user/user.service";
import {Route, Router, Routes} from "@angular/router";
import {menuItem, menuListBase} from "../../../shared/models/side-nav.model";
import {ActivePage, Items, Opaque, Sizer} from "./side-nav.animation";
import {Observable, of} from "rxjs";
import {MainComponent} from "../../main.component";
import {GraficosComponent} from "../content/graficos/graficos.component";
import {InicioDesarrolladorComponent} from "../content/inicio-desarrollador/inicio-desarrollador.component";
import {ProveedoresProductoComponent} from "../content/proveedores-producto/proveedores-producto.component";
import {CalendarioComponent} from "../content/calendario/calendario.component";
import {ActividadesComponent} from "../content/actividades/actividades.component";
import {NotificacionesComponent} from "../content/notificaciones/notificaciones.component";
import {LinksComponent} from "../content/documentacion/links/links.component";
import {ChannelManagerComponent} from "../content/documentacion/channel_manager/channel_manager.component";
import {FilesComponent} from "../content/documentacion/files/files.component";


@Component({
  selector: 'side-nav',
  animations: [Sizer,ActivePage,Items,Opaque],
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss']
})
export class SideNavComponent implements OnInit {
  @HostListener('window:resize', ['$event'])
  public detectResize(event:any): void {
    this.width = window.innerWidth;
  }
  @Input() public isExpandedFlag: boolean = true;
  @Input() public userData: any;

  protected isOpen:any = null;
  protected isBig:boolean = true;
  protected isOpaque:boolean = true;

  protected itemsSize:boolean = true;
  protected isCollapsed = false;
  private canRun:boolean=true;
  protected showSm:any=null;
  protected currLink:any;
  private width:number = window.innerWidth;

  protected menuList:Array<menuListBase> = [menuItem];

  constructor(private _cookie: CookiesService,
              private _user: UserService,
              private _router: Router)
  {

  }

  async ngOnInit () {
    await this.getList();

  };

  public async getList() {
    if (this.userData.menu) {
      this.userData.menu.menuList.forEach((item: any) => { //TODO: Cambiar por modelo
        item.icono = 'fa ' + item.icono;
        this.menuList.push(item);
        return item;
      })
    }
  };

  formatName = (menuName:string) => {
    return menuName.replaceAll('_', '.');
  };

  logOut() {
    if (this._user) {
      this._cookie.deleteSessionId();
    }
    this._router.navigate(['/login'])
  }

  private toggleOpen(item: any){
    if(this.isOpen === item){
      this.isOpen=null;
    }else{
      this.isOpen=item;
    }
  }

  protected async controlTime(index:any) {
    if (this.canRun) {
      this.toggleOpen(index);
      this.canRun = false;
      setTimeout(()=>{this.canRun = true;}, 350);
    }
  }

  protected changeLink(i:any){
    this.currLink=i;
  }


  protected onAnimationEventStart(event:any){
    if(event.toState === "sm"){
      this.isBig = false;
      this.itemsSize = false;
      if(event.fromState === 'hidden'){
        this.isOpaque = false;
      }
    } else{
      this.isOpaque = false;

      this.itemsSize = true;
    }
  }
  protected onAnimationEventEnd(event:any){
    if(event.toState === "bg"){
      this.isBig = true;
    }
    this.isOpaque = true;

  }

  protected animationCall(){

    if(this.width >=754){
      return "bg"
    }else{
      this.isBig = false;
      return "hidden"
    }
  }
  private resetRouting(){
    /*this.routesFormater().subscribe((data: Routes) =>{
      this._router.resetConfig(routes);
    });*/
    this.getUrl().subscribe((data: Routes) => {
      this._router.resetConfig(data);
    })
  }
  private routesFormater(): Observable<Routes>{
    let pages:any = this.pageGetter(this.menuList);
    return of ([
      {
        path: '',
        component: MainComponent,
        data: {
          shouldReuse: true,
          key: 'crm/app/index/main'
        },
        children: pages
      },
    ])
  }

  private pageGetter(menuList:Array<any>){
    let pages:Array<any> = [];
    menuList.forEach((pageData:any) =>{
      if(pageData.subMenu.length === 0){
        let page = pageData.config_link_pag;
        let descripcion = pageData.descripcion;
        pages.push({path: page, component: GraficosComponent, data:{breadcrumb:{alias: descripcion}}})
      }else{
        pageData.subMenu.forEach((subPageData:any) =>{
          let page = '/index'+subPageData.config_link_pag;
          let descripcion = subPageData.descripcion;
          pages.push({path: page, component: GraficosComponent, data:{breadcrumb:{alias: descripcion}}})
        });
      }
    });
    return pages
  }

  getUrl(): Observable<Routes> {
    return of([
      {
        path: '',
        component: MainComponent,
        data: {
          shouldReuse: true,
          key: 'crm/app/index/main'
        },
        children: [
          {path: '#/crm_graficos', component: InicioDesarrolladorComponent, data:{breadcrumb:{alias:"graf"}}},
          {path: '#/crm_inicio_desarrollador', component: InicioDesarrolladorComponent, data:{breadcrumb:{alias:"initDev"}}},
          {path: '#/index/crm_lista_proveedores_producto', component: InicioDesarrolladorComponent, data:{breadcrumb:{alias:"providers"}}}, //TODO: cambiar a lista
          {path: '#/crm_calendario', component: CalendarioComponent, data:{breadcrumb:{alias:"calendar"}}},
          {path: '#/index/crm_lista_actividades', component: ActividadesComponent, data:{breadcrumb:{alias:"activitiesList"}}},
          {path: '#/index/crm_lista_notificaciones', component: NotificacionesComponent, data:{breadcrumb:{alias:"notificationList"}}},
          {path: '#/index/crm_lista_links', component: LinksComponent, data:{breadcrumb:{alias:"links"}}},
          {path: '#/index/crm_channelmanager', component: ChannelManagerComponent, data:{breadcrumb:{alias:"channelManager"}}},
          {path: '#/index/crm_lista_ficheros', component: FilesComponent, data:{breadcrumb:{alias:"files"}}}
        ]
      }
    ]);
  }
}


const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    data: {
      shouldReuse: true,
      key: 'crm/app/index/main'
    },
    children: [
      {path: '#/crm_graficos', component: InicioDesarrolladorComponent, data:{breadcrumb:{alias:"graf"}}},
      {path: '#/crm_inicio_desarrollador', component: InicioDesarrolladorComponent, data:{breadcrumb:{alias:"initDev"}}},
      {path: '#/index/crm_lista_proveedores_producto', component: InicioDesarrolladorComponent, data:{breadcrumb:{alias:"providers"}}}, //TODO: cambiar a lista
      {path: '#/crm_calendario', component: CalendarioComponent, data:{breadcrumb:{alias:"calendar"}}},
      {path: '#/index/crm_lista_actividades', component: ActividadesComponent, data:{breadcrumb:{alias:"activitiesList"}}},
      {path: '#/index/crm_lista_notificaciones', component: NotificacionesComponent, data:{breadcrumb:{alias:"notificationList"}}},
      {path: '#/index/crm_lista_links', component: LinksComponent, data:{breadcrumb:{alias:"links"}}},
      {path: '#/index/crm_channelmanager', component: ChannelManagerComponent, data:{breadcrumb:{alias:"channelManager"}}},
      {path: '#/index/crm_lista_ficheros', component: FilesComponent, data:{breadcrumb:{alias:"files"}}}
    ]
  }
];
