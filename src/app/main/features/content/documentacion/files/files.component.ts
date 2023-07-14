import {Component} from '@angular/core';


import {FormControl, FormGroup, Validators} from "@angular/forms";

import {TranslateService} from "@ngx-translate/core";
import Swal from 'sweetalert2'
import { NgbPaginationModule, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {CookiesService} from "../../../../../shared/services/cookies/cookies.service";
import {forEach} from "@angular-devkit/schematics";
import {FileService} from "../../../../../shared/services/api/Documentation/file/file.service";


@Component({
  selector: 'document-links',
  templateUrl: './files.component.html',
  styleUrls: ['./files.component.scss',],

})
export class FilesComponent {
  protected filesForm!: FormGroup;
  protected delForm!: FormGroup;
  protected rowData: any[] = [];
  protected counter: number = 0;
  protected currentPage: number = 1;
  protected pageSize: number = 5;
  protected columns: string[] = ["FILES.NAME", "FILES.DESCRIPTION", "FILES.SIZE", "FILES.CATEGORIA","FILES.USER","FILES.CREATION"];
  protected types: any[] = [{k:"Hotel", v:"FILES.HOTEL"},{k:"Agencia", v:"FILES.AGENCY"}, {k:"Otros", v:"FILES.OTHER"}];
  constructor(
    private _translate: TranslateService,
    private _cookie: CookiesService,
    private _fileService: FileService
  ) {
  }

  ngOnInit() {
    this.filesForm = new FormGroup({
      type_file: new FormControl<string>('Otros'),
      neo_id: new FormControl(0),
      descripcion: new FormControl(''),
      original_name: new FormControl("")
    });

    this.delForm = new FormGroup({
      item: new FormControl()
    });
    this.getFiles()
  }

  public async getFiles() {
    var request = {
      Entrada: this.filesForm.value
    };
    //crmLoadingPage(true);
    let response: any;
    console.log(request)
    this.rowData = []
    var list: any=[];
    response = this._fileService.getFiles(request);

    //crmLoadingPage(false);

    if (response !== undefined) {
      response.forEach(function(value :any){
        //{"Status":"OK","Salida":{"lineas":[{"metadata":{"neo_id":653767,"labels":["Activo","_Fichero"]},"data":{"descripcion":"Events Calendar 2022 EN","creacion_ts":1650605523000,"size":161661,"original_name":"Events Calendar 2022 EN.pdf","categoria":"Otros","name":"1650612723321.pdf","modificacion_ts":1650605523000},"relations":[{"node":{"metadata":{"neo_id":56678,"labels":["_UsuarioCrm","Activo"]},"data":{"empl_nomb":"María","mail":"marketingplan@grupohotusa.com","tipo_aviso_compras":true,"timezone":"Europe/Madrid","taviso_antes":5,"empl_code":5163,"user_name":"mvazquez","taviso_posponer":2,"user_afil":"HA","tipo_aviso_evento":true,"idioma_cliente":"es","user_activo":"S","empl_dpto":"CONTRATACION_NACIONAL_BARCELONA","tipo_aviso_tarea":true,"id_sesion":"","baja_temporal":false,"tipo_aviso_llamada":true,"user_id":4177,"empl_ape2":"","empl_ape1":"Vázquez","user_perfil":"GESTOR_HOTEL"}},"metadata":{"neo_id":3380917,"type":"_CREA"},"data":{"descripcion":["","Events Calendar 2022 EN"],"creacion_ts":1650605523000,"size":["","161661"],"categoria":["","Otros"],"original_name":["","Events Calendar 2022 EN.pdf"],"name":["","1650612723321.pdf"]}}]},{"metadata":{"neo_id":654147,"labels":["Activo","_Fichero"]},"data":{"descripcion":"Calendario Eventos 2022 ES","creacion_ts":1650605505000,"size":162814,"original_name":"Calendario Eventos 2022 ES.pdf","categoria":"Otros","name":"1650612705311.pdf","modificacion_ts":1650605505000},"relations":[{"node":{"metadata":{"neo_id":56678,"labels":["_UsuarioCrm","Activo"]},"data":{"empl_nomb":"María","mail":"marketingplan@grupohotusa.com","tipo_aviso_compras":true,"timezone":"Europe/Madrid","taviso_antes":5,"empl_code":5163,"user_name":"mvazquez","taviso_posponer":2,"user_afil":"HA","tipo_aviso_evento":true,"idioma_cliente":"es","user_activo":"S","empl_dpto":"CONTRATACION_NACIONAL_BARCELONA","tipo_aviso_tarea":true,"id_sesion":"","baja_temporal":false,"tipo_aviso_llamada":true,"user_id":4177,"empl_ape2":"","empl_ape1":"Vázquez","user_perfil":"GESTOR_HOTEL"}},"metadata":{"neo_id":3375943,"type":"_CREA"},"data":{"descripcion":["","Calendario Eventos 2022 ES"],"creacion_ts":1650605505000,"size":["","162814"],"categoria":["","Otros"],"original_name":["","Calendario Eventos 2022 ES.pdf"],"name":["","1650612705311.pdf"]}}]},{"metadata":{"neo_id":364477,"labels":["Activo","_Fichero"]},"data":{"descripcion":"Calendario eventos 2020 FR","creacion_ts":1577432068000,"size":129868,"original_name":"Events 2020 FR.pdf","categoria":"Otros","name":"1577435668163.pdf","modificacion_ts":1577432068000},"relations":[{"node":{"metadata":{"neo_id":170560,"labels":["_UsuarioCrm","Activo"]},"data":{"empl_nomb":"Andrea","mail":"andrea.navarro@grupohotusa.com","tipo_aviso_compras":true,"timezone":"Europe/Madrid","taviso_antes":5,"empl_code":5608,"user_name":"andrean","taviso_posponer":2,"user_afil":"HA","tipo_aviso_evento":true,"idioma_cliente":"es","user_activo":"S","empl_dpto":"MARKETING","tipo_aviso_tarea":true,"id_sesion":"","baja_temporal":false,"tipo_aviso_llamada":true,"user_id":4639,"empl_ape2":"","empl_ape1":"Navarro","user_perfil":"COMERCIAL_MARKETING_EVENTOS"}},"metadata":{"neo_id":1998852,"type":"_CREA"},"data":{"descripcion":["","Calendario eventos 2020 FR"],"creacion_ts":1577432068000,"size":["","129868"],"categoria":["","Otros"],"original_name":["","Events 2020 FR.pdf"],"name":["","1577435668163.pdf"]}}]}],"datos":{"num_elementos":3}},"Metodo":"GetFicheros","Servicio":"ficheros","Id":"NzB8O0pqx13WBjK2Ug8m9xWMm3Akkl8VVI4VqFgI","URL":""}
        console.log(value)
        var it={cog: {linked: "",im: "" },fileNames:"",des:"",siz:"",categor:"",userName:"",dateCreation:"" }
        list.push(it)
      });
      this.rowData = list;
      console.log(this.rowData);
    }

  };

  public deleteFiles(item:any) {
    Swal.fire({
      title: this._translate.instant('SWEET_ALERT_TITLE_DELETE'),
      text: this._translate.instant('SWEET_ALERT_TEXT_ADJUNTO_DELETE') + " " + item.data.original_name + "!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#DD6B55",
      confirmButtonText: this._translate.instant('SWEET_ALERT_CONFIRM_DELETE'),
      cancelButtonText: this._translate.instant('SWEET_ALERT_CANCEL_DELETE'),
      scrollbarPadding: false,
      heightAuto: false,
    }).then((isConfirm) => {

      if (isConfirm) {
        var request = {
          Entrada: {
            "type_file": "Ficheros",
            "file_name": item.data.name,
            "neo_id": item.metadata.neo_id
          }
        }
        //crmLoadingPage(true);
        var response: any;
        response = this._fileService.deleteFile(request)
        //crmLoadingPage(false);
        if (response !== undefined && response.Salida !== undefined && response.Status === 'OK') {
          Swal.fire(this._translate.instant('SWEET_ALERT_RESPONSE1_ADJUNTO_DELETE'), this._translate.instant('SWEET_ALERT_RESPONSE2_ADJUNTO_DELETE'), "success");
        } else {
          Swal.fire(this._translate.instant('SWEET_ALERT_RESPONSE1_ADJUNTO_DELETE_ERROR'), this._translate.instant('SWEET_ALERT_RESPONSE2_ADJUNTO_DELETE_ERROR'), "error");
        }
        this.getFiles();
      }
    });
  };
}
