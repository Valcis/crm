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

  protected uiSliderConf = {start:5,connect:'lower',step:1,range:{min:0,max:10},behaviour:'snap',pips:{mode:'steps',density:10}}
  protected sliderModel: number[] = [0];
  protected editorConfig: AngularEditorConfig;
  htmlContent ='';
  protected showTable: boolean = false;
  protected tableSiz = {x:8, y:8};


  protected newDate!: NgbDate ;


  form: FormGroup = new FormGroup({
    html: new FormControl("", Validators.required)
  });

  constructor(
    private _title: Title,
    private _dAdapt: NgbDateAdapter<string>,
    private _calendar: NgbCalendar,
    protected _translate: TranslateService){

    this.editorConfig = {
      editable: true,
      spellcheck: true,
      height: '500',
      width: 'auto',
      enableToolbar: true,
      showToolbar: true,
      sanitize: false,
      placeholder: 'Enter text here...',
      defaultParagraphSeparator: '',
      defaultFontName: 'Arial',
      defaultFontSize: '2',
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
        name: 'code',
        class: '<!--',
        tag: 'pre class="code"'
      },
      {
      name: 'table 2x2',
      class: '<!--',
      tag: 'table class="table table-bordered">' +
        '<tr><td>&nbsp;</td><td>&nbsp;</td></tr>' +
        '<tr><td>&nbsp;</td><td>&nbsp;</td></tr>' +
        '</table> <!--'
      },
      {
        name: 'table 4x4',
        class: '<!--',
        tag: 'table class="table table-bordered">' +
          '<tr><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr>' +
          '<tr><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr>' +
          '<tr><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr>' +
          '<tr><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr>' +
          '</table> <!--'
      },
      {
        name: 'table 8x8',
        class: '<!--',
        tag: 'table class="table table-bordered">' +
          '<tr><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr>' +
          '<tr><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr>' +
          '<tr><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr>' +
          '<tr><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr>' +
          '<tr><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr>' +
          '<tr><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr>' +
          '<tr><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr>' +
          '<tr><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr>' +
          '</table> <!--'
      },
      {
        name: 'table 4x8',
        class: '<!--',
        tag: 'table class="table table-bordered">' +
          '<tr><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr>' +
          '<tr><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr>' +
          '<tr><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr>' +
          '<tr><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr>' +
          '</table> <!--'
      },
      {
        name: 'table 2x4',
        class: '<!--',
        tag: 'table class="table table-bordered">' +
          '<tr><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr>' +
          '<tr><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr>' +
          '</table> <!--'
      },
      {
        name: 'table 4x2',
        class: '<!--',
        tag: 'table class="table table-bordered">' +
          '<tr><td>&nbsp;</td><td>&nbsp;</td></tr>' +
          '<tr><td>&nbsp;</td><td>&nbsp;</td></tr>' +
          '<tr><td>&nbsp;</td><td>&nbsp;</td></tr>' +
          '<tr><td>&nbsp;</td><td>&nbsp;</td></tr>' +
          '</table> <!--'
      },
      {
        name: 'table 8x4',
        class: '<!--',
        tag: 'table class="table table-bordered">' +
          '<tr><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr>' +
          '<tr><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr>' +
          '<tr><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr>' +
          '<tr><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr>' +
          '<tr><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr>' +
          '<tr><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr>' +
          '<tr><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr>' +
          '<tr><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr>' +
          '</table> <!--'
      },
    ],
    uploadUrl: 'v1/image',
    uploadWithCredentials: false,
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

  createTable(){
    let body = document.getElementsByClassName('angular-editor-textarea')[0];
    let tbl = document.createElement('table');
    tbl.classList.add("table");
    tbl.classList.add("table-bordered");
    tbl.style.width = '100%';
    tbl.setAttribute('border', '1');
    let tbdy = document.createElement('tbody');
    for (let i = 0; i < this.tableSiz.y ; i++) {
      let tr = document.createElement('tr');
      for (let j = 0; j < this.tableSiz.x ; j++) {
        let td = document.createElement('td');
        td.style.height='20px'
        td.appendChild(document.createTextNode('\u0020'));
        i == 1 && j == 1 ? td.setAttribute('rowSpan', '2') : null;
        tr.appendChild(td)
      }
      tbdy.appendChild(tr);
    }
    tbl.appendChild(tbdy);
    body.appendChild(tbl)
  }
}
