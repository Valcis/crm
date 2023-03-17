import {Component, OnInit} from '@angular/core';
import {faShareAlt} from '@fortawesome/free-solid-svg-icons';
import {TranslateService} from "@ngx-translate/core";
import {Router} from "@angular/router";
import {CookiesService} from "../shared/services/cookies/cookies.service";
import {HttpClient} from "@angular/common/http";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Subscription} from "rxjs";
import {LoginRs} from "../shared/models/user/login.model";
import {UserConfigService} from "../shared/services/user/user-config.service";
import {UserConfig} from "../shared/models/user/user-config.model";
import {LoginService} from "../shared/services/user/login.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  faShare = faShareAlt;
  currentLang: string = '';
  public loginForm!: FormGroup;
  public submitted: boolean = false;
  public username: string = '';
  public password: string = '';
  public sub: Subscription;
  private sendLogin: boolean = false;
  public loginUser: any;
  public user: any;


  constructor(
    private translate: TranslateService,
    private route: Router,
    private cookie: CookiesService,
    private http: HttpClient,
    private _login: LoginService,
    private _userConfig: UserConfigService
  ) {
    if (cookie.getLanguage() === '' || !cookie.getLanguage()) {
      this.translate.use('es')
    } else {
      this.currentLang = cookie.getLanguage();
      this.translate.use(cookie.getLanguage())
    }
    this.sub = new Subscription();
  }

  async ngOnInit(): Promise<void> {
    this.loadForm();
    if (this.loginUser) {
      this._login.loginSubject.subscribe(a => a.map(loginUser => {
      this.loginUser = loginUser.Salida
    }))}

    this.validateUser();
  }

  // Angular Forms

  private loadForm(): void {
    this.loginForm = new FormGroup({
      username: new FormControl<string>('', Validators.required),
      password: new FormControl('', Validators.required),
      sessionId: new FormControl(''),
      recordarUsuario: new FormControl(false)
    });
  }

  // Effect

  public login(): void {
    if (this.loginForm.valid) {
      this._login.loadGetLogin(this.loginForm.value);
      if (this.loginUser) {
        this.processLogin();
      }
    }
  }

  // Subject validation
  private validateUser(): void {
    this.sub.add((this._login.user.subscribe( (response) => {
      response.map( user => this.loginUser = user);
        return this.loginUser;
    })));
  }

  private processLogin(): void {
    this.cookie.setSessionId(this.loginUser.Id);
    if (this.loginUser.Status === 'OK') {
      let now = new Date();
      let minutes = this.loginUser.Salida.tiempo_sesion;

      //Hacer código de duración de sesión
      const userResp: LoginRs = {
        Salida: this.loginUser.Salida
      };

      const userConfigParams: UserConfig = {
        id: +userResp.Salida.empl_code
      };

      this._userConfig.loadUserConfig(userConfigParams);
      this.sub.add((this._userConfig.configUser.subscribe((response) => {
        response.map( user => this.user = user);
        return this.user;
      })));

      this.sendLogin =  true;

      this.route.navigate(['/main']);
    } else {
      console.log('Credenciales incorrectos');
    }
  }
}
