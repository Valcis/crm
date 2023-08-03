import {Component, EventEmitter, HostListener, OnInit, Output} from '@angular/core';
import {TranslateService} from "@ngx-translate/core";
import {CookiesService} from "../shared/services/cookies/cookies.service";
import {Router} from "@angular/router";
import {UserService} from "../shared/services/api/user/user.service";
import {animate, state, style, transition, trigger} from "@angular/animations";

@Component({
  selector: 'app-main',
  animations: [
    trigger('bigSmall', [
      state('*', style({marginLeft: '*'})),
      state('bg', style({marginLeft: '220px'})),
      state('sm', style({marginLeft: '70px'})),
      state('hidden', style({marginLeft: '0px'})),
      transition('* => *',animate('0.25s')),
    ]),trigger('bigSmallSide', [
      state('*', style({width: '*'})),
      state('bg', style({width: '220px'})),
      state('sm', style({width: '70px'})),
      state('hidden', style({width: '0px'})),
      transition('sm => hidden', animate('0.25s', style({ opacity: 0,width: '0px'}))),
      transition('bg => sm',  animate('0.25s')),
      transition('sm => bg',  animate('0.25s')),
      transition('bg => hidden', animate('0.25s', style({ opacity: 0,width: '0px'}))),
      transition('hidden => sm', animate('0.25s')),
      //TODO:No es igual pero no se com fer el mateix. ho fan extrany
      transition('hidden => bg', animate('0.25s')),
    ]),
  ],
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
    private router: Router
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

    /* TODO : implementar ->
    this._user.getUsuarioCrmByEmplCode(); ??????????????????
    this._user.getBajaTemporalUsuario();  ?????????????????? */

    /*console.log("INFO CARGADA HASTA AQUI EN USER_SERVICE", this._user.userData);*/


  }

  onToggle = () => this.isExpanded = !this.isExpanded;


  //lo dejo aqui solo para poder tirar al login cuando falla persistencia de datos
  logOut = () => this.router.navigate(['/login']);


  back = () => this.router.navigate(['/login']);

  protected animationCall(){
    if(this.width >=754){
      return "bg"
    }else{
      return "hidden"
    }
  }
}
