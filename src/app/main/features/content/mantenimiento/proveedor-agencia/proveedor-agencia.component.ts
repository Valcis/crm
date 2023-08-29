import {Component, TemplateRef} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {ProveedorAgenciaService} from "../../../../../shared/services/api/maintenence/proveedor-agencia-service";
import {NgbModal, NgbModalRef} from "@ng-bootstrap/ng-bootstrap";
import {CsvService} from "../../../../../shared/services/csv/csv.Service";
import {SwalService} from "../../../../../shared/services/swal/swal.service";
import {TranslateService} from "@ngx-translate/core";
import {DateTime} from "luxon";
import {LogHistorial} from "../../../../../shared/models/manteninence/proveedor-agencia.model";
import {CrmLoaderService} from "../../../../../shared/services/crmLoader/crm-loader.service";


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
  protected counter:number = 0;
  protected providerCreator:boolean=false;
  protected providerFilter:boolean=true;
  protected itemList:(string | number)[][]=[];
  private exportFiltro = {nombre: ""};
  private modalRef! :NgbModalRef;
  protected editName:Array<string|number>= [];

  protected pageSize:number=5;
  protected currentPage:number=1;

  constructor(private _fetch: ProveedorAgenciaService,
              private _modal: NgbModal,
              private  _csvService: CsvService,
              private _swal: SwalService,
              private _translate:TranslateService,
              private _loader: CrmLoaderService,

  ) {
    this.loadForms();
    this.getProveedores(1);
  }
  private loadForms(){
    this.fecthForm = new FormGroup({
      nombre: new FormControl<string>(""),
      datos_paginacion: new FormGroup({
        pagina: new FormControl<number>(1),
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
      neo_id:new FormControl<string>("")
    });
  }


  protected submitSearch(form:FormGroup) {
    this.pageSize = this.fecthForm.get("datos_paginacion")?.get("num_resultados")?.value;
    if (form.status === 'VALID') {
      this.getProveedores(1);
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

  protected getProveedores(pagina:number | undefined){
    this.providerCreator = false;
    // crmLoadingPage(true);
    if (pagina !== undefined) {
      this.fecthForm.patchValue({ datos_paginacion: {pagina:this.currentPage}});
    }
    this._loader.setLoading(true);
    this._fetch.getProveedores(this.fecthForm.value).subscribe(response => {
      let localData:any = response;
      let fetchResult=[];
      fetchResult = localData.Salida.lineas;
      this.counter = localData.Salida.datos.num_elementos;
      this.itemList = [];

      fetchResult.forEach((value:{nombre:string, neo_id:number}) => {
        this.itemList.push([value.nombre, value.neo_id]);
      });
      this._loader.setLoading(false);
      this.exportFiltro.nombre = this.fecthForm.value.nombre;
    });
  };

  protected newProvider(){
    this._fetch.newProveedor(this.newItemForm.value).subscribe(response =>{
    this.getProveedores(1);
    })
  }
  protected modifyProvider(){
    let date = DateTime.now().setZone('utc');
    let logHistorial:LogHistorial = {
      nombre: this.historial,
      modificacion_ts: date.toMillis()
    };
    this._loader.setLoading(true);
    this._fetch.changeProveedor(this.changeItemForm.value,logHistorial).subscribe(response =>{
      this.modalRef.dismiss('close');
      this.getProveedores(1);
      this._loader.setLoading(false);

    })
  }
  protected deleteProvider(){
    this.DeleteItemForm.patchValue({ neo_id: this.editName[1].toString()});
    this._swal.swalConfirmationRequest(this._translate.instant('LINKS.ALERT_TITLE_DELETE'),this._translate.instant(" "), " ").then(
      (res:any)=>{
        if (res.isConfirmed) {
          this._loader.setLoading(true);
          this._fetch.deleteProveedor(this.DeleteItemForm.value).subscribe(response => {
            this._swal.swalSucces(this._translate.instant('LINKS.ALERT_RESPONSE1'),this._translate.instant(' '));
            this.getProveedores(1);
            this._loader.setLoading(false);

          });
        }
    });
  };

  open(content : TemplateRef<any>) {
    this.historial = this.editName[0].toString();
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
      return value === this.fecthForm.get('datos_paginacion.tipo_orden')?.value;
  }

  protected changeOfPage(event:any){
    this._loader.setLoading(true);
    let num: number = +event;
    this.currentPage = num;
    this.fecthForm.get('datos_paginacion')?.get('pagina')?.setValue(event);
    this.getProveedores(this.currentPage);
    this._loader.setLoading(false);
  }

  public saveDataInCSV(name: string, data: Array<any>): void {
    let csvContent = this._csvService.saveDataInCSV(data);

    var hiddenElement = document.createElement('a');
    hiddenElement.href = 'data:text/csv;charset=utf-8,' + encodeURI(csvContent);
    hiddenElement.target = '_blank';
    hiddenElement.download = name + '.csv';
    hiddenElement.click();
  }

}

