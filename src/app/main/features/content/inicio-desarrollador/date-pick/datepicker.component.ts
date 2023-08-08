
import {Component, Input, OnInit,EventEmitter, Output} from "@angular/core";
import {NgbCalendar, NgbDateAdapter, NgbDateParserFormatter} from "@ng-bootstrap/ng-bootstrap";
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

  @Input() clock:boolean = false;
  @Output() newTime = new EventEmitter<string>();

  protected tz: any;
  protected ts: any;
  protected utc: any;
  protected formatedTime: any;
  protected model2: string = DateTime.now().toUTC().toLocaleString(DateTime.DATE_SHORT);
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
    this.model2 = this.utc.toLocaleString(DateTime.DATE_SHORT);
    this.setTime()
  }

  get today() {
    return this._dAdapt.toModel(this._calendar.getToday())!;
  }

  erase() {
    this.model2 = '';
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
    this.newTime.emit(this.model2);
  }

}
