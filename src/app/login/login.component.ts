import {Component, OnInit} from '@angular/core';
import {faShareAlt} from '@fortawesome/free-solid-svg-icons';
import {TranslateService} from "@ngx-translate/core";
import {Router} from "@angular/router";
import {CookiesService} from "../shared/services/cookies/cookies.service";
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

  constructor(
    private translate: TranslateService,
    private route: Router,
    private cookie: CookiesService,
    private http: HttpClient,
    private _user: UserService
  ) {
    if (cookie.getLanguage() === '' || !cookie.getLanguage()) {
      this.translate.use('es')
    } else {
      this.currentLang = cookie.getLanguage();
      this.translate.use(cookie.getLanguage())
    }
  }

  ngOnInit(): void {
    this._user.requestUserService(this.test);
  }

  navigate() {
    this.route.navigate(['/main']);
  }
}
