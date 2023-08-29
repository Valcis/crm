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
  private confirm:any= "SWEET.ALERT.CONFIRM.DELETE";
  private deny:any ="SWEET.ALERT.CANCEL.DELETE";
  private yes:any= "COMMON.TEXT.YES";
  private no:any ="COMMON.TEXT.NO";

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

  private async translationsConfDeny(){

    var tranlatedConfirm = await this.getTranslation(this.confirm, this._cookie.getLanguage()).toPromise();
    var tranlatedDeny = await this.getTranslation(this.deny, this._cookie.getLanguage()).toPromise();
    return [tranlatedConfirm,tranlatedDeny]
  }

  async warningTranslations(title:string, text:string, variable:string){
    var translationsResults = await this.translationsConfDeny();
    return Swal.fire({
      scrollbarPadding: false,
      heightAuto: false,
      title:title,
      text: text + variable,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#DD6B55",
      confirmButtonText: translationsResults[0],
      cancelButtonColor: "#D0D0D0",
      cancelButtonText: translationsResults[1],
      reverseButtons: true,
    })
  }


  private getTranslation(text: string, language: string): Observable<string> {
    return this._translate.getTranslation(language).pipe(
      map(translations => {
        return this._translate.getParsedResult(translations, text);
      })
    );
  }

  public swalConfirmationRequest(title:string, text:string, variable:string){
    return this.warningTranslations(title, text, variable,)
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
 //TODO: modificar el color del text
  public swalError = (title:string, text:string) =>{
    Swal.fire({
      scrollbarPadding: false,
      showDenyButton: true,
      heightAuto: false,
      title:this._translate.instant(title),
      text: this._translate.instant(text),
      icon:"error",
      denyButtonColor: "rgb(174, 222, 244)",
      denyButtonText:"OK",
      showConfirmButton:false,
      showCancelButton:false,
    });
  };
  private async translationsYesNo(){
    var tranlatedYes = await this.getTranslation(this.yes, this._cookie.getLanguage()).toPromise();
    var tranlatedNo = await this.getTranslation(this.no, this._cookie.getLanguage()).toPromise();
    return [tranlatedYes,tranlatedNo]
  }


  async InformationTranslations(title:string, text:string){
    var translationsResults = await this.translationsYesNo();
    return Swal.fire({
      scrollbarPadding: false,
      heightAuto: false,
      title:title,
      text: text,
      icon: "info",
      iconColor: "#c9dae1",
      showCancelButton: true,
      confirmButtonColor: "#18a689",
      confirmButtonText: translationsResults[0],
      cancelButtonColor: "#D0D0D0",
      cancelButtonText: translationsResults[1],
      reverseButtons: true,
    })
  }


  public swalInfoRequest(title:string, text:string){
    return this.InformationTranslations(title, text)
  };

}
