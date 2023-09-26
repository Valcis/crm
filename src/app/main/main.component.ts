import {Component, EventEmitter, HostListener, OnInit, Output} from '@angular/core';
import {TranslateService} from "@ngx-translate/core";
import {CookiesService} from "../shared/services/cookies/cookies.service";
import {Router} from "@angular/router";
import {UserService} from "../shared/services/api/user/user.service";
import {CrmLoaderService} from "../shared/services/crm-loader/crm-loader.service";
import {BodySize, SideNavSize} from "./main.animations";
import {sharedDataService} from "../shared/services/shared-data/shared-data.service";

@Component({
  selector: 'app-main',
  animations: [BodySize, SideNavSize],
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  @HostListener('window:resize', ['$event'])
  @Output() expander: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() menu: EventEmitter<any> = new EventEmitter<any>();

  public detectResize(event: any): void {
    this.width = window.innerWidth;
  }
  protected isExpanded: boolean = true;
  protected currentLang: string = '';
  protected userData: any;
  private width: number = window.innerWidth;


  constructor(
    private translate: TranslateService,
    private _cookie: CookiesService,
    private _user: UserService,
    private _loader: CrmLoaderService,
    private _router: Router,
    private _shared: sharedDataService
  ) {
    this.currentLang = this._cookie.getLanguage();
    this.translate.setDefaultLang(this.currentLang);
    this.translate.use(this.currentLang);
  }

  async ngOnInit() {
    this._loader.setLoading(true);
  // ngOnInit() {
  //   this._user.getConfig();
  //   this._user.getMenu();
  //   this._user.getActivitiesAlert();
  //   this._user.getNotifications();
     this.userData = this._user.userData.hasOwnProperty("details" && "menu") ? this._user.userData : this._router.navigate(['/login']);
     this._shared.userData = this.userData;
  //   /* TODO : implementar ->
  //   this._user.getUsuarioCrmByEmplCode(); ??????????????????
  //   this._user.getBajaTemporalUsuario();  ?????????????????? */
  //
  //   /*console.log("INFO CARGADA HASTA AQUI EN USER_SERVICE", this._user.userData);*/
    if (!Object.keys(this._user.userData).length) {
      //console.log("no llegan datos de user, posiblemente un F5, volver a lanzar el retrieve...")
      const hasValidIdMessage = await this._user.retrieveUser(this._cookie.getSessionId());
      if (hasValidIdMessage !== "OK") {
        // TODO : lanzar toast con mensaje de "Datos de usuario incorrectos"
        console.error("usuario no valido")
        await this._router.navigate(['/login'])
      }
    }
    this.userData = this._user.userData
    this._loader.setLoading(false);
    console.log("INFO CARGADA HASTA AQUI EN USER_SERVICE", this._user.userData);
  }

  onToggle = () => this.isExpanded = !this.isExpanded;

  protected animationCall() {
    if (this.width >= 754) {
      return "bg"
    } else {
      return "hidden"
    }
  }

  protected readonly Object = Object;
}
