import {Component, HostListener, Input, OnInit} from '@angular/core';
import {CookiesService} from "../../../shared/services/cookies/cookies.service";
import {UserService} from "../../../shared/services/api/user/user.service";
import {Router} from "@angular/router";
import {menuItem, menuListBase, pageItemBase} from "../../../shared/models/side-nav.model";
import {ActivePage, Items, Opaque, Sizer} from "./side-nav.animation";


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
  private canRun:boolean=true;
  protected showSm:any=null;
  protected currLink:any;
  private width:number = window.innerWidth;
  protected menuList:Array<menuListBase> = [menuItem];

  constructor(private _cookie: CookiesService,
              private _user: UserService,
              private _router: Router)
  { }

  async ngOnInit () {
    await this.getList();
  };

  public async getList() {
    if (this.userData.menu) {
      this.userData.menu.menuList.forEach((item: pageItemBase) => { //TODO: mirar aviso
        item.icono = 'fa ' + item.icono;
        this.menuList.push(item);
        return item;
      });
    }
  };

  formatName = (menuName: string) => menuName.replaceAll('_', '.');

  logOut() {
    if (this._user) {
      this._cookie.deleteSessionId();
    }
    this._router.navigate(['login'])
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

    if(this.width >=754) {
      return "bg"
    }else{
      this.isBig = false;
      return "hidden"
    }
  }
}
