import {Inject, Injectable} from '@angular/core';
import {TranslateLoader} from "@ngx-translate/core";
import {HttpClient} from "@angular/common/http";
import {forkJoin, Observable} from "rxjs";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class TranslateLoaderService extends TranslateLoader {

  constructor(
    private http: HttpClient,
    @Inject('moduleName') private moduleName: string
  ) {
    super()
  }

  getTranslation(lang: string): Observable<any>{
    return forkJoin({
      moduleTranslation: this.http.get(`./assets/i18n/${this.moduleName}/${lang}.json`),
      commonTranslation: this.http.get(`./assets/i18n/common/${lang}.json`),
    }).pipe(
      map((translation: {moduleTranslation: any, commonTranslation: any}) => Object.assign(
        {},
        translation.commonTranslation,
        translation.moduleTranslation,
      ))
    )
  }
}
