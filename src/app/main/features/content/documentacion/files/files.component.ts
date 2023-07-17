import {Component} from '@angular/core';


import {FormControl, FormGroup, Validators} from "@angular/forms";

import {TranslateService} from "@ngx-translate/core";
//import Swal from 'sweetalert2'
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
  protected columns: string[] = [" ","FILES.NAME", "FILES.DESCRIPTION", "FILES.SIZE", "FILES.CATEGORIA","FILES.USER","FILES.CREATION"];
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
    this.rowData = [];
    var list: any=[];
    //crmLoadingPage(false);
    this._fileService.getFiles(request).subscribe(response=>{
      if (response !== undefined) {
        var localData:any = response;
        var fechResult=[];
        fechResult = localData.Salida.lineas;
        this.rowData = [];
        fechResult.forEach((value :any) =>{
          var completeName = value.relations[0].node.data.empl_nomb +" " + value.relations[0].node.data.empl_ape1 +" " + value.relations[0].node.data.empl_ape2;
          //TODO: correct gmt
          var it={
            cog: {
              linked: "/CRMServlet/neo/files/private/Ficheros/" + value.data.name ,
              id: value.metadata.neo_id, name:value.data.name},
            fileName: value.data.original_name, des:value.data.descripcion,
            siz: value.data.size,
            categor:value.data.categoria,
            userName: completeName,
            dateCreation:value.data.creacion_ts };
          this.rowData.push(it)
        });
        console.log("rowData", this.rowData);
        this.counter = fechResult.length;

      }

    });


  };

  public deleteFile(name:string, id:string, original_n:string) {
    /*Swal.fire({
      title: this._translate.instant('SWEET_ALERT_TITLE_DELETE'),
      text: this._translate.instant('SWEET_ALERT_TEXT_ADJUNTO_DELETE') + " " + original_n + "!",
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
            "file_name": name,
            "neo_id": id
          }
        }*/
        //crmLoadingPage(true);
        /*this._fileService.deleteFile(request).subscribe(response=>{
          //crmLoadingPage(false);
          if (response !== undefined && response.Salida !== undefined && response.Status === 'OK') {
            Swal.fire(this._translate.instant('SWEET_ALERT_RESPONSE1_ADJUNTO_DELETE'), this._translate.instant('SWEET_ALERT_RESPONSE2_ADJUNTO_DELETE'), "success");
          } else {
            Swal.fire(this._translate.instant('SWEET_ALERT_RESPONSE1_ADJUNTO_DELETE_ERROR'), this._translate.instant('SWEET_ALERT_RESPONSE2_ADJUNTO_DELETE_ERROR'), "error");
          }
          this.getFiles();
        })

      }
    });
    */
  };
}
