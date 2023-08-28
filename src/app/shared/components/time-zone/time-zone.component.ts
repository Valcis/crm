import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {TranslateService} from "@ngx-translate/core";
import {FormControl,FormGroup, Validators} from "@angular/forms";
import {DateTime} from "luxon";
import {ContinentZone,TimeZone} from "../../models/time-zone/time-zone.module"


@Component({
  selector: 'app-time-zone',
  templateUrl: './time-zone.component.html',
  styleUrls: ['./time-zone.component.scss']

})
export class TimeZoneComponent implements OnInit{

  @Output() TimeZone = new EventEmitter<string>();


  protected currentTimeZone: string ="";
  protected continentList: Array<ContinentZone>=[];
  protected timeZoneSelect: string="";


  form: FormGroup = new FormGroup({
    html: new FormControl("", Validators.required)
  });

  constructor(    protected _translate: TranslateService){}

  ngOnInit(): void { this.getAllTime()}

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
  }

  onChange(){
    this.timeZoneSelect = this.currentTimeZone;
    this.timeZoneSelect = this.timeZoneSelect.split("/",2)[1];
    this.TimeZone.emit(this.currentTimeZone)
  }

}
