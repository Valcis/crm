import {Component, OnInit} from '@angular/core';
import {TranslateService} from "@ngx-translate/core";
import {Router} from "@angular/router";
import {CookiesService} from "../shared/services/cookies/cookies.service";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {UserService} from "../shared/services/api/user/user.service";
import {CrmLoaderService} from "../shared/services/crm-loader/crm-loader.service";


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
    private _user: UserService,
    private _loader: CrmLoaderService,
    private _formBuilder: FormBuilder
  ) {
    this.loginForm = this._formBuilder.group({
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

  ngOnInit ()  {
    this.autoLogin();
  }

  protected login = () => this.signIn(this.loginForm.value);

  private autoLogin = async () => {
    // console.log("AUTOLOGIN. inicio ", this._cookie.getSessionId())
    const sessionId = this._cookie.getSessionId();
    if (sessionId) await this.signIn(sessionId);
    this._loader.setLoading(false);
    // console.assert(sessionId, "NO HAY cookie crm2_session_id") //borrar
  }

  private signIn = async (credentials: string) => {
    // console.log("Sign-In...")
    try {
      this._loader.setLoading(true);
      const hasValidIdMessage = await this._user.retrieveUser(credentials);
      if (hasValidIdMessage == "OK") await this._router.navigate(['/main']);
      else // TODO : lanzar toast con mensaje de "error"
        console.error("Intento fallido :  ", hasValidIdMessage);
    } catch (error) {
      this._cookie.deleteSessionId();
      console.error("error catched #> ", error);
    } finally {
      this._loader.setLoading(false);
    }
  }

  test = (backItem: string) => this.bImage = backItem;
}
