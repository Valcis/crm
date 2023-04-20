import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {TranslateService} from "@ngx-translate/core";
import {CookiesService} from "../shared/services/cookies/cookies.service";
import {LoginService} from "../shared/services/user/login.service";
import {Router} from "@angular/router";
import {UserConfigService} from "../shared/services/user/user-config.service";
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
  public userDetails: any;

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
    //console.log("----MAIN-------->", this.userDetails)
    this.userDetails = this._user.userData.details
    //console.log("----trae--->", this._user.userData.details)

    this._user.getConfig( this.userDetails.details.empl_code, this.userDetails.details.id)


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
