import {Component, EventEmitter, Output} from '@angular/core';
import {
  faBars,
  faUser,
  faUsers,
  faBullhorn,
  faClock,
  faRightFromBracket,
  faImage
} from "@fortawesome/free-solid-svg-icons";
import {CookiesService} from "../../../shared/services/cookies/cookies.service";
import {TranslateService} from "@ngx-translate/core";
import {UserConfigService} from "../../../shared/services/user/user-config.service";
import {Router} from "@angular/router";


@Component({
  selector: 'top-nav',
  templateUrl: './top-nav.component.html',
  styleUrls: ['./top-nav.component.scss']
})
export class TopNavComponent {
  @Output() expander: EventEmitter<boolean> = new EventEmitter<boolean>();
  faBars = faBars;
  faUser = faUser;
  faUsers = faUsers;
  faBullhorn = faBullhorn;
  faClock = faClock;
  faRightFromBracket = faRightFromBracket;
  faImage = faImage;
  lang = '';
  private user: any;

  langList = [
    {code: 'en', lang: 'English', flag: "../../../../assets/images/flags/16/United-States.png"},
    {code: 'es', lang: 'Español', flag: "../../../../assets/images/flags/16/Spain.png"},
  ];


  constructor(
    private translate: TranslateService,
    private cookie: CookiesService,
    private _userConfig: UserConfigService,
    private router: Router
  ) {
    this.lang = cookie.getLanguage();
    console.log("constructor TOPNAV", this.lang)
    this._userConfig.configuredUser.subscribe(a => a.map(user => {
      this.user = user.Salida.datos_user;
    }));
  }

  onExpander = () => this.expander.emit();

  changeLang(localeCode: string) {
    this.lang = localeCode;
    this.translate.use(localeCode);
    this.cookie.setLanguage(localeCode)
  }

  logOut() {
    if (this.user) {
      // console.log('logOut user', this.user);
      // this._userConfig.configuredUser.unsubscribe();
      // this.user.unsubscribe();
      // console.log('logOut unsub', this.user);
      console.log(this.cookie.getSessionId());
      this.cookie.deleteSessionId();
      console.log(this.cookie.getSessionId());
    }
    this.router.navigate(['/login'])
  }

}
