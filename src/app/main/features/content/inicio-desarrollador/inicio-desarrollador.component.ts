import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
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
import {timepick} from "../../../../shared/models/inicio-desarrollador.model";
import {FormControl,FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute} from "@angular/router";
import {sharedDataService} from "../../../../shared/services/shared-data/shared-data.service";





pdfMake.vfs = pdfFonts.pdfMake.vfs;

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
  protected time2: timepick = {hour:10,minute:15};
  protected showTime: boolean = true;

  protected summerConfig: any;
  protected sliderModel: number[] = [0];

  protected tarifa_neta: boolean = false;
  protected tarifa_comisionable: boolean = false;
  protected descuento_bar:string = "";
  protected markup:string = "";

  protected produccion_minima: boolean = false;
  protected produccion_minima_value: string = "";
  protected newDate!: NgbDate ;


  form: FormGroup = new FormGroup({
    html: new FormControl("", Validators.required)
  });

  constructor(
    private _title: Title,
    private _dAdapt: NgbDateAdapter<string>,
    private _calendar: NgbCalendar,
    protected _translate: TranslateService,
    private  _route: ActivatedRoute,
    protected _shared: sharedDataService){

    this.summerConfig = {
      height: 500
      //,focus: true
      //,airMode: true
      ,fontNames: ['Arial', 'Courier New','Helvetica'],
      addDefaultFonts: false
      ,toolbar: [
        ['edit',['undo','redo']],
        ['headline', ['style']],
        ['style', ['bold', 'italic', /* 'underline','superscript', 'subscript', 'strikethrough', */'clear']],
        ['fontface', ['fontname']],
        ['textsize', ['fontsize']],
        ['fontclr', ['color']],
        ['alignment', ['ul', 'ol', 'paragraph', 'lineheight']],
        ['height', ['height']],
        ['table', ['table']],
        ['insert', ['link'
          //'picture','video',
          /*'hr'*/]],
        ['view', [
          //'fullscreen',
          'codeview']],
        ['help', ['help',"codeBlock"]]
      ]
    };
  }

  private sub:Array<any>=[];
  ngOnInit(): void {
    this.time();
    this.sliderModel = [5];


    this._route.data.forEach(e => {this.sub.push(e)});
    console.log("route",this.sub);
  }

  generatePDF() {
    let docDefinition = {
      header: 'PDF Header',
      content: 'Sample PDF generated with Angular and PDFMake'
    };
    pdfMake.createPdf(docDefinition).open();
  }

  async getActualTitle() {
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
    console.log(this.utc);
    this.formatedTime = this.utc.toLocaleString(DateTime.DATE_SHORT) + ' ' + this.utc.toLocaleString(DateTime.TIME_24_WITH_SECONDS);
    this.newDate = new NgbDate(this.utc.year,this.utc.month,this.utc.day);
  }

  get today() {
    return this._dAdapt.toModel(this._calendar.getToday())!;
  }

  erase() {
    this.model2 = '';
  }

  openTime() {
    this.showTime = !this.showTime;
    let test = this.utc.toLocaleString(DateTime.TIME_24_SIMPLE);
    let testParse3 = test.split(':', 2);
    this.time2 = {
      hour: +testParse3[0],
      minute: +testParse3[1]
    }
  }

}
