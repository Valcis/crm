
import {Component, Input, OnInit,EventEmitter, Output} from "@angular/core";
import {NgbCalendar, NgbDate, NgbDateAdapter, NgbDateParserFormatter} from "@ng-bootstrap/ng-bootstrap";
import {CustomDateParserFormatter, DateAdapterService} from "../../../../../shared/services/datepicker/date-adapter.service";
import {timepick} from "../../../../../shared/models/inicio-desarrollador.model";
import {TranslateService} from "@ngx-translate/core";
import {DateTime} from "luxon";



@Component({
  selector: 'app-datepicker',
  templateUrl: './datepicker.component.html',
  styleUrls: ['./datepicker.component.scss'],
  providers: [
    { provide: NgbDateAdapter, useClass: DateAdapterService },
    { provide: NgbDateParserFormatter, useClass: CustomDateParserFormatter }
  ]

})
export class DatepickerComponent implements OnInit{

  @Input() initDate:string = "";
  @Input() clock:boolean = false;
  @Output() newDay = new EventEmitter<NgbDate>();
  @Output() newTime = new EventEmitter<timepick>();

  protected tz: any;
  protected ts: any;
  protected utc: any;
  protected formatedTime: any;
  protected model2?: NgbDate = undefined;
  protected time2!: timepick;
  protected showTime: boolean = this.clock;

  constructor(
    private _dAdapt: NgbDateAdapter<string>,
    private _calendar: NgbCalendar,
    protected _translate: TranslateService){
  }

  ngOnInit(): void {
    this.time();
    this.showTime=this.clock;

  }



  // TODO: Recoger el timezone y cambiarlo dependiendo del perfil

  async time() {
    this.tz = DateTime.now().zoneName;
    this.ts = DateTime.now();
    this.utc = this.ts.toUTC();
    this.formatedTime = this.utc.toLocaleString(DateTime.DATE_SHORT) + ' ' + this.utc.toLocaleString(DateTime.TIME_24_WITH_SECONDS);
    if(this.initDate !== ""){
      //DateTime.fromISO('2019-06-23T00:00:00.00')
      //date = new NgbDate(2020,19,02);
      this.model2 = new NgbDate(this.utc.year,this.utc.month,this.utc.day);

    }
    this.setTime()
  }

  get today() {
    return this._dAdapt.toModel(this._calendar.getToday())!;
  }

  erase() {
    this.model2 = undefined;
  }

  openTime() {
    this.showTime = !this.showTime;
    this.setTime()
  }

  private setTime(){
    let test = this.utc.toLocaleString(DateTime.TIME_24_SIMPLE);
    let testParse3 = test.split(':', 2);
    this.time2 = {
      hour: +testParse3[0],
      minute: +testParse3[1]
    }
  }
  actualizeTime(){
    this.newTime.emit(this.time2);
  }
  actualizeDay(){
    this.newDay.emit(this.model2);
  }

}
