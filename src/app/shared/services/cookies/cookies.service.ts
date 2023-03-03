import {Injectable, OnInit} from '@angular/core';
import {CookieService} from "ngx-cookie-service";

@Injectable({
  providedIn: 'root'
})
export class CookiesService {
  _cookieService: any;

  constructor(private cookieService: CookieService) {
    this._cookieService = cookieService;
  }

  setLanguage(language: string) {
    this._cookieService.set("language", language)
  }

  deleteLanguage() {
    this._cookieService.delete('language');
  }

  deleteAll() {
    this._cookieService.deleteAll();
  }

  getLanguage(): string {
    return this._cookieService.get("language")
  }

}
