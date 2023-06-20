import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {
  faBars, faUser, faUsers, faBullhorn, faClock, faRightFromBracket, faImage
} from "@fortawesome/free-solid-svg-icons";
import {CookiesService} from "../../../shared/services/cookies/cookies.service";
import {TranslateService} from "@ngx-translate/core";
import {Router} from "@angular/router";
import {UserService} from "../../../shared/services/api/user/user.service";


@Component({
  selector: 'top-nav',
  templateUrl: './top-nav.component.html',
  styleUrls: ['./top-nav.component.scss']
})
export class TopNavComponent implements OnInit{
  @Output() expander: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Input() mydata:any;
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
    private _user: UserService,
    private router: Router
  ) {
    this.lang = cookie.getLanguage();
    this.user = this._user.userData;
  }

  ngOnInit(): void {
    // console.log("--- TOP NAV COMPONENT DATA---", this.mydata);
  }

  onExpander = () => this.expander.emit();

  changeLang(localeCode: string) {
    this.lang = localeCode;
    this.translate.use(localeCode);
    this.cookie.setLanguage(localeCode)
  }

  logOut() {
    if (this.user) {
      this.cookie.deleteSessionId();
    }
    this.router.navigate(['/login'])
  }

}
