import {Injectable} from "@angular/core";
import {TranslateService} from "@ngx-translate/core";
import Swal from "sweetalert2";

@Injectable({
  providedIn: 'root'
})
export class SwalService {
  constructor(private _translate:TranslateService,) {}


  public swalConfirmationRequest = (title:string, text:string, variable:string) => {
    return Swal.fire({
      scrollbarPadding: false,
      heightAuto: false,
      title: this._translate.instant(title),
      text: this._translate.instant(this._translate.instant(text)+':' + variable),
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#DD6B55",
      confirmButtonText: this._translate.instant('LINKS.ALERT_CONFIRM'),
      cancelButtonColor: "#D0D0D0",
      cancelButtonText: this._translate.instant('LINKS.ALERT_CANCEL'),
      reverseButtons: true,
    })
  };

  public swalSucces = (title:string, text:string) =>{
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
