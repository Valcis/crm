import { Component, OnInit } from '@angular/core';
import { faShareAlt } from '@fortawesome/free-solid-svg-icons';
import {LangChangeEvent, TranslateService} from "@ngx-translate/core";
import {Router} from "@angular/router";
import {UserService} from "../shared/services/user.service";
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";

interface Users {
  username: string,
  password: string
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  faShare = faShareAlt;
  lang =  '';
  currentLang: string = '';

  // TODO: pasar a un FORM desde el front
  test: any = {
    'Metodo': 'GetLoginCRM',
    'Servicio': "usuarios",
    'Entrada': {
      'username': 'aprieto',
      'password': 'prieto',
      'user_session_id': '',
      'recordarUsuario': false
    }
  };

  users: Observable<Users[]> = new Observable<Users[]>();

  constructor(
    private translate: TranslateService,
    private route: Router,
    private http: HttpClient,
    private _user: UserService
  ) {
    if(this.currentLang !== (undefined || ''))
    this.changeLang(this.translate.currentLang);
    this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
      this.changeLang(event.lang);
    })
  }

  ngOnInit(): void {
    this._user.requestUserService(this.test);
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
    this.route.navigate(['/main']);
  }
}
