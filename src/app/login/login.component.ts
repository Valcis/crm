import {Component, OnInit} from '@angular/core';
import {TranslateService} from "@ngx-translate/core";
import {Router} from "@angular/router";
import {CookiesService} from "../shared/services/cookies/cookies.service";
import {HttpClient} from "@angular/common/http";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {UserService} from "../shared/services/api/user/user.service";
import {CrmLoaderService} from "../shared/services/crmLoader/crm-loader.service";


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  currentLang: string = 'es';
  public loginForm!: FormGroup;
  public submitted: boolean = false;
  public username: string = '';
  public password: string = '';
  public bImage: string = '../../assets/images/login/barcelona.jpg';


  constructor(
    private translate: TranslateService,
    private route: Router,
    private _cookie: CookiesService,
    private http: HttpClient,
    private _user: UserService,
    private _loader: CrmLoaderService,
  ) {
    if (_cookie.getLanguage() === '' || !_cookie.getLanguage()) {
      this.translate.use('es');
      this._cookie.setLanguage(this.translate.currentLang);
    } else {
      this.currentLang = _cookie.getLanguage();
      this.translate.use(_cookie.getLanguage())
    }
  }

  async ngOnInit(): Promise<void> {
    this.loadForm();
    await this.autoLogin();
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

  public async login() {
    /*console.log("boton pressed 'login()'");*/
    this._user.retrieveUser(this.loginForm.value)
      .then(hasId => {
          if (hasId) this.route.navigate(['/main']);
          // TODO : lanzar toast con mensaje de "Datos de usuario incorrectos"
          else console.error("usuario no valido")
        }
      ).catch(error => {
      // TODO : lanzar toast con mensaje de "Error al intentar hacer login "
      console.error("login error", error)
    });
  }

  // Auto Login
  public async autoLogin(): Promise<void> {
    this._loader.setLoading(true); // Set the loader to true at the start
    const sessionId = this._cookie.getSessionId();
    if (sessionId) {
      const autoLogForm: FormGroup = new FormGroup({
        // id: new FormControl(''),
        // password: new FormControl(''),
        user_session_id: new FormControl(sessionId),
      });
      const hasId = await this._user.retrieveUser(autoLogForm.value);
      if (hasId) {
        await this.route.navigate(['/main']);
        // await this.route.navigate(['/main/crm_inicio']);
      } else {
        console.error('Invalid user'); // TODO: Display an error message or handle the case of an invalid user
      }
    }
    this._loader.setLoading(false); // Set the loader to true at the start
  }

  test(backItem: string) {
    this.bImage = backItem;
  }
}
