import {Component} from '@angular/core';
import {faShareAlt} from '@fortawesome/free-solid-svg-icons';
import {TranslateService} from "@ngx-translate/core";
import {Router} from "@angular/router";
import {CookiesService} from "../shared/services/cookies/cookies.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  faShare = faShareAlt;
  currentLang: string = '';

  constructor(
    private translate: TranslateService,
    private route: Router,
    private cookie: CookiesService
  ) {
    this.currentLang = cookie.getLanguage();
    this.translate.use(cookie.getLanguage())
  }

  navigate() {
    this.route.navigate(['/main'])
  }
}
