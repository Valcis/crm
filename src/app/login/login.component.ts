import {Component, OnInit} from '@angular/core';
import {TranslateService} from "@ngx-translate/core";
import {Router} from "@angular/router";
import {CookiesService} from "../shared/services/cookies/cookies.service";
import {HttpClient} from "@angular/common/http";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
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
  public bImage: string = '../../assets/images/login/barcelona.jpg';


  constructor(
    private translate: TranslateService,
    private _router: Router,
    private _cookie: CookiesService,
    private http: HttpClient,
    private _user: UserService,
    private _loader: CrmLoaderService,
    private formBuilder: FormBuilder
  ) {
    this.loginForm = this.formBuilder.group({
      username: new FormControl<string>('', Validators.required),
      password: new FormControl('', Validators.required),
    });

    if (_cookie.getLanguage() === '' || !_cookie.getLanguage()) {
      this.translate.use('es');
      this._cookie.setLanguage(this.translate.currentLang);
    } else {
      this.currentLang = _cookie.getLanguage();
      this.translate.use(_cookie.getLanguage())
    }
  }

  ngOnInit() {
    this.autoLogin();
  }


  public async login() {
    await this._loader.setLoading(true);
    console.log("LOGIN. inicio -> boton pressed", this.loginForm.value)
    const hasValidId = await this._user.retrieveUser(this.loginForm.value)

    if (hasValidId) {
      console.warn(this._user.userData)
      const {crmDetails: {metadata: {neo_id}}, intranetDetails: {empl_code}} = this._user.userData;
      const isDischarged = await this._user.isDischarged(neo_id, empl_code, this._cookie.getSessionId())
      if(!isDischarged) await this._router.navigate(['/main'])
      else {
        //TODO : montar en un toast
        console.log("USUARIO dado de baja")
      }
    } else {
      console.error("usuario no valido")
      // TODO : lanzar toast con mensaje de "Datos de usuario incorrectos"
    }

    this._loader.setLoading(false);
  }

  public async autoLogin() {
    // console.log("AUTOLOGIN. inicio ")
    this._loader.setLoading(true); // Set the loader to true at the start
    const sessionId = this._cookie.getSessionId();

    if (sessionId) {
      try {
        // console.log("hay sessionID : ", sessionId, " . Iniciando loggin...")
        const hasValidId = await this._user.retrieveUser(sessionId);
        if (hasValidId) await this._router.navigate(['/main']);
        else console.warn("expired/invalid sessionId deleted")
      } catch (e) {
        console.error("error catched ->", e);
      }
    }
    // console.assert(sessionId, "NO HAY cookie crm2_session_id") //borrar
    this._loader.setLoading(false); // Set the loader to true at the start
    // console.log("AUTOLOGIN. fin ")
  }

  test(backItem: string) {
    this.bImage = backItem;
  }
}
