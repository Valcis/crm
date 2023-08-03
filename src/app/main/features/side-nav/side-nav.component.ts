import {Component, HostListener, Input, OnInit} from '@angular/core';
import {CookiesService} from "../../../shared/services/cookies/cookies.service";
import {UserService} from "../../../shared/services/api/user/user.service";
import {Router} from "@angular/router";
import {animate, state, style, transition, trigger} from "@angular/animations";
import { menuListBase} from "../../../shared/models/side-nav/side-nav.model";

//TODO: aplicar opacity de sm a bg, dr hidden a sm i de sm a hidden

@Component({
  selector: 'side-nav',
  animations: [
    trigger('bigSmall', [
      state('*', style({width: '*'})),
      state('bg', style({width: '220px'})),
      state('sm', style({width: '70px'})),
      state('hidden', style({width: 0, opacity: 0, transform: 'translateX(-200%) translateY(10%)'})),
      transition('bg => sm',[animate('0.25s')]),
      transition('bg => hidden', [animate('0.25s')]),
      transition('sm => bg', [animate('0.25s')]),
      transition('sm => hidden', [animate('0.25s')]),
      transition('hidden => bg', [animate('0.25s')]),
      transition('hidden => sm', [animate('0.25s')]),
    ]),
    trigger('column', [
      state('activeCol', style({borderLeft: '4px solid #1ab394'})),
      state('inactiveCol', style({})),
      transition('inactiveCol => activeCol', [animate('0.4s')]),
    ]),
    trigger('head', [
      state('*', style({height: '195'})),
      state('bg', style({height: '195'})),
      state('sm', style({height: '60'})),
      transition('bg => sm', [animate('0.10s',style({height: 140}))]),
    ]),


  ],
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
  protected isCollapsed = false;
  private canRun:boolean=true;
  protected showSm:any=null;
  protected currLink:any;
  private width:number = window.innerWidth;

  //TODO: Mover a objeto externo
  public menuList: Array<menuListBase> = [
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
    }
  }
  protected onAnimationEventEnd(event:any){
    if(event.toState === "bg"){
      this.isBig = true;
    }
  }

  protected animationCall(){

    if(this.width >=754){
      return "bg"
    }else{
      this.isBig = false;
      return "hidden"
    }
  }
}
