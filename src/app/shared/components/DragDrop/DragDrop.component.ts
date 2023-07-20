import {Component, EventEmitter, OnInit, Output, ViewEncapsulation} from '@angular/core';
import {CrmLoaderService} from "../../services/crmLoader/crm-loader.service";
import {FormGroup, FormControl} from "@angular/forms";
@Component({
  selector: 'DragDrop.',
  templateUrl: './DragDrop.component.html',
  styleUrls: ['./DragDrop.component.scss',]
})
export class DragDropComponent{

  protected file: File[]= [];

  @Output() sendFile = new EventEmitter<any>();



  public reset() {
    this.removeAllFiles();
    this.sendFile.emit(this.file)
  };

  private removeAllFiles(){
    this.file = [];
  };


  onSelect(event:any) {
    this.file = [];
    this.file.push(...event.addedFiles);
    this.sendFile.emit(this.file)
  }

  public calcualteSize(size: number){
    let count: number = 0;

    while (size >= 1000) {
      count++;
      size=size/1000
    }
    var result:string = (Math.round(size * 100) / 100).toFixed(2);
    let units =["B","KB","MB","GB"];
    if (count > 3){
      count = 3;
    }
    var  unit: string  = units[count];
    return ("<strong> " + result + "</strong>" + unit);
  }

  ngOnInit(): void {
  }
}
