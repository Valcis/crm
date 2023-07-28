import {Component, EventEmitter, Injectable, Input, OnInit, Output, ViewEncapsulation} from '@angular/core';
import {CrmLoaderService} from "../../services/crmLoader/crm-loader.service";
import {FormGroup, FormControl} from "@angular/forms";
//TODO: canviar el nom del selector, vigilar espais, vigilar ; l'ngOninit no fa res, netejar els imports que no facis servir.
//TODO: Per l'estructura de carpetes, a api>documentation no pots tenir el fitxer de links per separat, s'ha d'afegir una carpeta o treure els fitxers de file de la carpeta.
//TODO: Per altra banda, el nom del servei de drag and drop, està amb camelcase, i no és exclusiu de documentation o sigui que s'hauria de posar a una altra banda.
//TODO: Quan fagis servir llibreries externes, i després les treguis, recorda treure-les del package, perquè hi ha 3 o 4 que no estàs fent servir però s'instalen cada vegada.
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

  ngOnInit(): void {
  }
}
