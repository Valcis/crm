import {EventEmitter, Injectable, Input, Output} from "@angular/core";
import {JSONpageModel} from "../../models/JSON.model"


@Injectable({
  providedIn: 'root'
})export class sharedDataService {


  @Input() userData!: JSONpageModel;
  @Output() userDataChange: EventEmitter<JSONpageModel> = new EventEmitter<JSONpageModel>();


  constructor() { }
}
