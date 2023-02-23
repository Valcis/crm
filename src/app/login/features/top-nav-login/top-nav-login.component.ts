import { Component } from '@angular/core';
import { faImage } from '@fortawesome/free-solid-svg-icons';
import { NgbDropdown} from "@ng-bootstrap/ng-bootstrap";
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'top-nav-login',
  templateUrl: './top-nav-login.component.html',
  styleUrls: ['./top-nav-login.component.scss']
})
export class TopNavLoginComponent {
  faImage = faImage;
  defaultLang = 'Español';
  lang = '';

  langList = [
    { code: 'en', lang: 'English', flag: "../../../assets/images/flags/16/United-States.png" },
    { code: 'es', lang: 'Español', flag: "../../../assets/images/flags/16/Spain.png" },
  ];

  constructor (
    private translate: TranslateService
  ) { }

  async changeLang(localeCode: string) {
    const selectedLanguage = this.langList.find(language => language.code === localeCode)?.lang.toString();
    if (selectedLanguage) {
      this.defaultLang = selectedLanguage;
      this.translate.use(localeCode);
    }

    const current = this.translate.currentLang;
  }

}
