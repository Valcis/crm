import {Component, EventEmitter, Output} from '@angular/core';
import {faImage} from '@fortawesome/free-solid-svg-icons';
import {TranslateService} from "@ngx-translate/core";
import {CookiesService} from "../../../shared/services/cookies/cookies.service";

@Component({
  selector: 'top-nav-login',
  templateUrl: './top-nav-login.component.html',
  styleUrls: ['./top-nav-login.component.scss']
})
export class TopNavLoginComponent {
  public faImage = faImage;
  public lang = '';
  public langList = [
    {code: 'en', lang: 'English', flag: "../../../assets/images/flags/16/United-States.png"},
    {code: 'es', lang: 'Español', flag: "../../../assets/images/flags/16/Spain.png"},
  ];
  public backgroundImage: Array<string> = [
    "../../../assets/images/login/barcelona.jpg",
    "../../../assets/images/login/madrid.jpg",
    "../../../assets/images/login/berlin.jpg",
    "../../../assets/images/login/bruselas.jpg",
    "../../../assets/images/login/budapest.jpg",
    "../../../assets/images/login/lisboa.jpg",
    "../../../assets/images/login/munich.jpg",
    "../../../assets/images/login/nueva-york.jpg",
    "../../../assets/images/login/praga.jpg"
  ];

  @Output() backImgEvent = new EventEmitter<string>();


  constructor(
    private translate: TranslateService,
    private cookie: CookiesService) {
    if (!this.cookie.getLanguage() || this.cookie.getLanguage() === '') {
      this.translate.use('es');
    }
  }

  async changeLang(localeCode: string) {
    this.lang = localeCode;
    this.translate.use(localeCode);
    this.cookie.setLanguage(localeCode)
  }

  async setBackgroundImage(value: string) {
    this.backImgEvent.emit(value);
  }
}
