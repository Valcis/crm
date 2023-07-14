import {Component} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {LinkService} from "src/app/shared/services/api/documentatnion/link.service"
import {TranslateService} from "@ngx-translate/core";
import Swal from 'sweetalert2'
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {CookiesService} from "../../../../../shared/services/cookies/cookies.service";
import {SwalService} from "../../../../../shared/services/swal/swal.service";
import {TypeModel} from "../../../../../shared/models/documentation/type.model";


@Component({
  selector: 'document-links',
  templateUrl: './links.component.html',
  styleUrls: ['./links.component.scss',],
})
export class LinksComponent {

  public linkForm!: FormGroup;
  public newForm!: FormGroup;
  public types!: TypeModel[];
  public counter: number = 0;
  public fechResult: any[]=[];
  public currentPage = 1;
  public pageSize =10;
  public rowData: any[]= [];
  private modalRef :any;
  public delObj: any;
  public columnDefs: string[] = [];

  constructor(
    private _translate: TranslateService,
    private _link: LinkService,
    private _modal: NgbModal,
    private _cookie: CookiesService,
    private _swal: SwalService,
  ) {
    if (_cookie.getLanguage() === '' || !_cookie.getLanguage()) {
      this._translate.use('es');
      this._cookie.setLanguage(this._translate.currentLang);
    } else {
      this._translate.use(_cookie.getLanguage());
    }
    this.columnDefs=['LINKS.TYPE','LINKS.DESCRIPTION', 'LINKS.LINK'];
    this.types =[
      {k: "Hotel", v: "LINKS.HOTEL"},
      {k: "Agencia", v: "LINKS.AGENCY"},
      {k: "Otros", v: "LINKS.OTHER"}]
  }

  async ngOnInit(): Promise<void> {
    this.loadForms();
    this.getLinks();
  }

  private loadForms(){
    this.linkForm = new FormGroup({
      categoria: new FormControl<string>("Otros"),
      neo_id: new FormControl<number>(0),
      descripcion: new FormControl<string>(""),
      link: new FormControl<string>(""),
    });
    this.newForm = new FormGroup({
      categoria: new FormControl<string>("Otros"),
      descripcion: new FormControl<string>(""),
      link: new FormControl<string>(""),
    });
  }

  public async getLinks(){
    var elements=this.linkForm.value;
    let env =
      {"categoria" : elements.categoria,
      "neo_id":0,
      "descripcion": elements.descripcion,
      "link": elements.link};

    this._link.fetchLinks(env).subscribe(response =>{
      var localData:any = response;
      this.fechResult=[];
      this.fechResult = localData.Salida.lineas;
      this.rowData = [];
      var info: any[] = [];
      this.fechResult.forEach((value) => {
        var it = {
          c:value.data.categoria,
          link:value.data.link,
          description:value.data.descripcion,
          name:value.relations[0].node.data.empl_nomb+" "+value.relations[0].node.data.empl_ape1,
          value:value};
        //TODO: Probar de hacerlo sim un switch/case

        switch (it.c) {
          case "Otros":{
            it.c = 'LINKS.OTHER';
            break;
          }
          case "Agencia":{
            it.c = "LINKS.AGENCY";
            break;
          }
          case "Hotel":{
            it.c = "LINKS.HOTEL";
            break;
          }
        }
        info.push(it);
      });
      this.counter = info.length;
      info.sort((a,b) => b.value.data.creacion_ts - a.value.data.creacion_ts);
      this.rowData = info;
    });
  }

  public async deleteLinks(item: any){
    this.delObj = item;
    if (this.delObj !== undefined && this.delObj.metadata !== undefined && this.delObj.metadata.neo_id !== undefined) {
      //TODO: El código de Sweet alert debería estar a) en un servicio o b) en un componente, dentro del shared.
      this._swal.swalConfirmationRequest('LINKS.ALERT_TITLE_DELETE',"LINKS.ALERT_TEXT",item.data.descripcion)
        .then((result) => {
          if (result.isConfirmed){
            this._link.eliminateLink(this.delObj).subscribe(response=>{
              //crmLoadingPage(false);
              if (response !== undefined) {
                //crmLoadingPage(true);
                this._swal.swalSucces('LINKS.ALERT_RESPONSE1','LINKS.ALERT_LINK_BORRADO')
                this.getLinks();
              }
            })
          }
        });
      //crmLoadingPage(true);
    }
  }

  open(content : any) {
    this.modalRef = this._modal.open(content, {
      windowClass: 'modal-element',
      size: "lg"});
  }

  public createLink() {
    if (this.newForm.value.link.length > 0 && (this.newForm.value.descripcion.length > 0)) {
      if(this.newForm.value.link.indexOf('http://')>-1 || (this.newForm.value.link.indexOf('https://')>-1)){
        this.newForm.value.link = this.newForm.value.link;
      } else {
        this.newForm.value.link = 'http://'+ this.newForm.value.link;
      }
      let request = {
        "datos_peticion":{
          "categoria":this.newForm.value.categoria,
          "descripcion":this.newForm.value.descripcion,
          "link":this.newForm.value.link}};
      //crmLoadingPage(true);
      this._link.newLink(request).subscribe(response =>{
        //crmLoadingPage(false);
        if (response !== undefined) {
          this.modalRef.close();
          /*
          notify({
            message: $translate.instant("PAG_LINKS_NOTIFY_ANADIDO_OK"),//Texto plano
            position: 'right',//center,right
            classes: 'alert-success',//,//alert-info,alert-success,alert-warning,alert-danger
            templateUrl: 'general/common/notify.html'
          });
          */
          this.getLinks();
        }
        return response;
      });

    } else {
      //TODO: Este else tendría que hacer algo?
      /*
      notify({
        message: $translate.instant("PAG_LINKS_NOTIFY_NECESARIO_LINK"),//Texto plano
        position: 'right',//center,right
        classes: 'alert-warning',//,//alert-info,alert-success,alert-warning,alert-danger
        templateUrl: 'general/common/notify.html'
      });
       */
    }
  }
}
