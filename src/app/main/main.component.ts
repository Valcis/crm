import { Component } from '@angular/core';
import {LangChangeEvent, TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent {
  public isExpanded: boolean = true;

  onExpand = (currentValue: boolean) => this.isExpanded = !currentValue;

  lang: string = '';
  currentLang: string = '';

  constructor(private translate: TranslateService) {
    if (this.currentLang !== (undefined || '')){
      this.changeLang(this.translate.currentLang);
      this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
        this.changeLang(event.lang);
      })
    } else {
      this.lang = translate.getBrowserLang() as string;
      translate.use(this.lang)
    }
  }

  changeLang(lang: string) {
    if(this.currentLang === lang) {
      return;
    }
    this.currentLang = lang;
    this.translate.currentLang = '';
    this.translate.use(lang);
  }
}
