import {Component, EventEmitter, Injectable, Input,  Output} from '@angular/core';

@Injectable({
    providedIn: 'root'
})
@Component({
  selector: 'DragDrop.',
  templateUrl: './drag-drop.component.html',
  styleUrls: ['./drag-drop.component.scss',]
})
export class DragDropComponent{
  @Input() file: File[]= [];
  @Output() sendFile = new EventEmitter<any>();
  @Output() delete = new EventEmitter<any>();

  public reset() {
    this.removeAllFiles();
    this.delete.emit();
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

    size = size*100;
    while (size >= 1000) {
      count++;
      size=size/1000
    }
    size = size/100;
    var result:string = (Math.round(size * 100) / 100).toFixed(1);
    let units =[" B"," KB"," MB"," GB"];
    if (count > 3){
      count = 3;
    }
    var  unit: string  = units[count];
    return ("<strong> " + result + "</strong>" + unit);
  }
}
