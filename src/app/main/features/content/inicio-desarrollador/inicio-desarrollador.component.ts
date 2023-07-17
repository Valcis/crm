import {Component, OnInit} from '@angular/core';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import {Title} from "@angular/platform-browser";
import {DateTime} from 'luxon';
import {NgbCalendar, NgbDateAdapter, NgbDateParserFormatter} from "@ng-bootstrap/ng-bootstrap";
import {
  CustomDateParserFormatter,
  DateAdapterService
} from "../../../../shared/services/datepicker/date-adapter.service";

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
  protected time2: any;
  protected showTime: boolean = false;

  constructor(
    private _title: Title,
    private _dAdapt: NgbDateAdapter<string>,
    private _calendar: NgbCalendar) {
  }

  ngOnInit(): void {
    this.time();
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
    console.log(this.showTime);
    let test = this.utc.toLocaleString(DateTime.TIME_24_SIMPLE);
    let testParse3 = test.split(':', 2);
    this.time2 = {
      hour: +testParse3[0],
      minute: +testParse3[1]
    }
  }
}
