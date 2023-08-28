
import {Component, Input, OnInit, EventEmitter, Output, SimpleChanges} from "@angular/core";
import {NgbCalendar, NgbDate, NgbDateAdapter, NgbDateParserFormatter} from "@ng-bootstrap/ng-bootstrap";
import {CustomDateParserFormatter, DateAdapterService} from "../../services/datepicker/date-adapter.service";
import {timepick} from "../../models/inicio-desarrollador.model";
import {TranslateService} from "@ngx-translate/core";
import {DateTime} from "luxon";
import {FormGroup,FormControl} from "@angular/forms";



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

  @Input() initDate?: NgbDate = undefined;
  @Input() clock:boolean = false;
  @Input() initTime?: timepick = undefined;
  @Input() offset?: string = undefined;
  @Output() newDay = new EventEmitter<NgbDate>();
  @Output() newTime = new EventEmitter<timepick>();

  protected ts!: DateTime;
  protected utc!: DateTime;
  protected formatedTime!: string;
  protected model2?: NgbDate = undefined;
  protected initialTime!: NgbDate;
  protected time2!: timepick;
  protected showTime!:boolean;

  constructor(
    private _dAdapt: NgbDateAdapter<string>,
    private _calendar: NgbCalendar,
    protected _translate: TranslateService){
  }

  ngOnInit(): void {
    this.time();
    this.showTime=this.clock;

  }

  formGroup = new FormGroup({});

  // TODO: Recoger el timezone y cambiarlo dependiendo del perfil

  async time() {
    this.ts = DateTime.now();
    this.utc = this.ts.toUTC();
    this.formatedTime = this.utc.toLocaleString(DateTime.DATE_SHORT) + ' ' + this.utc.toLocaleString(DateTime.TIME_24_WITH_SECONDS);
    if(this.initDate !== undefined){
      this.initialTime = this.initDate;
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
    if(this.initTime === undefined){
      let currentTime:string ;
      if(this.offset !== undefined && this.offset!== ""){
        currentTime =  DateTime.now().setZone(this.offset).toLocaleString(DateTime.TIME_24_SIMPLE);
      }else{
        currentTime =  DateTime.now().toLocaleString(DateTime.TIME_24_SIMPLE);
      }
      let testParse3 = currentTime.split(':', 2);
      this.time2 = {
        hour: +testParse3[0],
        minute: +testParse3[1]
      }

    }else{
      this.time2 = {
        hour: this.initTime.hour,
        minute: this.initTime.minute,
      }
    }
  }

  actualizeTime(){
    this.newTime.emit(this.time2);
  }
  actualizeDay(){
    this.newDay.emit(this.model2);
  }
  ngOnChanges(){
    this.setTime();
  }
}
