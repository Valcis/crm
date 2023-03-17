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

  langList = [
    {code: 'en', lang: 'English', flag: "../../../../assets/images/flags/16/United-States.png"},
    {code: 'es', lang: 'Español', flag: "../../../../assets/images/flags/16/Spain.png"},
  ];


  constructor(
    private translate: TranslateService,
    private cookie: CookiesService
  ) {
    this.lang = cookie.getLanguage();
    console.log("constructor TOPNAV", this.lang)
  }

  onExpander = () => this.expander.emit();

  changeLang(localeCode: string) {
    this.lang = localeCode;
    this.translate.use(localeCode);
    this.cookie.setLanguage(localeCode)
  }


}
