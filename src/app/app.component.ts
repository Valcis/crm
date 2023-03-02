import {Component, OnInit} from '@angular/core';
import {TranslateService} from "@ngx-translate/core";
import {CookiesService} from "./shared/services/cookies/cookies.service";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'crm2';
  currentLang: string = '';

  constructor(private translate: TranslateService, private cookie: CookiesService) {
    this.currentLang = cookie.getLanguage();
  }

  ngOnInit() {
    if (!this.currentLang || this.currentLang === '')
      this.setBrowLang();
  }

  async setBrowLang() {
    this.currentLang = this.translate.getBrowserLang() as string;
    this.translate.use(this.currentLang);
  }

}
