import {Component, OnInit} from '@angular/core';
import {TranslateService} from "@ngx-translate/core";
import {CookieService} from "ngx-cookie-service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  cookie_name='';
  all_cookies:any='';
  title = 'crm2';
  lang: string = '';
  currentLang: string = '';

  constructor(
    private translate: TranslateService,
    private cookieService:CookieService
  ) {
  }

  setCookie(){
    this.cookieService.set('idioma','ES');
  }

  deleteCookie(){
    this.cookieService.delete('idioma');
  }

  deleteAll(){
    this.cookieService.deleteAll();
  }

  ngOnInit() {
    this.cookie_name=this.cookieService.get('idioma');
    this.all_cookies=this.cookieService.getAll();  // get all cookies object

    if (this.currentLang === (undefined || '')) {
      this.setBrowLang();
    } else {
    }
  }



  async setBrowLang() {
    this.currentLang = this.translate.getBrowserLang() as string;
    this.translate.use(this.currentLang);
  }

}
