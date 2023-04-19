import {Component, OnInit} from '@angular/core';
import {faShareAlt} from '@fortawesome/free-solid-svg-icons';
import {TranslateService} from "@ngx-translate/core";
import {Router} from "@angular/router";
import {CookiesService} from "../shared/services/cookies/cookies.service";
import {HttpClient} from "@angular/common/http";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {UserConfigService} from "../shared/services/user/user-config.service";
import {LoginService} from "../shared/services/user/login.service";
import {UserMenuService} from "../shared/services/user/user-menu.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  faShare = faShareAlt;
  currentLang: string = 'es';
  public loginForm!: FormGroup;
  public submitted: boolean = false;
  public username: string = '';
  public password: string = '';
  public bImage: string = '../../assets/images/login/barcelona.jpg';
  private valcisData: any;

  constructor(
    private translate: TranslateService,
    private route: Router,
    private cookie: CookiesService,
    private http: HttpClient,
    private _login: LoginService,
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

    //this.sub = new Subscription();
  }

  async ngOnInit(): Promise<void> {
    console.log("login component, onInit...")
    this.loadForm();
    console.log("form cargado", this.loginForm.value)
    //console.log("entering to validateUser()...")
    //this.validateUser();
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

  // Subject validation
  /*private async validateUser() {
    // que usuario validamos???
    this.sub.add(
      this._login.user.subscribe(response => {
        console.log("On validateUser", response);
        this.loginUser = response;
        console.log(new Date().toLocaleTimeString(), "entonces", this.loginUser);
        return this.loginUser;
      })
    );
  }*/

  // Effect
  public async login() {
    console.log("boton pressed 'login()'");

    if (this.loginForm.valid) {
      this._login.sendGetLogin(this.loginForm.value).subscribe(response => {
        this.valcisData = response;
        console.log(response, this.valcisData);

        if (this.valcisData.Status && this.valcisData.Status === "OK") {
          const emp_code = this.valcisData.Salida.empl_code;
          const id = this.valcisData.Id;

          console.log("estraemos el empl_code y el Id y lo pasamos al userConfig");
          this._userConfig.sendGetConfig({id: emp_code}, id).subscribe(response => {
            console.log("---------->", response);
            this.valcisData = response;
            if (this.valcisData.Status && this.valcisData.Status === "OK") {
              console.log("dentro de userConfig, ahora valcisData", this.valcisData)
            }
          });

          console.log("lanzamos peti para extraer menu");
          this._userMenu.sendGetMenu(id).subscribe(response => {
            console.log("tenemos MENU", response)
          })

          this.route.navigate(['/main']);
        } else {
          console.log('Credenciales incorrectos');
        }
      })


      /*console.log("pase la peti LOG IN ????");
      if (this.loginUser) {
        console.log("Si, usamos datos y continuamos proceso...")
        this.processLogin();
      } else
        console.log("No")*/
    } else {
      console.log("this.loginForm.valid es false, no entra a hacer petis...")
    }
  }

  /*private async processLogin() {
    console.log("this.loginUser", new Date().toLocaleTimeString(), this.loginUser);
    this.cookie.setSessionId(this.loginUser.Id);

    if (this.loginUser.Status === 'OK') {
      let now = new Date();
      let minutes = this.loginUser.Salida.tiempo_sesion;

      // TODO : Hacer código de duración de sesión
      const userResp: LoginRs = {
        Salida: this.loginUser.Salida
      };

      console.log("----->", userResp)

      const userConfigParams: UserConfigEntrada = {
        id: +userResp.Salida.empl_code
      };


      await this._userConfig.sendGetConfig(userConfigParams, this.loginUser.Id);
      await this.sub.add((this._userConfig.configUser.subscribe((response) => {
        response.map(async user => {
          this.user = user;
          await this._userMenu.sendGetMenu(this.user.Id);
        });
        return this.user;
      })));

      await this.sub.add((this._userMenu.userMenuCRM.subscribe((res: any) => {
        res.map((menu: any) => this.userMenu = menu);
        console.log(new Date().toLocaleTimeString(), "respuesta de menu", this.userMenu, "response de Menu", res);
        return this.userMenu;
      })))

      this.sendLogin = true;

      this.route.navigate(['/main']);
    } else {
      console.log('Credenciales incorrectos');
    }
  }*/

  test(backItem: string) {
    this.bImage = backItem;
  }
}
