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
import {FormControl,FormGroup, Validators} from "@angular/forms";
import {AngularEditorConfig} from "@kolkov/angular-editor";





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
  protected continentList: Array<ContinentZone>=[];
  protected timeZoneSelect: any;

  protected sliderModel: number[] = [0];
  protected editorConfig: AngularEditorConfig;
  protected showTable: boolean = false;
  protected tableSiz = {x:[1], y:[1]};

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
    protected _translate: TranslateService){
    this.getAllTime();

    this.editorConfig = {
      editable: true,
      spellcheck: true,
      height: '500',
      width: 'auto',
      enableToolbar: true,
      showToolbar: true,
      placeholder: 'Enter text here...',
      defaultParagraphSeparator: '',
      defaultFontName: 'Arial',
      defaultFontSize: '13',
      fonts: [
        {class: 'arial', name: 'Arial'},
        {class: 'Courier New', name: 'Courier New'},
        {class: 'Helvetica', name: 'Helvetica'}
      ],
      customClasses: [
      {
        name: 'quote',
        class: 'quote',
      },
      {
        name: 'titleText',
        class: 'titleText',
        tag: 'h1',
      },
      {
        name: 'table',
        class: 'table',
        tag: 'table',
      },
    ],
    uploadUrl: 'v1/image',
    uploadWithCredentials: false,
    sanitize: true,
    toolbarPosition: 'top',
    toolbarHiddenButtons: [
      ['underline', 'strikeThrough','subscript','superscript'],
      ['textColor'],
      ['insertImage','insertVideo','insertHorizontalRule']
    ]
    }
/*
      //,focus: true
      //,airMode: true
      ,fontNames: ['Arial', 'Courier New','Helvetica'],
      addDefaultFonts: false
      ,toolbar: [
        ['edit',['undo','redo']],
        ['headline', ['style']],
        ['style', ['bold', 'italic', /!* 'underline','superscript', 'subscript', 'strikethrough', *!/'clear']],
        ['fontface', ['fontname']],
        ['textsize', ['fontsize']],
        ['fontclr', ['color']],
        ['alignment', ['ul', 'ol', 'paragraph', 'lineheight']],
        ['height', ['height']],
        ['table', ['table']],
        ['insert', ['link']],
        ['view', ['codeview']],
        ['help', ['help',"codeBlock"]]
      ]
    };*/
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

  getAllTime(){
    for(const zone of (Intl as any).supportedValuesOf('timeZone')){
      let time: TimeZone = {name:zone.replace(/_/g,' '),offset: DateTime.local({ zone: zone }).toFormat('ZZ')};
      let continent:string = zone.split("/",1);

      if(!(this.continentList.some(cont => {
        if (cont.name.toString().localeCompare(continent) === 0) {
          cont.zones.push(time);
          return true;
        } else {
          return false;
        }
      }))){
        let times:Array<TimeZone>=[time];
        let continentZone:ContinentZone = {name:continent, zones:times}
        this.continentList.push(continentZone);
      }
    }
    console.log(this.continentList);
  }

  onChange(){
    this.timeZoneSelect = this.currentTimeZone;
    this.timeZoneSelect = this.timeZoneSelect.split("/",2)[1];
    this.timeZoneSelect = this.timeZoneSelect + ": " + this.currentTimeZone
  }

}
