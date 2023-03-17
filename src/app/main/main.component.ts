import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {TranslateService} from "@ngx-translate/core";
import {CookiesService} from "../shared/services/cookies/cookies.service";
import {LoginService} from "../shared/services/user/login.service";
import {Router} from "@angular/router";
import {UserConfigService} from "../shared/services/user/user-config.service";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  public isExpanded: boolean = true;
  currentLang: string = '';
  @Output() expander: EventEmitter<boolean> = new EventEmitter<boolean>();
  public user: any;

  constructor(
    private translate: TranslateService,
    private cookie: CookiesService,
    private _login: LoginService,
    private _userConfig: UserConfigService,
    private router: Router
  ) {
    this.currentLang = this.cookie.getLanguage();
    this.translate.setDefaultLang(this.currentLang);
    this.translate.use(this.currentLang);
  }

   ngOnInit() {
     this._userConfig.configuredUser.subscribe(a => a.map(user => {
       this.user = user.Salida.datos_user;
     }));
   }

   onToggle = () => this.isExpanded = !this.isExpanded;

  back() {
    this.router.navigate(['/login'])
  }
}
