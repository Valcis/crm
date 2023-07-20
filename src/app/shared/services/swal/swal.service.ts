import {Injectable} from "@angular/core";
import {LangChangeEvent, TranslateService} from "@ngx-translate/core";
import Swal from 'sweetalert2'
import {CookiesService} from "../cookies/cookies.service";
import {map} from "rxjs/operators";
import {Observable} from "rxjs";
import {waitForAsync} from "@angular/core/testing";
import {firstValueFrom, isObservable} from "rxjs";



@Injectable({
  providedIn: 'root'
})
export class SwalService {
  private text1:any= "SWAL.ALERT_CONFIRM";
  private text2:any ="SWAL.ALERT_CANCEL";

  constructor(private _translate:TranslateService,
              private _cookie: CookiesService,
  )
  {

    // if (_cookie.getLanguage() === '' || !_cookie.getLanguage()) {
    //   this._translate.use('es');
    //   this._cookie.setLanguage(this._translate.currentLang);
    // } else {
       this._translate.use(_cookie.getLanguage());
    // }
  }

  async checkDuplicate(){

    var tranlated1 = await this.getTranslation(this.text1, this._cookie.getLanguage()).toPromise();
    var tranlated2 = await this.getTranslation(this.text2, this._cookie.getLanguage()).toPromise();
    return [tranlated1,tranlated2]
  }

  async proceed(title:string, text:string, variable:string){
    var translations = await this.checkDuplicate();
    console.log(this.text1);
    console.log(this._cookie.getLanguage());
    return Swal.fire({
      scrollbarPadding: false,
      heightAuto: false,
      title:title,
      text: text+':' + variable,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#DD6B55",
      confirmButtonText: translations[0],
      cancelButtonColor: "#D0D0D0",
      cancelButtonText: translations[1],
      reverseButtons: true,
    })
  }


  public getTranslation(key: string, language: string, interpolationParams?: Object): Observable<string> {
    return this._translate.getTranslation(language).pipe(
      map(translations => {
        return this._translate.getParsedResult(translations, key, interpolationParams);
      })
    );
  }

  public swalConfirmationRequest(title:string, text:string, variable:string){



    return this.proceed(title, text, variable)
  };

  public swalSucces = (title:string, text:string) =>{
    Swal.fire({
      scrollbarPadding: false,
      showDenyButton: true,
      heightAuto: false,
      title:title,
      text: text,
      icon:"success",
      denyButtonColor: "rgb(174, 222, 244)",
      denyButtonText:"OK",
      showConfirmButton:false,
      showCancelButton:false,
    });
  };

  public swalError = (title:string, text:string) =>{
    Swal.fire({
      scrollbarPadding: false,
      showDenyButton: true,
      heightAuto: false,
      title:this._translate.instant(title),
      text:this._translate.instant(text),
      icon:"success",
      denyButtonColor: "rgb(174, 222, 244)",
      denyButtonText:"OK",
      showConfirmButton:false,
      showCancelButton:false,
    });
  };
}
