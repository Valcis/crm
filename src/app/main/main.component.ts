import {Component, EventEmitter, HostListener, OnInit, Output} from '@angular/core';
import {TranslateService} from "@ngx-translate/core";
import {CookiesService} from "../shared/services/cookies/cookies.service";
import {Router} from "@angular/router";
import {UserService} from "../shared/services/api/user/user.service";
import {BodySize, SideNavSize} from "./main.animations";
import {sharedDataService} from "../shared/services/shared-data/shared-data.service";

@Component({
  selector: 'app-main',
  animations: [BodySize,SideNavSize],
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  @HostListener('window:resize', ['$event'])
  public detectResize(event:any): void {
    this.width = window.innerWidth;
  }
  @Output() expander: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() menu: EventEmitter<any> = new EventEmitter<any>();

  public isExpanded: boolean = true;
  currentLang: string = '';
  userData: any;
  private width:number=window.innerWidth;


  constructor(
    private translate: TranslateService,
    private cookie: CookiesService,
    private _user: UserService,
    private router: Router,
    private _shared: sharedDataService
  ) {
    this.currentLang = this.cookie.getLanguage();
    this.translate.setDefaultLang(this.currentLang);
    this.translate.use(this.currentLang);
  }

  ngOnInit() {
    this._user.getConfig();
    this._user.getMenu();
    this._user.getActivitiesAlert();
    this._user.getNotifications();
    this.userData = this._user.userData.hasOwnProperty("details" && "menu") ? this._user.userData : this.router.navigate(['/login']);
    this._shared.userData = this.userData;
    /* TODO : implementar ->
    this._user.getUsuarioCrmByEmplCode(); ??????????????????
    this._user.getBajaTemporalUsuario();  ?????????????????? */

    /*console.log("INFO CARGADA HASTA AQUI EN USER_SERVICE", this._user.userData);*/


  }

  onToggle = () => this.isExpanded = !this.isExpanded;


  //lo dejo aqui solo para poder tirar al login cuando falla persistencia de datos
  logOut = () => this.router.navigate(['login']);


  back = () => this.router.navigate(['login']);

  protected animationCall(){
    if(this.width >=754){
      return "bg"
    }else{
      return "hidden"
    }
  }
}
