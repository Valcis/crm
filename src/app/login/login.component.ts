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
import {UserMenuService} from "../shared/services/user/user-menu.service";

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
  public userMen: any;
  bImage: string = '../../assets/images/login/barcelona.jpg';



  constructor(
    private translate: TranslateService,
    private route: Router,
    private cookie: CookiesService,
    private http: HttpClient,
    private _login = new LoginService({username: "string",password: "string"}),
    private _userConfig: UserConfigService,
    private _userMenu: UserMenuService
  ) {
    if (cookie.getLanguage() === '' || !cookie.getLanguage()) {
      this.translate.use('es');
      this.cookie.setLanguage(this.translate.currentLang);
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
      }))
    }

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
      console.log("usuario validado")

      // todo -> configurar esto dinamicamente
      this._login.loadGetLogin({
        username: "pvalverde",
      password: "valverde",
      user_session_id: undefined,
      recordarUsuario: false
      });
      if (this.loginUser) {
        this.processLogin();
      }
    }
  }

  // Subject validation
  private validateUser(): void {
    this.sub.add((this._login.user.subscribe((response) => {
      response.map(user => this.loginUser = user);
      return this.loginUser;
    })));
  }

  private async processLogin() {
    this.cookie.setSessionId(this.loginUser.Id);

    console.log("mira \t \t", this.loginUser)

    if (this.loginUser.Status === 'OK') {
      let now = new Date();
      let minutes = this.loginUser.Salida.tiempo_sesion;

      // TODO : Hacer código de duración de sesión
      const userResp: LoginRs = {
        Salida: this.loginUser.Salida
      };

      const userConfigParams: UserConfig = {
        id: +userResp.Salida.empl_code
      };

      await this._userConfig.loadUserConfig(userConfigParams);
      await this.sub.add((this._userConfig.configUser.subscribe((response) => {
        response.map(async user => {
          this.user = user;
          await this._userMenu.loadMenu(this.user.Id);
        });
        return this.user;
      })));

      await this.sub.add((this._userMenu.userMenuCRM.subscribe((res: any) => {
        res.map((menu: any) => this.userMen = menu);
        console.log("respuesta de menu", this.userMen, "response de Menu", res);
        return this.userMen;
      })))

      this.sendLogin = true;

      this.route.navigate(['/main']);
    } else {
      console.log('Credenciales incorrectos');
    }
  }

  test(backItem: string) {
    this.bImage = backItem;
  }
}
