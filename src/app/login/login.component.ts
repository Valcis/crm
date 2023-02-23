import { Component, OnInit } from '@angular/core';
import { faShareAlt } from '@fortawesome/free-solid-svg-icons';
import {LangChangeEvent, TranslateService} from "@ngx-translate/core";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  faShare = faShareAlt;
  lang =  '';
  currentLang: string = '';

  constructor(
    private translate: TranslateService,
    private route: Router
  ) {
    if(this.currentLang !== (undefined || ''))
    this.changeLang(this.translate.currentLang);
    this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
      this.changeLang(event.lang);
    })
  }

  ngOnInit(): void {
  }

  changeLang(lang: string) {
    if(this.currentLang === lang) {
      return;
    }
    this.currentLang = lang;
    this.translate.currentLang = '';
    this.translate.use(lang);
  }

  navigate() {
    this.route.navigate(['/main'])
  }
}
