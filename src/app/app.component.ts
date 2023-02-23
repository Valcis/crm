import {Component, OnInit} from '@angular/core';
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'crm2';
  lang: string = '';
  currentLang: string = '';

  constructor(
    private translate: TranslateService
  ) {
  }

  ngOnInit() {
    if (this.currentLang === (undefined || '')) {
      this.setBrowLang();
    } else {
    }
  }

  async setBrowLang() {
    this.currentLang = this.translate.getBrowserLang() as string;
    this.translate.use(this.currentLang);
  }

}
