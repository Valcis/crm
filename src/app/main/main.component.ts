import {Component, EventEmitter, Output} from '@angular/core';
import {TranslateService} from "@ngx-translate/core";
import {CookiesService} from "../shared/services/cookies/cookies.service";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent {
  public isExpanded: boolean = true;
  onExpand = (currentValue: boolean) => this.isExpanded = !currentValue;
  currentLang: string = '';
  @Output() expander: EventEmitter<boolean> = new EventEmitter<boolean>();

  public isCollapsed = false;


  constructor(
    private translate: TranslateService,
    private cookie: CookiesService,
  ) {
    this.currentLang = this.cookie.getLanguage();
    this.translate.setDefaultLang(this.currentLang);
    this.translate.use(this.currentLang);
  }

  onToggle = () => this.isExpanded = !this.isExpanded;


}
