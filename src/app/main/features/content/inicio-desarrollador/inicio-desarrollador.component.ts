import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import {Title} from "@angular/platform-browser";
import {DateTime} from 'luxon';
import {NgbCalendar, NgbDateAdapter, NgbDateParserFormatter} from "@ng-bootstrap/ng-bootstrap";
import {
  CustomDateParserFormatter,
  DateAdapterService
} from "../../../../shared/services/datepicker/date-adapter.service";
import {TranslateService} from "@ngx-translate/core";
import {timepick} from "../../../../shared/models/inicio-desarrollador.model";
import {FormControl,FormGroup, Validators} from "@angular/forms";






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
  sliderConfig: any;
  summerConfig: any;
  sliderModel: number[] = [0];

  form: FormGroup = new FormGroup({
    html: new FormControl("", Validators.required)
  });

  constructor(
    private _title: Title,
    private _dAdapt: NgbDateAdapter<string>,
    private _calendar: NgbCalendar,
    protected _translate: TranslateService){
    this.sliderConfig = {
      connect: 'lower',
      step: 1,
      range: {
        min: 0,
        max: 10
      },
      behaviour: 'snap',
      pips: {
        mode: 'steps',
        density: 10
      }
    };

    this.summerConfig = {
      airMode: false,
      tabDisable: true,
      popover: {
        table: [
          ["add", ["addRowDown", "addRowUp", "addColLeft", "addColRight"]],
          ["delete", ["deleteRow", "deleteCol", "deleteTable"]]
        ],
        image: [
          ["image", ["resizeFull", "resizeHalf", "resizeQuarter", "resizeNone"]],
          ["float", ["floatLeft", "floatRight", "floatNone"]],
          ["remove", ["removeMedia"], ["insert", ["picture"]]]
        ],
        link: [["link", ["linkDialogShow", "unlink"]]],
        air: [
          [
            "font",
            [
              "bold",
              "italic",
              "underline",
              "strikethrough",
              "superscript",
              "subscript",
              "clear"
            ]
          ]
        ]
      },
      height: "200px",
      uploadImagePath: "/api/upload",
      toolbar: [
        ["misc", ["codeview", "undo", "redo", "codeBlock"]],
        [
          "font",
          [
            "bold",
            "italic",
            "underline",
            "strikethrough",
            "superscript",
            "subscript",
            "clear"
          ]
        ],
        ["fontsize", ["fontname", "fontsize", "color"]],
        ["para", ["style0", "ul", "ol", "paragraph", "height"]],
        ["insert", ["table", "picture", "link", "video", "hr"]],
        ["customButtons", ["testBtn"]]
      ],
      buttons: {
      },
      codeviewFilter: true,
      codeviewFilterRegex: /<\/*(?:applet|b(?:ase|gsound|link)|embed|frame(?:set)?|ilayer|l(?:ayer|ink)|meta|object|s(?:cript|tyle)|t(?:itle|extarea)|xml|.*onmouseover)[^>]*?>/gi,
      codeviewIframeFilter: true
    };
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
