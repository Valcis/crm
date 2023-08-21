import {Component, Input} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {HistorialService} from "../../../../../../shared/services/api/Historial/historial.service";
import { Router } from '@angular/router';


@Component({
  selector: 'app_historial',
  templateUrl: './historial.component.html',
  styleUrls: ['./historial.component.scss',],
})
export class HistorialComponent {

  @Input() action = ["_CREA","_MODIFICA","_BORRA","_CLONA"];
  @Input() fields = ['USER','ACTION','DATE', 'DATA', 'NODE'];

  protected historyButton:boolean = false;
  protected nItems: string="10";
  public fecthForm!: FormGroup;
  protected userSearch:string = "";
//TODO:pass to a model
  protected tiposRelacion = [
    {k:"_CREA",v:"HISTORIAL_CREA"},
    {k:"_MODIFICA",v:"HISTORIAL_MODIFICA"},
    {k:"_BORRA",v:"HISTORIAL_BORRA"},
    {k:"_CLONA",v:"HISTORIAL_CLONA"}
  ];

  constructor(private _fetch: HistorialService,
              private _modal: NgbModal,
              private _router: Router) {
    this.loadForms();
  }
  private loadForms(){
    this.fecthForm = new FormGroup({
      fecha_desde: new FormControl<string>(""),
      relaciones: new FormControl<Array<string>>(this.action),
      node: new FormGroup({
        label: new FormControl<string>("ProveedorTrabajaAgencia"),
        properties: new FormControl<Array<string>>(["nombre"]),
      })
    });

  }

  ngOnInit(){
    this.getHistory();
  }


  public getHistory(){
    this.fecthForm.patchValue({relaciones: this.action, });

    this._fetch.getHistorial(this.fecthForm.value,this._router.url);
  }





}
