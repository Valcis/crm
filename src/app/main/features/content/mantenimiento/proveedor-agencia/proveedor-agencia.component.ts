import {Component} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {ProveedorAgenciaService} from "../../../../../shared/services/api/maintenence/proveedor-agencia-service";
import {translateType} from "../../../../../shared/models/documentation/type.model";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";


@Component({
  selector: 'document-links',
  templateUrl: './proveedor-agencia.component.html',
  styleUrls: ['./proveedor-agencia.component.scss',],
})
export class ProveedorAgenciaComponent {

  public fecthForm!: FormGroup;
  public newItemForm!: FormGroup;
  public changeItemForm!: FormGroup;
  public DeleteItemForm!: FormGroup;
  private historial:string = "";
  protected counter:number = 3;
  protected providerCreator:boolean=false;
  protected itemList:any[]=[];
  protected asc:boolean = true;
  private exportFiltro = {nombre: ""};
  private modalRef :any;
  protected editName:any[] = [];


  constructor(private _fetch: ProveedorAgenciaService,
              private _modal: NgbModal) {
    this.loadForms();
    this.getProveedores('1');
  }
  private loadForms(){
    this.fecthForm = new FormGroup({
      nombre: new FormControl<string>(""),
      datos_paginacion: new FormGroup({
        pagina: new FormControl<string>("1"),
        num_resultados: new FormControl<string>("5"),
        orden: new FormControl<string>("nombre"),
        tipo_orden: new FormControl<string>("ASC"),
      })
    });
    this.newItemForm = new FormGroup({
      nombre:new FormControl<string>("")
    });
    this.changeItemForm = new FormGroup({
      nombre:new FormControl<string>(""),
      neo_id:new FormControl<number>(0)
    });
    this.DeleteItemForm = new FormGroup({
      neo_id:new FormControl<number>(0)
    });
  }


  protected submitSearch(form:any) {
    if (form.status === 'VALID') {
      this.getProveedores('1');
    } else {

      //TODO:notification
      /*notify({
        message: $translate.instant("GENERAL_DATOS_VACIOS_NO_VALIDOS"),//Texto plano
        position: 'right',//center,right
        classes: 'alert-danger',//,//alert-info,alert-success,alert-warning,alert-danger
        templateUrl: 'general/common/notify.html'
      });*/
    }
  };

  protected getProveedores(pagina:string | undefined){
    this.providerCreator = false;
    // crmLoadingPage(true);
    if (pagina !== undefined) {
      //igualar paginacion a la pagina
    }

    this._fetch.getProveedores(this.fecthForm.value).subscribe(response => {
      let localData:any = response;
      let fetchResult=[];
      fetchResult = localData.Salida.lineas;
      this.counter = localData.Salida.datos.num_elementos;
      this.itemList = [];

      fetchResult.forEach((value:any) => {
        this.itemList.push([value.nombre, value.neo_id]);
      });
      //this._loader.setLoading(false);
      this.exportFiltro.nombre = this.fecthForm.value.nombre;
    });
  };

  protected newProvider(){
    this._fetch.newProveedor(this.newItemForm.value).subscribe(response =>{
    this.getProveedores('1');
    })
  }
  protected modifyProvider(){
    this._fetch.changeProveedor(this.changeItemForm.value,this.historial).subscribe(response =>{
      //TODO:condicion
      this.modalRef.dismiss('close');
      this.getProveedores('1');
    })
  }
  protected deleteProvider(){
    this.DeleteItemForm.patchValue({ neo_id: this.editName[1]});
    //todo swal
    this._fetch.deleteProveedor(this.DeleteItemForm.value);
//    this.getProveedores('1');

  }

  open(content : any) {
    this.historial = this.editName[0];
    this.changeItemForm.patchValue({ neo_id: this.editName[1]});
    this.modalRef = this._modal.open(content, {
      windowClass: 'modal-element',
      size: "sm",
      modalDialogClass:"rounded-0" });
  }




  protected patchOrder(value:string){
    this.fecthForm.patchValue({datos_paginacion:{tipo_orden:value}});
    this.getProveedores(undefined);
  }

  protected testOrder(value:string){
    let fetchInfo:any = value;
      return fetchInfo === this.fecthForm.get('datos_paginacion.tipo_orden')?.value;
  }

}
