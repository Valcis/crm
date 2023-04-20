import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {TranslateService} from "@ngx-translate/core";
import {CookiesService} from "../shared/services/cookies/cookies.service";
import {Router} from "@angular/router";
import {UserService} from "../shared/services/user/user.service";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  @Output() expander: EventEmitter<boolean> = new EventEmitter<boolean>();
  public isExpanded: boolean = true;
  currentLang: string = '';
  public userData: any;

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

    /* TODO : implementar ->
    this._user.getUsuarioCrmByEmplCode(); ??????????????????
    this._user.getBajaTemporalUsuario();  ?????????????????? */

    console.log("INFO CARGADA HASTA AQUI EN USER_SERVICE", this._user.userData);
    this.userData = this._user.userData


    /*this._userConfig.configuredUser.subscribe(a => a.map(user => {
      console.log("main component ", user.Salida);
      this.user = user.Salida.datos_user;
    }));*/
  }

  onToggle = () => this.isExpanded = !this.isExpanded;

  back() {
    this.router.navigate(['/login'])
  }
}
