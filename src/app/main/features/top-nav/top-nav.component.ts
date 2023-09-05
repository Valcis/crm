import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
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
  @Input() userData:any;
  lang = '';
  private user: any;

  langList = [
    {code: 'en', lang: 'English', flag: "assets/images/flags/16/United-States.png"},
    {code: 'es', lang: 'Español', flag: "assets/images/flags/16/Spain.png"},
  ];


  constructor(
    private translate: TranslateService,
    private _cookie: CookiesService,
    private _user: UserService,
    private _router: Router
  ) {
    this.lang = _cookie.getLanguage();
    this.user = this._user.userData;
  }

  ngOnInit(): void {
    // console.log("--- TOP NAV COMPONENT DATA---", this.mydata);
  }

  onExpander = () => this.expander.emit();

  changeLang(localeCode: string) {
    this.lang = localeCode;
    this.translate.use(localeCode);
    this._cookie.setLanguage(localeCode)
  }

  logOut() {
    if (this.user) {
      this._cookie.deleteSessionId();
    }
    this._router.navigate(['index.html#/login'])
  }

}
