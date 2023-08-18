import {Component, OnInit} from '@angular/core';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import {Title} from "@angular/platform-browser";
import {DateTime} from 'luxon';
import {NgbCalendar, NgbDateAdapter,NgbDate, NgbDateParserFormatter} from "@ng-bootstrap/ng-bootstrap";
import {
  CustomDateParserFormatter,
  DateAdapterService
} from "../../../../shared/services/datepicker/date-adapter.service";
import {TranslateService} from "@ngx-translate/core";
import {FormControl,FormGroup, Validators, FormsModule} from "@angular/forms";
 import 'froala-editor/js/plugins.pkgd.min.js';

import 'froala-editor/js/third_party/font_awesome.min';
import 'froala-editor/js/third_party/image_tui.min';
import 'froala-editor/js/third_party/spell_checker.min';
import 'froala-editor/js/third_party/embedly.min';

pdfMake.vfs = pdfFonts.pdfMake.vfs;
interface TimeZone {name: string, offset:string} //Todo:a un model
interface ContinentZone {name: string, zones:Array<TimeZone>} //Todo:a un model
//interface TimeZone {name: string, offset:string}; //Todo:a un model

@Component({
  selector: 'app-inicio-desarrollador',
  templateUrl: './inicio-desarrollador.component.html',
  styleUrls: ['./inicio-desarrollador.component.scss'],
  providers: [
    { provide: NgbDateAdapter, useClass: DateAdapterService },
    { provide: NgbDateParserFormatter, useClass: CustomDateParserFormatter }
  ]

})
export class InicioDesarrolladorComponent implements OnInit{

  protected aTitle:string = '';
  protected tz: any;
  protected ts: any;
  protected utc: any;
  protected formatedTime: any;
  protected model2: string = '';
  protected showTime: boolean = true;
  protected currentTimeZone: string ="";

  protected uiSliderConf = {start:5,connect:'lower',step:1,range:{min:0,max:10},behaviour:'snap',pips:{mode:'steps',density:10}}
  protected sliderModel: number[] = [0];
  htmlContent ='';
  protected showTable: boolean = false;
  protected tableSiz = {x:8, y:8};


  protected newDate!: NgbDate;
  public options: Object = {
    placeholderText: 'Edit Your Content Here!',
    charCounterCount: false,
    immediateAngularModelUpdate:false,
    pluginsEnabled: ['image', 'link','table','lineHeight','paragraphFormat','lists', 'codeView','fontFamily','fontSize', 'inlineClass', 'lineHeight','quote','help'],
    toolbarButtons: {
      moreText:{
        buttons: ['bold', 'italic', 'underline', 'fontFamily', 'fontSize', 'textColor', 'backgroundColor', 'inlineClass', 'inlineStyle', 'clearFormatting']
      }
      ,
      moreParagraph: {

        buttons: ['alignLeft', 'alignCenter', 'formatOLSimple', 'alignRight', 'alignJustify', 'formatOL', 'formatUL', 'paragraphFormat', 'paragraphStyle', 'lineHeight', 'outdent', 'indent', 'quote']

      },
      moreRich: {

        buttons: ['insertLink', 'insertImage','insertTable',]

      },
      moreMisc: {
        buttons: ['undo', 'redo', 'spellChecker', 'selectAll', 'html', 'help'],
        align: 'right',
      }
    }
  };

  form: FormGroup = new FormGroup({
    html: new FormControl("", Validators.required)
  });

  constructor(
    private _title: Title,
    private _dAdapt: NgbDateAdapter<string>,
    private _calendar: NgbCalendar,
    protected _translate: TranslateService) {
  }


  ngOnInit(): void {
    this.time();
    this.sliderModel = [5];
  }

  generatePDF() {
    let docDefinition = {
      header: 'PDF Header',
      content: 'Sample PDF generated with Angular and PDFMake'
    };
    pdfMake.createPdf(docDefinition).open();
  }

  async getActualTitle() {
    console.log(this.htmlContent)
    this.aTitle = this._title.getTitle().valueOf();
    return this.aTitle;
  }

  async cambiarTitulo() {
    await this.getActualTitle();
    this._title.setTitle('(10) '+ this.aTitle)
  }

  // TODO: Recoger el timezone y cambiarlo dependiendo del perfil

  async time() {
    this.tz = DateTime.now().zoneName;
    this.ts = DateTime.now();
    this.utc = this.ts.toUTC();
    this.formatedTime = this.utc.toLocaleString(DateTime.DATE_SHORT) + ' ' + this.utc.toLocaleString(DateTime.TIME_24_WITH_SECONDS);
    this.newDate = new NgbDate(this.utc.year,this.utc.month,this.utc.day);
  }

  get today() {
    return this._dAdapt.toModel(this._calendar.getToday())!;
  }

  getTimeZone($event:string){
    this.currentTimeZone = $event
  }

}
